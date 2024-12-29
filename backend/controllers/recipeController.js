const Recipe = require("../models/Recipe");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");
const Collection = require("../models/Collection");
const Bookmark = require("../models/Bookmark");
const Follow = require("../models/Follow");
const mongoose = require("mongoose");

exports.createRecipe = async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    servings,
    prepTime,
    cookTime,
    mealType,
    cuisineType,
    nutritionalValues,
    dietaryInformation,
  } = req.body;
  const id = req.headers.id;

  // Validate and parse the instruction data
  let instructionsArray;
  try {
    instructionsArray = JSON.parse(instructions);
    instructionsArray.forEach((instruction) => {
      if (!instruction.value) {
        throw new Error("Instruction value is required.");
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: "Invalid instructions format. Instruction value is required.",
    });
  }

  // Validate and parse the ingredients data
  let ingredientsArray;
  try {
    ingredientsArray = JSON.parse(ingredients);
    ingredientsArray.forEach((ingredient) => {
      if (!ingredient.value) {
        throw new Error("Ingredient value is required.");
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: "Invalid ingredients format. Ingredient value is required.",
    });
  }

  // Parse nutritionalValues
  let nutritionalValuesParsed;
  try {
    nutritionalValuesParsed = JSON.parse(nutritionalValues);
  } catch (error) {
    return res.status(400).json({ error: "Invalid nutritional values format" });
  }

  // Parse prepTime and cookTime
  let prepTimeParsed, cookTimeParsed;
  try {
    prepTimeParsed = JSON.parse(prepTime);
    cookTimeParsed = JSON.parse(cookTime);
  } catch (error) {
    return res.status(400).json({
      error: "Invalid prepTime or cookTime format. Expected JSON string.",
    });
  }

  // Create new recipe
  const newRecipe = new Recipe({
    title,
    description,
    ingredients: ingredientsArray,
    instructions: instructionsArray,
    servings,
    prepTime: prepTimeParsed,
    cookTime: cookTimeParsed,
    cuisineType,
    mealType,
    nutritionalValues: nutritionalValuesParsed,
    dietaryInformation,
    chefId: id,
    image: req.file ? req.file.buffer : null, // Save the image binary data if provided
  });

  try {
    // Save the recipe to the database
    const savedRecipe = await newRecipe.save();

    // Increment the numberOfRecipes field in the user's document
    const user = await User.findById(id);
    if (user) {
      user.numberOfRecipes += 1; // Increment the numberOfRecipes field by 1
      user.points += 100; // Add 100 points to the user's points field
      await user.save(); // Save the updated user document
    }

    // Respond with the saved recipe data
    res.json(savedRecipe);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error saving recipe data.", details: err.message });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const userId = req.headers.userid; // Extract userId from headers

    // Helper function to determine the rank of a chef
    const getChefRank = (points) => {
      if (points >= 1001) return "Legendary Chef";
      if (points >= 501) return "Master Chef";
      if (points >= 301) return "Chef de Cuisine";
      if (points >= 101) return "Sous Chef";
      return "Apprentice Chef";
    };

    // Fetch all recipes
    const recipes = await Recipe.find();

    // Fetch the user's collections
    const userCollections = await Collection.find({ userId: userId });

    // Extract collection IDs for the user
    const collectionIds = userCollections.map((collection) => collection._id);

    // Use Promise.all to process recipes in parallel
    const recipesWithDetails = await Promise.all(
      recipes.map(async (recipe) => {
        const chef = await User.findById(recipe.chefId);
        const chefRank = getChefRank(chef.points);

        // Calculate the average rating for the recipe from the Rating collection
        const ratings = await Rating.find({ recipeId: recipe._id });
        const totalRatings = ratings.length;
        const sumRatings = ratings.reduce(
          (acc, ratingDoc) => acc + ratingDoc.rating,
          0
        );
        const averageRating =
          totalRatings > 0
            ? (sumRatings / totalRatings).toFixed(2)
            : "No ratings yet";

        // Check following status
        let following = false;
        if (userId) {
          const followStatus = await Follow.findOne({
            follower: userId,
            following: chef._id,
          });
          following = !!followStatus; // Set to true if follow status exists
        }

        // Check bookmarked status
        let bookmarked = false;
        if (collectionIds.length > 0) {
          const bookmarkStatus = await Bookmark.findOne({
            collectionId: { $in: collectionIds },
            recipeId: recipe._id,
          });
          bookmarked = !!bookmarkStatus; // Set to true if bookmark status exists
        }

        // Convert images to Base64 if available
        const recipeImage = recipe.image
          ? recipe.image.toString("base64")
          : null;
        const chefImage = chef.image ? chef.image.toString("base64") : null;

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
          chefId: recipe.chefId,
          averageRating: averageRating, // Include calculated average rating
          chefName: chef.name,
          chefRank: chefRank,
          following: following, // Include following status
          bookmarked: bookmarked, // Include bookmarked status
          image: recipeImage,
          chefImage: chefImage,
          createdAt: recipe.createdAt,
        };
      })
    );

    // Respond with the processed recipes
    res.status(200).json(recipesWithDetails);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get recipes by user ID
exports.getMyRecipes = async (req, res) => {
  const { userId } = req.params;

  try {
    const recipes = await Recipe.find({ chefId: userId });

    if (!recipes || recipes.length === 0) {
      return res
        .status(404)
        .json({ message: "No recipes found for this user" });
    }

    // Convert each image's binary data to Base64
    const recipesWithImages = recipes.map((recipe) => {
      const base64Image = recipe.image ? recipe.image.toString("base64") : null;
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
        chefId: recipe.chefId,
      };
    });

    // Send the recipes with images as JSON response
    res.json(recipesWithImages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRelatedRecipes = async (req, res) => {
  const { cuisineType } = req.params;

  try {
    // Perform aggregation to fetch related recipes along with user info and average rating
    const relatedRecipes = await Recipe.aggregate([
      {
        $match: { cuisineType: cuisineType }, // Match recipes with the given cuisineType
      },
      {
        $lookup: {
          from: "users", // Name of the User collection
          localField: "chefId", // Field in Recipe collection
          foreignField: "_id", // Field in User collection
          as: "chefDetails", // Output array field for joined user data
        },
      },
      { $unwind: { path: "$chefDetails", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "ratings", // Name of the Ratings collection
          localField: "_id", // Field in Recipe collection
          foreignField: "recipeId", // Field in Rating collection
          as: "ratings", // Output array field for ratings
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratings" }, 0] },
              then: { $avg: "$ratings.rating" },
              else: null,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          ingredients: 1,
          instructions: 1,
          servings: 1,
          prepTime: 1,
          cookTime: 1,
          cuisineType: 1,
          nutritionalValues: 1,
          dietaryInformation: 1,
          chefId: 1,
          averageRating: 1,
          chefName: "$chefDetails.name",
          chefImage: "$chefDetails.image",
          image: 1,
        },
      },
    ]);

    // Convert images (both recipe and chef) to Base64
    const recipesWithImages = relatedRecipes.map((recipe) => ({
      ...recipe,
      image: recipe.image ? recipe.image.toString("base64") : null, // Convert recipe image
      chefImage: recipe.chefImage ? recipe.chefImage.toString("base64") : null, // Convert chef image
    }));

    // Send the aggregated data as JSON response
    res.json(recipesWithImages);
  } catch (error) {
    console.error("Error fetching related recipes:", error);
    res.status(500).send("Internal server error");
  }
};

exports.getRecipe = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Convert the image's binary data to Base64
    const base64Image = recipe.image ? recipe.image.toString("base64") : null;

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
      chefId: recipe.chefId,
    };

    // Send the recipe with the image as JSON response
    res.json(recipeWithImage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Check if any updates were provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided" });
    }

    // Find and update the recipe
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.searchRecipes = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res
        .status(400)
        .json({ error: "Title query parameter is required" });
    }
    const recipes = await Recipe.find({ title: new RegExp(title, "i") }).select(
      "_id title"
    );
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;

    // Find the recipe to be deleted
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Find the user who created the recipe
    const user = await User.findById(recipe.chefId); // Assuming chefId is the user who created the recipe
    if (user) {
      // Decrement the user's numberOfRecipes by 1
      user.numberOfRecipes -= 1;
      await user.save(); // Save the updated user document
    }

    // Delete the recipe
    await Recipe.findByIdAndDelete(recipeId);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.postRating = async (req, res) => {
  let { userId, recipeId, rating } = req.body;

  if (!userId || !recipeId || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch the recipe to get the chefId
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const chefId = recipe.chefId;

    // Check if the user has already rated this recipe
    const existingRating = await Rating.findOne({ userId, recipeId });
    let isNewRecord = false; // Flag to check if a new record is created

    // If the rating already exists, update it
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      // Create a new rating if it doesn't exist
      const newRating = new Rating({ userId, recipeId, chefId, rating });
      await newRating.save();
      isNewRecord = true; // Set flag to true for a new record
    }

    // Recalculate the average rating of the chef's recipes
    const chefRatings = await Rating.find({ chefId });

    // Calculate average rating for the chef
    const totalRatings = chefRatings.length;
    const sumRatings = chefRatings.reduce(
      (acc, ratingDoc) => acc + ratingDoc.rating,
      0
    );
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

    // Update the chef's averageRating field
    const chef = await User.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    chef.averageRating = averageRating;

    // Add points to the chef only if a new record is created
    if (isNewRecord) {
      const pointsToAdd = rating * 100;
      chef.points += pointsToAdd;
    }

    // Save the updated chef
    await chef.save();

    res.status(200).json({
      message: "Rating posted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateInstruction = async (req, res) => {
  const { recipeId } = req.params;
  const { instructionId, value } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const instructionIndex = recipe.instructions.findIndex(
      (instruction) => instruction._id.toString() === instructionId
    );

    if (instructionIndex === -1) {
      return res.status(404).json({ message: "Instruction not found" });
    }

    recipe.instructions[instructionIndex].value = value;

    await recipe.save();

    res.status(200).json({ message: "Instruction updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the instruction" });
  }
};

exports.updateIngredient = async (req, res) => {
  const { recipeId } = req.params;
  const { ingredientId, value } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const ingredientIndex = recipe.ingredients.findIndex(
      (ingredient) => ingredient._id.toString() === ingredientId
    );

    if (ingredientIndex === -1) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    recipe.ingredients[ingredientIndex].value = value;

    await recipe.save();

    res.status(200).json({ message: "Ingredient updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the ingredient" });
  }
};

exports.deleteIngredient = async (req, res) => {
  const { recipeId } = req.params;
  const { ingredientId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.ingredients.length <= 1) {
      return res
        .status(400)
        .json({ message: "Cannot delete the last ingredient of a recipe" });
    }

    const ingredientIndex = recipe.ingredients.findIndex(
      (ingredient) => ingredient._id.toString() === ingredientId
    );

    if (ingredientIndex === -1) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    recipe.ingredients.splice(ingredientIndex, 1);

    await recipe.save();

    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the ingredient" });
  }
};

exports.deleteInstruction = async (req, res) => {
  const { recipeId } = req.params;
  const { instructionId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.instructions.length <= 1) {
      return res
        .status(400)
        .json({ message: "Cannot delete the last ingredient of a recipe" });
    }

    const instructionIndex = recipe.instructions.findIndex(
      (instruction) => instruction._id.toString() === instructionId
    );

    if (instructionIndex === -1) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    recipe.instructions.splice(instructionIndex, 1);

    await recipe.save();

    res.status(200).json({ message: "Instruction deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the instruction" });
  }
};

