const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Rating = require('../models/Rating');
const mongoose = require('mongoose');

exports.createRecipe = (req, res) => {
  const {title, description, ingredients, instructions, servings, prepTime, cookTime, cuisineType, nutritionalValues, dietaryInformation } = req.body;

  const id = req.headers.id;

  // Validate and parse the instruction data
  let instructionsArray;
  try {
      instructionsArray = JSON.parse(instructions);
      // Make sure every instruction object has a value property
      instructionsArray.forEach(instruction => {
          if (!instruction.value) {
              throw new Error('Instruction value is required.');
          }
      });
  } catch (error) {
      return res.status(400).json({ error: 'Invalid instructions format. Instruction value is required.' });
  }

  let ingredientsArray;
  try {
      ingredientsArray = JSON.parse(ingredients);
      // Make sure every instruction object has a value property
      ingredientsArray.forEach(ingredient => {
          if (!ingredient.value) {
              throw new Error('ingredient value is required.');
          }
      });
  } catch (error) {
      return res.status(400).json({ error: 'Invalid ingredients format. Instruction value is required.' });
  }

  let nutritionalValuesParsed;
    try{
        nutritionalValuesParsed = JSON.parse(nutritionalValues);
    } catch(error){
        return res.status(400).json({error: 'invalid nutritional values format'});
    }

   // Parse prepTime
   let prepTimeParsed;
   try {
   prepTimeParsed = JSON.parse(prepTime);
   } catch (error) {
   return res.status(400).json({ error: 'Invalid prepTime format. Expected JSON string.' });
   }

   // Parse cookTime
   let cookTimeParsed;
   try {
   cookTimeParsed = JSON.parse(cookTime);
   } catch (error) {
   return res.status(400).json({ error: 'Invalid cookTime format. Expected JSON string.' });
   }

  const newRecipe = new Recipe({
    title: title,
    description: description,
    ingredients: ingredientsArray,
    instructions: instructionsArray,
    servings: servings,
    prepTime: prepTimeParsed,
    cookTime: cookTimeParsed,
    cuisineType: cuisineType,
    nutritionalValues: nutritionalValuesParsed,
    dietaryInformation: dietaryInformation,
    chefId: id,
    image: req.file ? req.file.buffer : null // Save the image binary data if provided
  });

  newRecipe.save()
      .then(recipe => res.json(recipe))
      .catch(err => res.status(400).json({ error: 'Error saving recipe data.', details: err.message }));
};

exports.getAllRecipes = async (req, res) => {
try {
    // Fetch all recipes from the database
    const recipes = await Recipe.find();

    // Convert each image's binary data to Base64
    const recipesWithImages = recipes.map(recipe => {
    const base64Image = recipe.image ? recipe.image.toString('base64') : null;
    return {
        _id: recipe._id,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        cuisineType: recipe.cuisineType,
        nutritionalValues: recipe.nutritionalValues,
        dietaryInformation: recipe.dietaryInformation,
        image: base64Image,
        chefId: recipe.chefId
    };
    });

    // Send the recipes with images as JSON response
    res.json(recipesWithImages);
} catch (error) {
    res.status(500).send('Internal server error');
}
};

