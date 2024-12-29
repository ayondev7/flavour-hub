import React, { useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getUserIdFromToken} from '../assets/tokenUtils';

const CreateNewRecipe = () => {
  const userId = getUserIdFromToken();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [{ value: "" }],
    instructions: [{ value: "" }],
    servings: "",
    prepTime: { hours: "", minutes: "" },
    cookTime: { hours: "", minutes: "" },
    cuisineType: "",
    mealType: "",
    nutritionalValues: { calories: "", protein: "", fat: "", carbs: "" },
    dietaryInformation: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { value } = e.target;
    const ingredients = [...formData.ingredients];
    ingredients[index].value = value;
    setFormData({ ...formData, ingredients });
  };

  const handleInstructionChange = (index, e) => {
    const { value } = e.target;
    const instructions = [...formData.instructions];
    instructions[index].value = value;
    setFormData({ ...formData, instructions });
  };

  const addIngredient = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { value: "" }],
    });
  };

  const removeIngredient = (index) => {
    const ingredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients });
  };

  const addInstruction = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      instructions: [...formData.instructions, { value: "" }],
    });
  };

  const removeInstruction = (index) => {
    const instructions = formData.instructions.filter((_, i) => i !== index);
    setFormData({ ...formData, instructions });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = new FormData();

    for (const key in formData) {
      if (
        key !== "nutritionalValues" &&
        key !== "ingredients" &&
        key !== "instructions" &&
        key !== "prepTime" &&
        key !== "cookTime"
      ) {
        data.append(key, formData[key]);
      } else {
        data.append(key, JSON.stringify(formData[key]));
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/recipe/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            id: userId,
          },
        }
      );
      toast.success("Recipe created successfully!", {
        onClose: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      toast.error("Failed to create recipe.", {
        onClose: () => {
          window.location.reload();
        },
      });
    }

    setFormData({
      title: "",
      description: "",
      ingredients: [{ value: "" }],
      instructions: [{ value: "" }],
      servings: "",
      prepTime: { hours: "", minutes: "" },
      cookTime: { hours: "", minutes: "" },
      cuisineType: "",
      mealType: "",
      nutritionalValues: { calories: "", protein: "", fat: "", carbs: "" },
      dietaryInformation: "",
      image: null,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between border-y px-4 lg:px-16 py-4">
          <h1 className="text-xl text-black font-semibold">
            Create New Recipe
          </h1>
          <button
            type="submit"
            className="px-6 font-medium py-2 rounded-md bg-hotPink text-white border-none text-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner text-sm text-white"></span>
            ) : (
              "Save"
            )}
          </button>
        </div>

        <div className="py-4 px-4 lg:px-16 flex flex-col items-center justify-center gap-y-6 pb-[100px]">
          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="recipeTitle"
            >
              Recipe Title :
            </label>
            <input
              type="text"
              placeholder="Enter Recipe Title"
              className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
              name="title"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label className="text-base text-black font-medium" htmlFor="image">
              Recipe Image :
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered focus:border-none file-input-primary border border-gray-400 bg-white w-[90%] lg:w-[80%]"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="description"
            >
              Description :
            </label>
            <input
              type="text"
              placeholder="Say a few things about your recipe"
              className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
              name="description"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="ingredients"
            >
              Ingredients :
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-start gap-y-4 w-[90%] lg:w-full"
              >
                <input
                  type="text"
                  placeholder="Enter your ingredient with their respective quantity"
                  className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                  value={ingredient.value}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
                <button
                  className="p-2 ml-2 mt-2"
                  onClick={() => removeIngredient(index)}
                  disabled={formData.ingredients.length < 2}
                  type="button"
                >
                  <FaTrashAlt className="text-sm text-hotPink hover:cursor-pointer" />
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline border-hotPink text-hotPink hover:text-hotPink my-2"
              onClick={addIngredient}
            >
              <BsPlusLg /> Add new ingredient
            </button>
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="instruction"
            >
              Instructions :
            </label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-y-2 w-[90%] lg:w-[85%]">
                <input
                  type="text"
                  placeholder="Enter your instruction with their respective quantity"
                  className="input input-bordered text-sm text-black w-full border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                  value={instruction.value}
                  onChange={(e) => handleInstructionChange(index, e)}
                />
                <button
                  className="p-2 ml-2"
                  onClick={() => removeInstruction(index)}
                  disabled={formData.instructions.length < 2}
                  type="button"
                >
                  <FaTrashAlt className="text-sm text-hotPink hover:cursor-pointer" />
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline border-hotPink text-hotPink hover:text-hotPink my-2"
              onClick={addInstruction}
            >
              <BsPlusLg /> Add new instruction
            </button>
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="servings"
            >
              Servings :
            </label>
            <input
              type="text"
              placeholder="Number of servings"
              className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
              name="servings"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="prepTime"
            >
              Preparation Time :
            </label>
            <div className="flex justify-between w-[90%] lg:w-[80%]">
              <input
                type="number"
                placeholder="Hours"
                name="prepTimeHours"
                className="input input-bordered text-sm text-black w-[48%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                value={formData.prepTime.hours}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 24) {
                    setFormData({
                      ...formData,
                      prepTime: { ...formData.prepTime, hours: value },
                    });
                  }
                }}
                onKeyDown={(e) => {
                  const value = parseInt(e.target.value + e.key);
                  if (isNaN(value) || value < 0 || value > 24) {
                    e.preventDefault();
                  }
                }}
              />
              <input
                type="number"
                placeholder="Minutes"
                name="prepTimeMinutes"
                className="input input-bordered text-sm text-black w-[48%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                value={formData.prepTime.minutes}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 60) {
                    setFormData({
                      ...formData,
                      prepTime: { ...formData.prepTime, minutes: value },
                    });
                  }
                }}
                onKeyDown={(e) => {
                  const value = parseInt(e.target.value + e.key);
                  if (isNaN(value) || value < 0 || value > 60) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="cookTime"
            >
              Cooking Time :
            </label>
            <div className="flex justify-between w-[90%] lg:w-[80%]">
              <input
                type="number"
                placeholder="Hours"
                name="cookTimeHours"
                className="input input-bordered text-sm text-black w-[48%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                value={formData.cookTime.hours}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 24) {
                    setFormData({
                      ...formData,
                      cookTime: { ...formData.cookTime, hours: value },
                    });
                  }
                }}
                onKeyDown={(e) => {
                  const value = parseInt(e.target.value + e.key);
                  if (isNaN(value) || value < 0 || value > 24) {
                    e.preventDefault();
                  }
                }}
              />
              <input
                type="number"
                placeholder="Minutes"
                name="cookTimeMinutes"
                className="input input-bordered text-sm text-black w-[48%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                value={formData.cookTime.minutes}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 60) {
                    setFormData({
                      ...formData,
                      cookTime: { ...formData.cookTime, minutes: value },
                    });
                  }
                }}
                onKeyDown={(e) => {
                  const value = parseInt(e.target.value + e.key);
                  if (isNaN(value) || value < 0 || value > 60) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="mealType"
            >
              Meal Type :
            </label>
            <select
              name="mealType"
              className="select select-primary w-[90%] lg:w-[80%] border-gray-400 bg-white focus:outline-none focus:border-hotPink"
              value={formData.mealType}
              onChange={handleChange}
            >
              <option disabled value="">
                Select a meal type
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Brunch">Brunch</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Side Dish">Side Dish</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="cuisineType"
            >
              Cuisine Type :
            </label>
            <select
              name="cuisineType"
              className="select select-primary w-[90%] lg:w-[80%] border-gray-400 bg-white focus:outline-none focus:border-hotPink"
              value={formData.cuisineType}
              onChange={handleChange}
            >
              <option disabled value="">
                Select a cuisine type
              </option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="French">French</option>
              <option value="Japanese">Japanese</option>
              <option value="Japanese">Middle Eastern</option>
            </select>
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="nutritionalValues"
            >
              Nutritional Values :
            </label>

            <div className="grid grid-rows-2 grid-cols-2 w-[90%] gap-x-2 gap-y-4">
              <input
                type="text"
                placeholder="Enter Calories"
                name="calories"
                className="input input-bordered text-sm text-black w-full lg:w-[78%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                value={formData.nutritionalValues.calories}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nutritionalValues: {
                      ...formData.nutritionalValues,
                      calories: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Enter Protein"
                name="protein"
                className="input input-bordered text-sm text-black w-full lg:w-[78%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                value={formData.nutritionalValues.protein}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nutritionalValues: {
                      ...formData.nutritionalValues,
                      protein: e.target.value,
                    },
                  })
                }
              />

              <input
                type="text"
                placeholder="Enter Carbs"
                name="carbs"
                className="input input-bordered text-sm text-black w-full lg:w-[78%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                value={formData.nutritionalValues.carbs}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nutritionalValues: {
                      ...formData.nutritionalValues,
                      carbs: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Enter fat"
                name="fat"
                className="input input-bordered text-sm text-black w-full lg:w-[78%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
                value={formData.nutritionalValues.fat}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nutritionalValues: {
                      ...formData.nutritionalValues,
                      fat: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-y-2 w-full lg:w-[60%]">
            <label
              className="text-base text-black font-medium"
              htmlFor="dietaryInformation"
            >
              Dietary Information :
            </label>
            <input
              type="text"
              placeholder="E.g - vegan-friendly, gluten-free"
              className="input input-bordered text-sm text-black w-[90%] lg:w-[80%] border border-gray-400 focus:outline-none bg-white focus:border-hotPink"
              name="dietaryInformation"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewRecipe;