exports.updateNutritionalValues = async (req, res) => {
  const { recipeId } = req.params;
  const { nutritionalValues } = req.body;

  try {
    // Ensure nutritionalValues is an object and not empty
    if (!nutritionalValues || Object.keys(nutritionalValues).length === 0) {
      return res
        .status(400)
        .json({ error: "No nutritional values provided for update." });
    }

    // Create the update object for MongoDB, ensuring values are not empty
    const updateFields = {};
    for (const key in nutritionalValues) {
      if (nutritionalValues[key] && nutritionalValues[key].trim() !== "") {
        updateFields[`nutritionalValues.${key}`] =
          nutritionalValues[key].trim();
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

    res.status(200).json({
      message: "Nutritional values updated successfully.",
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating nutritional values:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating nutritional values." });
  }
};

exports.updatePrepTime = async (req, res) => {
  const { recipeId } = req.params;
  const { prepTime } = req.body;

  try {
    const updateFields = {};

    if (prepTime.hours !== undefined) {
      updateFields["prepTime.hours"] = prepTime.hours;
    }
    if (prepTime.minutes !== undefined) {
      updateFields["prepTime.minutes"] = prepTime.minutes;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({
      message: "Preparation time updated successfully!",
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCookTime = async (req, res) => {
  const { recipeId } = req.params;
  const { cookTime } = req.body;

  try {
    const updateFields = {};

    if (cookTime.hours !== undefined) {
      updateFields["cookTime.hours"] = cookTime.hours;
    }
    if (cookTime.minutes !== undefined) {
      updateFields["cookTime.minutes"] = cookTime.minutes;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({
      message: "Cooking time updated successfully!",
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateImage = async (req, res) => {
  const { recipeId } = req.params;

  try {
    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if a new image file is provided
    if (req.file) {
      // Update the image field with the new file's buffer
      recipe.image = req.file.buffer;
    } else {
      return res.status(400).json({ message: "No image file provided." });
    }

    // Save the updated recipe document
    await recipe.save();

    res.json({ message: "Image updated successfully!" });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

exports.getRecipeDetails = async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Validate the recipeId
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ error: "Invalid recipe ID" });
    }

    // Fetch the recipe details by recipeId
    const recipe = await Recipe.findById(recipeId).exec();
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Fetch the chef details
    const chef = await User.findById(recipe.chefId).exec();
    if (!chef) {
      return res.status(404).json({ error: "Chef not found" });
    }

    // Convert image buffer to base64
    const chefImageBase64 = chef.image ? chef.image.toString("base64") : null;

    // Fetch total number of comments for the recipe
    const totalComments = await Comment.countDocuments({ recipeId }).exec();

    // Fetch average rating for the recipe and convert it to an integer
    const averageRating = await Rating.aggregate([
      { $match: { recipeId: new mongoose.Types.ObjectId(recipeId) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating = averageRating[0]
      ? Math.floor(averageRating[0].avgRating)
      : 0;

    // Format the createdAt date to the desired format
    const formattedCreatedAt = new Date(recipe.createdAt).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    // Form the response JSON
    const response = {
      recipeId: recipe._id,
      chef: {
        userId: chef._id,
        name: chef.name,
        image: chefImageBase64,
      },
      totalComments,
      avgRating,
      createdAt: formattedCreatedAt,
    };

    // Send the response
    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the recipe details" });
  }
};