// Controller function to get recipes by user ID
exports.getMyRecipes = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const recipes = await Recipe.find({ chefId: userId });
  
      if (!recipes || recipes.length === 0) {
        return res.status(404).json({ message: 'No recipes found for this user' });
      }
  
      // Convert each image's binary data to Base64
      const recipesWithImages = recipes.map(recipe => {
        const base64Image = recipe.image ? recipe.image.toString('base64') : null;
        return {
          _id: recipe._id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          servings: recipe.servings,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          cuisineType: recipe.cuisineType,
          nutritionalValues: recipe.nutritionalValues,
          dietaryInformation: recipe.dietaryInformation,
          image: base64Image,
          chefId: recipe.chefId
        };
      });
  
      // Send the recipes with images as JSON response
      res.json(recipesWithImages);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getRelatedRecipes = async (req, res) => {
    const { cuisineType } = req.params;
  
    try {
      const recipes = await Recipe.find({ cuisineType: cuisineType });
  
      if (!recipes || recipes.length === 0) {
        return res.status(404).json({ message: 'No recipes found for this user' });
      }
  
      // Convert each image's binary data to Base64
      const recipesWithImages = recipes.map(recipe => {
        const base64Image = recipe.image ? recipe.image.toString('base64') : null;
        return {
          _id: recipe._id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          servings: recipe.servings,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          cuisineType: recipe.cuisineType,
          nutritionalValues: recipe.nutritionalValues,
          dietaryInformation: recipe.dietaryInformation,
          image: base64Image,
          chefId: recipe.chefId
        };
      });
  
      // Send the recipes with images as JSON response
      res.json(recipesWithImages);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getRecipe = async (req, res) => {

    const { recipeId } = req.params;

    try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Convert the image's binary data to Base64
        const base64Image = recipe.image ? recipe.image.toString('base64') : null;

        // Create the recipe object with the image in Base64 format
        const recipeWithImage = {
            _id: recipe._id,
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            servings: recipe.servings,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            cuisineType: recipe.cuisineType,
            nutritionalValues: recipe.nutritionalValues,
            dietaryInformation: recipe.dietaryInformation,
            image: base64Image,
            chefId: recipe.chefId
        };

        // Send the recipe with the image as JSON response
        res.json(recipeWithImage);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Check if any updates were provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No updates provided' });
    }

    // Find and update the recipe
    const recipe = await Recipe.findByIdAndUpdate(id, { $set: updates }, { new: true });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe updated successfully', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.searchRecipes = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }
    const recipes = await Recipe.find({ title: new RegExp(title, 'i') }).select('_id title');
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const result = await Recipe.findByIdAndDelete(recipeId);

    if (!result) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.postRating = async (req,res) => {

  let { userId, recipeId, rating } = req.body;

  if (!userId || !recipeId || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingRating = await Rating.findOne({ userId, recipeId });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.status(200).json({ message: 'Rating updated successfully' });
    }

    const newRating = new Rating({ userId, recipeId, rating });
    await newRating.save();
    res.status(201).json({ message: 'Rating posted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAverageRatingPerRecipe = async (req, res) => {
  try {
    const results = await Rating.aggregate([
      {
        $group: {
          _id: "$recipeId",
          averageRating: { $avg: "$rating" },
          recipeId: { $first: "$recipeId" } // Include recipeId
        }
      },
      {
        $project: {
          recipeId: "$recipeId",
          averageRating: { $round: ["$averageRating", 0] }
        }
      }
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while calculating the average rating' });
  }
};

exports.updateInstruction = async(req,res) => {
  const { recipeId } = req.params;
  const { instructionId, value } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const instructionIndex = recipe.instructions.findIndex(instruction => instruction._id.toString() === instructionId);

    if (instructionIndex === -1) {
      return res.status(404).json({ message: 'Instruction not found' });
    }

    recipe.instructions[instructionIndex].value = value;

    await recipe.save();

    res.status(200).json({ message: 'Instruction updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the instruction' });
  }
}

exports.updateIngredient = async(req,res) => {
  const { recipeId } = req.params;
  const { ingredientId, value } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const ingredientIndex = recipe.ingredients.findIndex(ingredient => ingredient._id.toString() === ingredientId);

    if (ingredientIndex === -1) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    recipe.ingredients[ingredientIndex].value = value;

    await recipe.save();

    res.status(200).json({ message: 'Ingredient updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the ingredient' });
  }
}

exports.deleteIngredient = async (req, res) => {
  const { recipeId } = req.params;
  const { ingredientId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.ingredients.length <= 1) {
      return res.status(400).json({ message: 'Cannot delete the last ingredient of a recipe' });
    }

    const ingredientIndex = recipe.ingredients.findIndex(ingredient => ingredient._id.toString() === ingredientId);

    if (ingredientIndex === -1) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    recipe.ingredients.splice(ingredientIndex, 1);

    await recipe.save();

    res.status(200).json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the ingredient' });
  }
};

exports.deleteInstruction = async (req, res) => {
  const { recipeId } = req.params;
  const { instructionId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.instructions.length <= 1) {
      return res.status(400).json({ message: 'Cannot delete the last ingredient of a recipe' });
    }

    const instructionIndex = recipe.instructions.findIndex(instruction => instruction._id.toString() === instructionId);

    if (instructionIndex === -1) {
      return res.status(404).json({ message: 'Ingredient not found' });
    }

    recipe.instructions.splice(instructionIndex, 1);

    await recipe.save();

    res.status(200).json({ message: 'Instruction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the instruction' });
  }
};

exports.updateNutritionalValues = async (req, res) => {
  const { recipeId } = req.params;
  const { nutritionalValues } = req.body;

  try {
    // Ensure nutritionalValues is an object and not empty
    if (!nutritionalValues || Object.keys(nutritionalValues).length === 0) {
      return res.status(400).json({ error: "No nutritional values provided for update." });
    }

    // Create the update object for MongoDB, ensuring values are not empty
    const updateFields = {};
    for (const key in nutritionalValues) {
      if (nutritionalValues[key] && nutritionalValues[key].trim() !== '') {
        updateFields[`nutritionalValues.${key}`] = nutritionalValues[key].trim();
      } else {
        return res.status(400).json({ error: `${key} cannot be empty.` });
      }
    }

    // Find the recipe and update the nutritional values
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updateFields },
      { new: true, runValidators: true } // new: true returns the updated document
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json({ message: "Nutritional values updated successfully.", recipe: updatedRecipe });
  } catch (error) {
    console.error("Error updating nutritional values:", error);
    res.status(500).json({ error: "An error occurred while updating nutritional values." });
  }
};

exports.updatePrepTime = async (req, res) => {
  const { recipeId } = req.params;
  const { prepTime } = req.body;

  try {
    const updateFields = {};

    if (prepTime.hours !== undefined) {
      updateFields['prepTime.hours'] = prepTime.hours;
    }
    if (prepTime.minutes !== undefined) {
      updateFields['prepTime.minutes'] = prepTime.minutes;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Preparation time updated successfully!', recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCookTime = async (req, res) => {
  const { recipeId } = req.params;
  const { cookTime } = req.body;

  try {
    const updateFields = {};

    if (cookTime.hours !== undefined) {
      updateFields['cookTime.hours'] = cookTime.hours;
    }
    if (cookTime.minutes !== undefined) {
      updateFields['cookTime.minutes'] = cookTime.minutes;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Cooking time updated successfully!', recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateImage = async (req, res) => {
  const { recipeId } = req.params;

  try {
    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if a new image file is provided
    if (req.file) {
      // Update the image field with the new file's buffer
      recipe.image = req.file.buffer;
    } else {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    // Save the updated recipe document
    await recipe.save();

    res.json({ message: 'Image updated successfully!' });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

exports.getRecipeDetails = async (req, res) => {
  try {
      const { recipeId } = req.params;

      // Validate the recipeId
      if (!mongoose.Types.ObjectId.isValid(recipeId)) {
          return res.status(400).json({ error: 'Invalid recipe ID' });
      }

      // Fetch the recipe details by recipeId
      const recipe = await Recipe.findById(recipeId).exec();
      if (!recipe) {
          return res.status(404).json({ error: 'Recipe not found' });
      }

      // Fetch the chef details
      const chef = await User.findById(recipe.chefId).exec();
      if (!chef) {
          return res.status(404).json({ error: 'Chef not found' });
      }

      // Convert image buffer to base64
      const chefImageBase64 = chef.image ? chef.image.toString('base64') : null;

      // Fetch total number of comments for the recipe
      const totalComments = await Comment.countDocuments({ recipeId }).exec();

      // Fetch average rating for the recipe and convert it to an integer
      const averageRating = await Rating.aggregate([
          { $match: { recipeId: new mongoose.Types.ObjectId(recipeId) } },
          { $group: { _id: null, avgRating: { $avg: "$rating" } } }
      ]);
      const avgRating = averageRating[0] ? Math.floor(averageRating[0].avgRating) : 0;

      // Format the createdAt date to the desired format
      const formattedCreatedAt = new Date(recipe.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
      });

      // Form the response JSON
      const response = {
          recipeId: recipe._id,
          chef: {
              userId: chef._id,
              name: chef.name,
              image: chefImageBase64
          },
          totalComments,
          avgRating,
          createdAt: formattedCreatedAt
      };

      // Send the response
      res.json(response);

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the recipe details' });
  }
};
