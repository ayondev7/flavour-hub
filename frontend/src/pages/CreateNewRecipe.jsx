import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import {jwtDecode} from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewRecipe = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        setIsAuthenticated(true);
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [{ value: '' }],
    instructions: [{ value: '' }],
    servings: '',
    prepTime: { hours: '', minutes: '' },
    cookTime: { hours: '', minutes: '' },
    cuisineType: '',
    nutritionalValues: { calories: '', protein: '', fat: '', carbs: '' },
    dietaryInformation: '',
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
    setFormData({ ...formData, ingredients: [...formData.ingredients, { value: '' }] });
  };

  const removeIngredient = (index) => {
    const ingredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients });
  };

  const addInstruction = (e) => {
    e.preventDefault();
    setFormData({ ...formData, instructions: [...formData.instructions, { value: '' }] });
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

    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const data = new FormData();

    for (const key in formData) {
      if (
        key !== 'nutritionalValues' &&
        key !== 'ingredients' &&
        key !== 'instructions' &&
        key !== 'prepTime' &&
        key !== 'cookTime'
      ) {
        data.append(key, formData[key]);
      } else {
        data.append(key, JSON.stringify(formData[key]));
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/recipe/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          id: userId,
        },
      });
      toast.success('Recipe created successfully!', {
        onClose: () => {
          window.location.reload();
        }
      });
    } catch (error) {
      toast.error('Failed to create recipe.',{
        onClose: () => {
          window.location.reload();
        }
      });
    }

    // Clear the form fields
    setFormData({
      title: '',
      description: '',
      ingredients: [{ value: '' }],
      instructions: [{ value: '' }],
      servings: '',
      prepTime: { hours: '', minutes: '' },
      cookTime: { hours: '', minutes: '' },
      cuisineType: '',
      nutritionalValues: { calories: '', protein: '', fat: '', carbs: '' },
      dietaryInformation: '',
      image: null,
    });

  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='pt-12'>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-between border-y-2 px-16 py-4'>
          <h1 className='text-3xl text-black font-semibold'>Create New Recipe</h1>
          <button type="submit" className="btn btn-md w-[150px] bg-hotPink text-white border-none text-xl" disabled={isLoading}>
                {isLoading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                'Save'
              )}
          </button>
        </div>

        <div className="py-4 px-16 flex flex-col items-center justify-center gap-y-6 pb-[100px]">
          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="recipeTitle">Recipe Title :</label>
            <input 
              type="text" 
              placeholder="Enter Recipe Title" 
              className="input input-bordered text-black w-[80%] border-2 border-hotPink bg-white focus:border-hotPink focus:ring-0"
              name='title'
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="image">Recipe Image :</label>
            <input 
              type="file" 
              name='image'
              className="file-input file-input-bordered file-input-hotPink border-hotPink w-[80%] bg-white focus:border-hotPink focus:ring-0"
              onChange={handleImageChange}
            />
          </div>

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="description">Description :</label>
            <input 
              type="text" 
              placeholder="Say a few things about your recipe" 
              className="input input-bordered w-[80%] text-black border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
              name='description'
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="ingredients">Ingredients :</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className='flex items-start gap-y-4 w-[80%]'>
                <input
                  type="text"
                  placeholder="Enter your ingredient with their respective quantity"
                  className="input input-bordered text-black w-[80%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                  value={ingredient.value}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
                <button className="p-2 ml-4" onClick={() => removeIngredient(index)} disabled={formData.ingredients.length < 2} type='button'>
                  <FaTrashAlt className='text-xl text-hotPink hover:cursor-pointer' />
                </button>
              </div>
            ))}
            <button className="btn btn-outline border-hotPink text-hotPink my-2" onClick={addIngredient}>
              <BsPlusLg /> Add new ingredient
            </button>
          </div>

          <div className='flex flex-col items-start gap-y-4 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="instruction">Instructions :</label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className='flex gap-y-2 w-[80%]'>
                <input
                  type="text"
                  placeholder="Enter your instruction with their respective quantity"
                  className="input input-bordered text-black w-[80%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                  value={instruction.value}
                  onChange={(e) => handleInstructionChange(index, e)}
                />
                <button className="p-2 ml-4" onClick={() => removeInstruction(index)} disabled={formData.instructions.length < 2} type='button'>
                  <FaTrashAlt className='text-xl text-hotPink hover:cursor-pointer' />
                </button>
              </div>
            ))}
            <button className="btn btn-outline border-hotPink text-hotPink my-2" onClick={addInstruction}>
              <BsPlusLg /> Add new instruction
            </button>
          </div>

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="servings">Servings :</label>
            <input 
              type="text" 
              placeholder="Number of servings" 
              className="input input-bordered text-black w-[80%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
              name='servings'
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="prepTime">Preparation Time :</label>
            <div className='flex justify-between w-[80%]'>
              <input 
                type="number" 
                placeholder="Hours" 
                name='prepTimeHours'
                className="input input-bordered text-black w-[48%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={formData.prepTime.hours}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 24) {
                    setFormData({ ...formData, prepTime: { ...formData.prepTime, hours: value } });
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
                name='prepTimeMinutes'
                className="input input-bordered text-black w-[48%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={formData.prepTime.minutes}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 60) {
                    setFormData({ ...formData, prepTime: { ...formData.prepTime, minutes: value } });
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

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="cookTime">Cooking Time :</label>
            <div className='flex justify-between w-[80%]'>
              <input 
                type="number" 
                placeholder="Hours" 
                name='cookTimeHours'
                className="input input-bordered text-black w-[48%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={formData.cookTime.hours}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 24) {
                    setFormData({ ...formData, cookTime: { ...formData.cookTime, hours: value } });
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
                name='cookTimeMinutes'
                className="input input-bordered text-black w-[48%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={formData.cookTime.minutes}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 60) {
                    setFormData({ ...formData, cookTime: { ...formData.cookTime, minutes: value } });
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

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="cuisineType">Cuisine Type :</label>
            <input 
              type="text" 
              placeholder="E.g., Indian, Chinese, Italian" 
              className="input input-bordered text-black w-[80%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
              name='cuisineType'
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="nutritionalValues">Nutritional Values :</label>
            <div className='flex justify-between w-[80%]'>
              <input 
                type="text" 
                placeholder="Enter Calories" 
                name='calories'
                className="input input-bordered text-black w-[48%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={formData.nutritionalValues.calories}
                onChange={(e) => setFormData({ ...formData, nutritionalValues: { ...formData.nutritionalValues, calories: e.target.value } })}
              />
              <input 
                type="text" 
                placeholder="Enter Protein" 
                name='protein'
                className="input input-bordered text-black w-[48%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={formData.nutritionalValues.protein}
                onChange={(e) => setFormData({ ...formData, nutritionalValues: { ...formData.nutritionalValues, protein: e.target.value } })}
              />
            </div>
            <div className='flex justify-between w-[80%]'>
              <input 
                type="text" 
                placeholder="Enter Carbs" 
                name='carbs'
                className="input input-bordered text-black w-[48%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={formData.nutritionalValues.carbs}
                onChange={(e) => setFormData({ ...formData, nutritionalValues: { ...formData.nutritionalValues, carbs: e.target.value } })}
              />
              <input 
                type="text" 
                placeholder="Enter fat" 
                name='fat'
                className="input input-bordered text-black w-[48%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
                value={formData.nutritionalValues.fat}
                onChange={(e) => setFormData({ ...formData, nutritionalValues: { ...formData.nutritionalValues, fat: e.target.value } })}
              />
            </div>
          </div> 

          <div className='flex flex-col items-start gap-y-2 w-[60%]'>
            <label className='text-xl text-black font-semibold' htmlFor="dietaryInformation">Dietary Information :</label>
            <input 
              type="text" 
              placeholder="E.g., vegan-friendly, gluten-free" 
              className="input input-bordered text-black w-[80%] border-2 border-gray-300 bg-white focus:border-hotPink focus:ring-0"
              name='dietaryInformation'
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateNewRecipe;
