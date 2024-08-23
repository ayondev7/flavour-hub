import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { HiOutlineCheck } from "react-icons/hi";
import { HiOutlinePencilAlt,HiOutlineX,HiOutlineTrash } from "react-icons/hi";

const EditRecipe = () => {
  const { recipeId } = useParams(); // Extracts the recipe ID from the URL
  const [recipe, setRecipe] = useState({}); // State to store the recipe data
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredientIndex, setIngredientIndex] = useState(null);
  const [instructionIndex, setInstructionIndex] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const imageInputRef = useRef(null); // Reference to the file input element
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image base64 string

  const [editMode, setEditMode] = useState({
    title: false,
    description: false,
    servings: false,
    prepTime: false,
    cookTime: false,
    cuisineType: false,
    dietaryInformation: false,
  });

  const [nutritionalEditMode, setNutritionalEditMode] = useState({
    calories: false,
    protein: false,
    fat: false,
    carbs: false,
  });

  const [prepTimeEditMode, setPrepTimeEditMode] = useState(false);

  const handlePrepTimeEdit = () => {
    setPrepTimeEditMode(true);
  };

  const handlePrepTimeCancel = () => {
    setPrepTimeEditMode(false);
  };

  const handlePrepTimeSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/recipe/updatePrepTime/${recipeId}`,
        {
          prepTime: {
            hours: formData.prepTime.hours,
            minutes: formData.prepTime.minutes,
          },
        }
      );

      setPrepTimeEditMode(false);
      toast.success("Preparation time updated successfully!");
    } catch (error) {
      console.error("Error updating preparation time:", error);
      toast.error("Failed to update preparation time.");
    }
  };

  const handlePrepTimeChange = (field, value) => {
    setFormData({
      ...formData,
      prepTime: {
        ...formData.prepTime,
        [field]: value,
      },
    });
  };

  const [cookTimeEditMode, setCookTimeEditMode] = useState(false);

  const handleCookTimeEdit = () => {
    setCookTimeEditMode(true);
  };

  const handleCookTimeCancel = () => {
    setCookTimeEditMode(false);
  };

  const handleCookTimeSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/recipe/updateCookTime/${recipeId}`,
        {
          cookTime: {
            hours: formData.cookTime.hours,
            minutes: formData.cookTime.minutes,
          },
        }
      );

      setCookTimeEditMode(false);
      toast.success("Cooking time updated successfully!");
    } catch (error) {
      console.error("Error updating cooking time:", error);
      toast.error("Failed to update cooking time.");
    }
  };

  const handleCookTimeChange = (field, value) => {
    setFormData({
      ...formData,
      cookTime: {
        ...formData.cookTime,
        [field]: value,
      },
    });
  };

  const handleNutritionalEdit = (field) => {
    setNutritionalEditMode({ ...nutritionalEditMode, [field]: true });
  };

  const handleNutritionalCancel = (field) => {
    setNutritionalEditMode({ ...nutritionalEditMode, [field]: false });
  };

  const handleNutritionalSave = async (field) => {
    try {
      await axios.put(
        `http://localhost:5000/api/recipe/updateNutritionalValues/${recipeId}`,
        {
          nutritionalValues: {
            ...formData.nutritionalValues,
            [field]: formData.nutritionalValues[field],
          },
        }
      );

      setNutritionalEditMode({ ...nutritionalEditMode, [field]: false });
      toast.success(`${field} updated successfully!`);
    } catch (error) {
      console.error("Error updating nutritional value:", error);
      toast.error(`Failed to update ${field}.`);
    }
  };

  const handleNutritionalChange = (field, value) => {
    setFormData({
      ...formData,
      nutritionalValues: {
        ...formData.nutritionalValues,
        [field]: value,
      },
    });
  };

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async (field, action) => {
    if (action === "cancel") {
      // Revert changes and exit edit mode
      setEditMode({ ...editMode, [field]: false });
    } else if (action === "save") {
      try {
        const updatedData = { [field]: formData[field] };
        await axios.put(
          `http://localhost:5000/api/recipe/updateRecipe/${recipeId}`,
          updatedData
        );
        toast.success("Recipe updated successfully!");
      } catch (error) {
        toast.error("Failed to update recipe.");
      }
      setEditMode({ ...editMode, [field]: false });
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        setIsAuthenticated(true);
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipe/getRecipe/${recipeId}`
        );
        const fetchedRecipe = response.data;
        setRecipe(response.data);

        setFormData({
          ...formData,
          title: fetchedRecipe.title || "",
          description: fetchedRecipe.description || "",
          ingredients: fetchedRecipe.ingredients || [{ value: "" }],
          instructions: fetchedRecipe.instructions || [{ value: "" }],
          servings: fetchedRecipe.servings || "",
          prepTime: fetchedRecipe.prepTime || { hours: "", minutes: "" },
          cookTime: fetchedRecipe.cookTime || { hours: "", minutes: "" },
          cuisineType: fetchedRecipe.cuisineType || "",
          nutritionalValues: fetchedRecipe.nutritionalValues || {
            calories: "",
            protein: "",
            fat: "",
            carbs: "",
          },
          dietaryInformation: fetchedRecipe.dietaryInformation || "",
          image: fetchedRecipe.image || null, // Handle image separately
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [{ value: "" }],
    instructions: [{ value: "" }],
    servings: "",
    prepTime: { hours: "", minutes: "" },
    cookTime: { hours: "", minutes: "" },
    cuisineType: "",
    nutritionalValues: { calories: "", protein: "", fat: "", carbs: "" },
    dietaryInformation: "",
    image: null, // Set the base64 image string here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInstructionSave = async (id) => {
    try {
      const instruction = formData.instructions[instructionIndex];
      await axios.put(
        `http://localhost:5000/api/recipe/updateInstruction/${recipeId}`,
        JSON.stringify({
          value: instruction.value,
          instructionId: id, // Include ingredient._id as ingredientId
        }),
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      toast.success("Instruction updated successfully!");
      setInstructionIndex(null);
    } catch (error) {
      toast.error("Failed to update instruction.");
    }
  };

  const handleInstructionEdit = (index) => {
    setInstructionIndex(index);
  };

  const cancelEditInstruction = () => {
    setInstructionIndex(null);
  };

  const deleteInstruction = async (instructionId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/recipe/deleteInstruction/${recipeId}/${instructionId}`
      );

      setFormData((prev) => ({
        ...prev,
        instructions: prev.instructions.filter(
          (instruction) => instruction._id !== instructionId
        ),
      }));

      toast.success("Instruction deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete instruction.");
    }
  };

  const handleInstructionChange = (index, e) => {
    const updatedInstruction = formData.instructions.map((instruction, i) =>
      i === index ? { ...instruction, value: e.target.value } : instruction
    );
    setFormData({ ...formData, instructions: updatedInstruction });
  };

  const handleIngredientSave = async (id) => {
    try {
      const ingredient = formData.ingredients[ingredientIndex];
      await axios.put(
        `http://localhost:5000/api/recipe/updateIngredient/${recipeId}`,
        JSON.stringify({
          value: ingredient.value,
          ingredientId: id, // Include ingredient._id as ingredientId
        }),
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      toast.success("Ingredient updated successfully!");
      setIngredientIndex(null);
    } catch (error) {
      toast.error("Failed to update ingredient.");
    }
  };

  const handleIngredientEdit = (index) => {
    setIngredientIndex(index);
  };

  const cancelEditIngredient = () => {
    setIngredientIndex(null);
  };

  const deleteIngredient = async (ingredientId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/recipe/deleteIngredient/${recipeId}/${ingredientId}`
      );

      setFormData((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter(
          (ingredient) => ingredient._id !== ingredientId
        ),
      }));

      toast.success("Ingredient deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete ingredient.");
    }
  };

  const handleIngredientChange = (index, e) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, value: e.target.value } : ingredient
    );
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setShowSaveButton(true); // Show save button
    }
  };

  const handleImageSave = async () => {
    if (!imageInputRef.current.files[0]) {
      return; // No file selected
    }

    const formData = new FormData();
    formData.append("image", imageInputRef.current.files[0]);

    try {
      await axios.put(
        `http://localhost:5000/api/recipe/updateRecipeImage/${recipeId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Image updated successfully!");
      setShowSaveButton(false); // Hide save button after successful upload
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image.");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-12">
      <ToastContainer />
      <div className="flex justify-between border-y-2 px-16 py-4">
        <h1 className="text-3xl text-black font-semibold">Edit Recipe</h1>
      </div>

      <div className="py-4 px-16 flex flex-col items-center justify-center gap-y-6 pb-[100px]">
        {/* Title */}
        <div className="flex flex-col items-start gap-y-2 w-[70%]">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="recipeTitle"
          >
            Recipe Title :
          </label>
          {editMode.title ? (
            <>
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Enter Recipe Title"
                  className="input input-bordered text-black w-[80%] border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <button
                  className="mx-4"
                  onClick={() => handleSave("title", "save")}
                >
                  <HiOutlineCheck className="text-3xl text-green-400" />
                </button>
                <button onClick={() => handleSave("title", "cancel")}>
                  <HiOutlineX className="text-3xl text-hotPink" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full">
                <p className="text-black w-[80%] px-3 py-3 rounded-md border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0">
                  {formData.title}
                </p>
                <button
                  className="ml-4"
                  onClick={() => toggleEditMode("title")}
                >
                  <HiOutlinePencilAlt className="text-3xl text-hotPink" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Image */}
        <div className="flex flex-col items-start gap-y-2 w-[70%]">
          <label className="text-xl text-black font-semibold" htmlFor="image">
            Recipe Image :
          </label>
          <div className="mb-3 border-[3px] border-hotPink rounded-md">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={formData.title}
                className="h-[300px] w-[400px] object-cover"
              />
            ) : formData.image ? (
              <img
                src={`data:image/jpeg;base64,${formData.image}`}
                alt={formData.title}
                className="h-[300px] w-[400px] object-cover"
              />
            ) : null}
          </div>
          <div className="w-full flex">
            <input
              type="file"
              name="image"
              ref={imageInputRef} // Attach ref to input element
              className="file-input file-input-bordered file-input-hotPink border-hotPink w-[80%] bg-white focus:border-hotPink focus:ring-0"
              onChange={handleImageChange}
            />
            {showSaveButton && (
              <button className="ml-4" onClick={handleImageSave}>
                <HiOutlineCheck className="text-3xl text-green-400" />
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col items-start gap-y-2 w-[70%]">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="recipeTitle"
          >
            Description :
          </label>
          {editMode.description ? (
            <>
              <div className="flex w-full">
                <input
                  type="text"
                  className="input input-bordered text-black w-[80%] border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <button
                  className="mx-4"
                  onClick={() => handleSave("description", "save")}
                >
                  <HiOutlineCheck className="text-3xl text-green-400" />
                </button>
                <button onClick={() => handleSave("description", "cancel")}>
                  <HiOutlineX className="text-3xl text-hotPink" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full">
                <p className="text-black w-[80%] px-3 py-3 rounded-md border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0">
                  {formData.description}
                </p>
                <button
                  onClick={() => toggleEditMode("description")}
                  className="ml-4"
                >
                  <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Ingredients */}
        <div className="flex flex-col items-start gap-y-2 w-[70%]">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="ingredients"
          >
            Ingredients :
          </label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-y-4 w-full items-stretch">
              {ingredientIndex === index ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter your ingredient with their respective quantity"
                    className="input input-bordered text-black w-[80%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                    value={ingredient.value}
                    onChange={(e) => handleIngredientChange(index, e)}
                  />
                  <button
                    onClick={() => handleIngredientSave(ingredient._id)}
                    className=" ml-4"
                  >
                    <HiOutlineCheck className="text-3xl text-green-400" />
                  </button>
                  <button
                    onClick={() => cancelEditIngredient()}
                    className="ml-4"
                  >
                    <HiOutlineX className="text-3xl text-hotPink" />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-black w-[80%] px-3 py-3 rounded-md border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0">
                    {ingredient.value}
                  </p>
                  <button
                    onClick={() => handleIngredientEdit(index)}
                    className="ml-4"
                  >
                    <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                  </button>
                  <button
                    className="p-2 ml-4"
                    onClick={() => deleteIngredient(ingredient._id)}
                    disabled={formData.ingredients.length < 2}
                    type="button"
                  >
                    <HiOutlineTrash className="text-3xl text-hotPink " />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="flex flex-col items-start gap-y-6 w-[70%] my-4">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="instructions"
          >
            Instructions :
          </label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex items-stretch w-full">
              {instructionIndex === index ? (
                <>
                  <input
                    type="text"
                    className="input input-bordered text-black w-[80%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                    value={instruction.value}
                    onChange={(e) => handleInstructionChange(index, e)}
                  />
                  <button
                    onClick={() => handleInstructionSave(instruction._id)}
                    className="ml-4"
                  >
                    <HiOutlineCheck className="text-3xl text-green-400" />
                  </button>
                  <button
                    onClick={() => cancelEditInstruction()}
                    className="ml-4"
                  >
                    <HiOutlineX className="text-3xl text-hotPink" />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-black w-[80%] px-3 py-3 rounded-md border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0">
                    {instruction.value}
                  </p>
                  <button
                    onClick={() => handleInstructionEdit(index)}
                    className="ml-4"
                  >
                    <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                  </button>
                  <button
                    className="p-2 ml-4"
                    onClick={() => deleteInstruction(instruction._id)}
                    disabled={formData.instructions.length < 2}
                    type="button"
                  >
                    <HiOutlineTrash className="text-3xl text-hotPink" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Servings */}
        <div className="flex flex-col items-start gap-y-2 w-[70%]">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="recipeTitle"
          >
            Servings :
          </label>
          {editMode.servings ? (
            <>
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  className="input input-bordered text-black w-[80%] border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                />
                <button
                  onClick={() => handleSave("servings", "save")}
                  className="ml-4"
                >
                  <HiOutlineCheck className="text-3xl text-green-400" />
                </button>
                <button
                  onClick={() => handleSave("servings", "cancel")}
                  className="ml-4"
                >
                  <HiOutlineX className="text-3xl text-hotPink" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full">
                <p className="text-black w-[80%] px-3 py-3 rounded-md border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0">
                  {formData.servings}
                </p>
                <button
                  onClick={() => toggleEditMode("servings")}
                  className="ml-4"
                >
                  <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Prep Time */}
        <div className="flex flex-col items-start gap-y-2 w-[70%]">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="prepTime"
          >
            Preparation Time :
          </label>
          <div className="w-full flex">
            <div className="flex w-[80%] justify-between">
              {prepTimeEditMode ? (
                <>
                  <input
                    type="number"
                    placeholder="Hours"
                    name="prepTimeHours"
                    className="w-[48%] border-2 border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0"
                    value={formData.prepTime.hours}
                    onChange={(e) =>
                      handlePrepTimeChange("hours", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Minutes"
                    name="prepTimeMinutes"
                    className="w-[48%] border-2 border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0"
                    value={formData.prepTime.minutes}
                    onChange={(e) =>
                      handlePrepTimeChange("minutes", e.target.value)
                    }
                  />
                </>
              ) : (
                <div className="flex justify-between w-full text-black">
                  <span className="w-[48%] border-2 border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0">
                    {formData.prepTime.hours} Hours
                  </span>
                  <span className="w-[48%] border-2 border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0">
                    {formData.prepTime.minutes} Minutes
                  </span>
                </div>
              )}
            </div>

            <div>
              {prepTimeEditMode ? (
                <div className="flex gap-x-4 h-full items-stretch">
                  <button className="ml-4" onClick={handlePrepTimeSave}>
                    <HiOutlineCheck className="text-3xl text-green-400" />
                  </button>
                  <button className="" onClick={handlePrepTimeCancel}>
                    <HiOutlineX className="text-3xl text-hotPink" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-x-4 h-full items-stretch">
                  <button className="ml-4" onClick={handlePrepTimeEdit}>
                    <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cook Time */}
        <div className="flex flex-col items-start gap-y-2 w-[70%]">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="prepTime"
          >
            Cooking Time :
          </label>
          <div className="w-full flex">
            <div className="flex w-[80%] justify-between">
              {cookTimeEditMode ? (
                <>
                  <input
                    type="number"
                    placeholder="Hours"
                    name="cookTimeHours"
                    className="w-[48%] border-2 border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0"
                    value={formData.cookTime.hours}
                    onChange={(e) =>
                      handleCookTimeChange("hours", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Minutes"
                    name="cookTimeMinutes"
                    className="w-[48%] border-2 border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0"
                    value={formData.cookTime.minutes}
                    onChange={(e) =>
                      handleCookTimeChange("minutes", e.target.value)
                    }
                  />
                </>
              ) : (
                <div className="flex justify-between w-full text-black">
                  <span className="w-[48%] border-2 border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0">
                    {formData.cookTime.hours} Hours
                  </span>
                  <span className="w-[48%] border-2 border-hotPink rounded-md flex items-center px-3 text-black py-3 bg-white focus:border-hotPink focus:ring-0">
                    {formData.cookTime.minutes} Minutes
                  </span>
                </div>
              )}
            </div>

            <div>
              {cookTimeEditMode ? (
                <div className="flex items-stretch h-full">
                  <button
                    className="mx-4"
                    onClick={handleCookTimeSave}
                  >
                    <HiOutlineCheck className="text-3xl text-green-400" />
                  </button>
                  <button
                    onClick={handleCookTimeCancel}
                  >
                    <HiOutlineX className="text-3xl text-hotPink" />
                  </button>
                </div>
              ) : (
                <div className="flex items-stretch h-full">
                <button className="ml-4" onClick={handleCookTimeEdit}>
                  <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nutritional Values */}
        <div className="flex flex-col items-start gap-y-4 mb-4 w-[70%]">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="nutritionalValues"
          >
            Nutritional Values :
          </label>
          <div className="flex flex-col gap-y-6 w-full">
            {["calories", "protein", "fat", "carbs"].map((field) => (
              <div key={field} className="flex items-center w-full">
                {nutritionalEditMode[field] ? (
                  <>
                    <input
                      type="text"
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      className="input input-bordered text-black border-2 w-[80%] border-hotPink bg-white focus:border-hotPink focus:ring-0"
                      value={formData.nutritionalValues[field]}
                      onChange={(e) =>
                        handleNutritionalChange(field, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleNutritionalSave(field)}
                      className="mx-4"
                    >
                      <HiOutlineCheck className="text-3xl text-green-400" />
                    </button>
                    <button
                      onClick={() => handleNutritionalCancel(field)}
                      className=""
                    >
                      <HiOutlineX className="text-3xl text-hotPink" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-black w-[80%] px-3 py-3 rounded-md border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0">
                      {formData.nutritionalValues[field]}
                    </span>
                    <button
                      onClick={() => handleNutritionalEdit(field)}
                      className="ml-4"
                    >
                      <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Information */}
        <div className="flex flex-col items-start gap-y-2 w-[70%]">
          <label
            className="text-xl text-black font-semibold"
            htmlFor="recipeTitle"
          >
            Dietary Information :
          </label>
          {editMode.dietaryInformation ? (
            <>
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  className="input input-bordered text-black w-[80%] border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0"
                  name="dietaryInformation"
                  value={formData.dietaryInformation}
                  onChange={handleChange}
                />
                <button
                  onClick={() => handleSave("dietaryInformation", "save")}
                  className="ml-4"
                >
                  <HiOutlineCheck className="text-3xl text-green-400" />
                </button>
                <button
                  onClick={() => handleSave("dietaryInformation", "cancel")}
                  className="ml-4"
                >
                  <HiOutlineX className="text-3xl text-hotPink" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full">
                <p className="text-black w-[80%] px-3 py-3 rounded-md border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0">
                  {formData.dietaryInformation}
                </p>
                <button
                  onClick={() => toggleEditMode("dietaryInformation")}
                  className="ml-4"
                >
                  <HiOutlinePencilAlt className="text-3xl text-hotPink " />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
