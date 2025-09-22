const Recipe = require("../models/Recipe");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Rating = require("../models/Rating");
const Collection = require("../models/Collection");
const Bookmark = require("../models/Bookmark");
const Follow = require("../models/Follow");
const mongoose = require("mongoose");
const Like = require("../models/Like");
const { format } = require("date-fns");

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

  const { user } = req;
  const id = user._id;

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

  let nutritionalValuesParsed;
  try {
    nutritionalValuesParsed = JSON.parse(nutritionalValues);
  } catch (error) {
    return res.status(400).json({ error: "Invalid nutritional values format" });
  }

  let prepTimeParsed, cookTimeParsed;
  try {
    prepTimeParsed = JSON.parse(prepTime);
    cookTimeParsed = JSON.parse(cookTime);
  } catch (error) {
    return res.status(400).json({
      error: "Invalid prepTime or cookTime format. Expected JSON string.",
    });
  }

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
    image: req.file ? req.file.buffer : null,
  });

  try {
    const savedRecipe = await newRecipe.save();

    const user = await User.findById(id);
    if (user) {
      user.numberOfRecipes += 1;
      user.points += 100;
      await user.save();
    }

    res.json(savedRecipe);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error saving recipe data.", details: err.message });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const { user } = req;
    const userId = user._id;
    const getChefRank = (points) => {
      if (points >= 1001) return "Legendary Chef";
      if (points >= 501) return "Master Chef";
      if (points >= 301) return "Chef de Cuisine";
      if (points >= 101) return "Sous Chef";
      return "Apprentice Chef";
    };

    const recipes = await Recipe.find();

    const userCollections = await Collection.find({ userId: userId });

    const collectionIds = userCollections.map((collection) => collection._id);

    const recipesWithDetails = await Promise.all(
      recipes.map(async (recipe) => {
        const chef = await User.findById(recipe.chefId);
        const chefRank = getChefRank(chef.points);

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

        let following = false;
        if (userId) {
          const followStatus = await Follow.findOne({
            follower: userId,
            following: chef._id,
          });
          following = !!followStatus;
        }

        let bookmarked = false;
        if (collectionIds.length > 0) {
          const bookmarkStatus = await Bookmark.findOne({
            collectionId: { $in: collectionIds },
            recipeId: recipe._id,
          });
          bookmarked = !!bookmarkStatus;
        }

        const likes = await Like.find({ recipeId: recipe._id });
        const totalLikes = likes.length;

        const likedByUser = likes.some(
          (like) => like.userId.toString() === userId
        );

        const totalComments = await Comment.countDocuments({
          recipeId: recipe._id,
        });

        const recipeImage = recipe.image
          ? recipe.image.toString("base64")
          : null;
        const chefImage = chef.image ? chef.image.toString("base64") : null;

        const formattedDate = format(
          new Date(recipe.createdAt),
          "d MMMM yyyy 'at' h:mma"
        );

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
          averageRating: averageRating,
          chefName: chef.name,
          chefRank: chefRank,
          following: following,
          bookmarked: bookmarked,
          totalLikes: totalLikes,
          totalComments: totalComments,
          likedByUser: likedByUser,
          image: recipeImage,
          chefImage: chefImage,
          createdAt: formattedDate,
        };
      })
    );

    res.status(200).json(recipesWithDetails);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMyRecipes = async (req, res) => {
  const { user } = req;
  const userId = user._id;

  try {
    const recipes = await Recipe.find({ chefId: userId });

    if (!recipes || recipes.length === 0) {
      return res
        .status(404)
        .json({ message: "No recipes found for this user" });
    }

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

    res.json(recipesWithImages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRelatedRecipes = async (req, res) => {
  const { cuisineType } = req.params;
  const { user } = req;
  const userId = user ? user._id : null;

  try {
    const getChefRank = (points) => {
      if (points >= 1001) return "Legendary Chef";
      if (points >= 501) return "Master Chef";
      if (points >= 301) return "Chef de Cuisine";
      if (points >= 101) return "Sous Chef";
      return "Apprentice Chef";
    };

    const relatedRecipes = await Recipe.find({ cuisineType });

    const userCollections = userId ? await Collection.find({ userId: userId }) : [];
    const collectionIds = userCollections.map((collection) => collection._id);

    const recipesWithDetails = await Promise.all(
      relatedRecipes.map(async (recipe) => {
        const chef = await User.findById(recipe.chefId);
        const chefRank = getChefRank(chef.points);

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

        let following = false;
        if (userId) {
          const followStatus = await Follow.findOne({
            follower: userId,
            following: chef._id,
          });
          following = !!followStatus;
        }

        let bookmarked = false;
        if (collectionIds.length > 0) {
          const bookmarkStatus = await Bookmark.findOne({
            collectionId: { $in: collectionIds },
            recipeId: recipe._id,
          });
          bookmarked = !!bookmarkStatus;
        }

        const likes = await Like.find({ recipeId: recipe._id });
        const totalLikes = likes.length;
        const likedByUser = likes.some(
          (like) => like.userId.toString() === userId
        );

        const totalComments = await Comment.countDocuments({
          recipeId: recipe._id,
        });

        const recipeImage = recipe.image
          ? recipe.image.toString("base64")
          : null;
        const chefImage = chef.image ? chef.image.toString("base64") : null;

        const formattedDate = format(
          new Date(recipe.createdAt),
          "d MMMM yyyy 'at' h:mma"
        );

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
          averageRating: averageRating,
          chefName: chef.name,
          chefRank: chefRank,
          following: following,
          bookmarked: bookmarked,
          totalLikes: totalLikes,
          totalComments: totalComments,
          likedByUser: likedByUser,
          image: recipeImage,
          chefImage: chefImage,
          createdAt: formattedDate,
        };
      })
    );

    res.status(200).json(recipesWithDetails);
  } catch (error) {
    console.error("Error fetching related recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { user } = req;
  const userId = user._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const base64Image = recipe.image ? recipe.image.toString("base64") : null;

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

    res.json(recipeWithImage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRecipe = async (req, res) => {
  const { user } = req;
  const userId = user._id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.params;
  const updates = req.body;

  try {
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided" });
    }

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

exports.deleteRecipe = async (req, res) => {
  const { user } = req;
  const userId = user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const user = await User.findById(recipe.chefId);
    if (user) {
      user.numberOfRecipes -= 1;
      await user.save();
    }

    await Recipe.findByIdAndDelete(recipeId);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.postRating = async (req, res) => {
  const { user } = req;
  const userId = user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let { recipeId, rating } = req.body;

  if (!userId || !recipeId || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const chefId = recipe.chefId;

    const existingRating = await Rating.findOne({ userId, recipeId });
    let isNewRecord = false;

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      const newRating = new Rating({ userId, recipeId, chefId, rating });
      await newRating.save();
      isNewRecord = true;
    }

    const chefRatings = await Rating.find({ chefId });

    const totalRatings = chefRatings.length;
    const sumRatings = chefRatings.reduce(
      (acc, ratingDoc) => acc + ratingDoc.rating,
      0
    );
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

    const chef = await User.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    chef.averageRating = averageRating;

    if (isNewRecord) {
      const pointsToAdd = rating * 100;
      chef.points += pointsToAdd;
    }

    await chef.save();

    res.status(200).json({
      message: "Rating posted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateInstruction = async (req, res) => {
  const { user } = req;
  const userId = user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
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
  const { user } = req;
  const userId = user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
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
    if (!nutritionalValues || Object.keys(nutritionalValues).length === 0) {
      return res
        .status(400)
        .json({ error: "No nutritional values provided for update." });
    }

    const updateFields = {};
    for (const key in nutritionalValues) {
      if (nutritionalValues[key] && nutritionalValues[key].trim() !== "") {
        updateFields[`nutritionalValues.${key}`] =
          nutritionalValues[key].trim();
      } else {
        return res.status(400).json({ error: `${key} cannot be empty.` });
      }
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updateFields },
      { new: true, runValidators: true }
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
  const { user } = req;
  const userId = user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (req.file) {
      recipe.image = req.file.buffer;
    } else {
      return res.status(400).json({ message: "No image file provided." });
    }

    await recipe.save();

    res.json({ message: "Image updated successfully!" });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

exports.getRecipeDetails = async (req, res) => {
  const { user } = req;
  const userId = user._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ error: "Invalid recipe ID" });
    }

    const recipe = await Recipe.findById(recipeId).exec();
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const chef = await User.findById(recipe.chefId).exec();
    if (!chef) {
      return res.status(404).json({ error: "Chef not found" });
    }

    const chefImageBase64 = chef.image ? chef.image.toString("base64") : null;

    const totalComments = await Comment.countDocuments({ recipeId }).exec();

    const averageRating = await Rating.aggregate([
      { $match: { recipeId: new mongoose.Types.ObjectId(recipeId) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const avgRating = averageRating[0]
      ? Math.floor(averageRating[0].avgRating)
      : 0;

    const formattedCreatedAt = new Date(recipe.createdAt).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

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

    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the recipe details" });
  }
};
