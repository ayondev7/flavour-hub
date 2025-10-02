const Bookmark = require("../models/Bookmark");
const Collection = require("../models/Collection");
const mongoose = require("mongoose");
// Create a new bookmark
const createBookmark = async (req, res) => {
  try {
    const { collectionId, recipeId } = req.body;

    if (!collectionId || !recipeId) {
      return res
        .status(400)
        .json({ message: "Both collectionId and recipeId are required." });
    }

    // Check if the bookmark already exists
    const existingBookmark = await Bookmark.findOne({ collectionId, recipeId });

    if (existingBookmark) {
      // Delete the existing bookmark
      await Bookmark.deleteOne({ collectionId, recipeId });
      return res.status(200).json({ message: "Bookmark has been removed." });
    }

    // Create a new bookmark if not found
    const newBookmark = await Bookmark.create({ collectionId, recipeId });
    res.status(201).json({
      message: "Bookmark saved successfully.",
      bookmark: newBookmark,
    });
  } catch (error) {
    console.error("Error handling bookmark:", error);
    res.status(500).json({
      message: "An error occurred while processing the bookmark.",
      error: error.message,
    });
  }
};

const removeBookmark = async (req, res) => {
  try {
    const userId = req.headers.userid; // Destructure userId from headers
    const { recipeId } = req.params;

    if (!userId || !recipeId) {
      return res
        .status(400)
        .json({ message: "Both userId and recipeId are required." });
    }

    // Lookup all collections for the user
    const userCollections = await Collection.find({ userId });

    if (userCollections.length === 0) {
      return res
        .status(404)
        .json({ message: "No collections found for this user." });
    }

    // Loop through each collection to find and remove the bookmark
    for (let collection of userCollections) {
      const bookmark = await Bookmark.findOne({ collectionId: collection._id, recipeId });
      
      if (bookmark) {
        // Remove the bookmark if it exists
        await Bookmark.deleteOne({ collectionId: collection._id, recipeId });
        
        return res.status(200).json({ message: "Bookmark has been removed." });
      }
    }

    // If no bookmark was found in any collection
    return res.status(404).json({
      message: "Bookmark not found for the given recipe in any of the user's collections.",
    });

  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({
      message: "An error occurred while removing the bookmark.",
      error: error.message,
    });
  }
};


// Get all bookmarks for a collection
const getBookmarks = async (req, res) => {
  try {
    const { collectionId } = req.params;

    if (!collectionId) {
      return res.status(400).json({ message: "CollectionId is required." });
    }

    const bookmarks = await Bookmark.aggregate([
      { $match: { collectionId: new mongoose.Types.ObjectId(collectionId) } },
      {
        $lookup: {
          from: "recipes",
          localField: "recipeId",
          foreignField: "_id",
          as: "recipeData",
        },
      },
      { $unwind: { path: "$recipeData", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "users",
          localField: "recipeData.chefId",
          foreignField: "_id",
          as: "chefData",
        },
      },
      { $unwind: { path: "$chefData", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "ratings", // Lookup ratings collection
          localField: "recipeId",
          foreignField: "recipeId",
          as: "ratingsData",
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $eq: [{ $size: "$ratingsData" }, 0] }, // If no ratings
              then: 0,
              else: { $avg: "$ratingsData.rating" }, // Calculate average rating
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          recipeId: 1,
          title: "$recipeData.title",
          nutritionalValues: "$recipeData.nutritionalValues",
          bookmarked: { $literal: true },
          chefId: "$recipeData.chefId",
          chefName: "$chefData.name",
          chefImage: "$chefData.image",
          image: "$recipeData.image",
          createdAt: "$recipeData.createdAt",
          averageRating: 1, // Include average rating
        },
      },
    ]);

    const formattedBookmarks = bookmarks.map((bookmark) => ({
      ...bookmark,
      image: bookmark.image,
      chefImage: bookmark.chefImage,
    }));

    res.status(200).json(formattedBookmarks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving bookmarks.", error: error.message });
  }
};





module.exports = {
  createBookmark,
  getBookmarks,
  removeBookmark
};
