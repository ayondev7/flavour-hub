const Collection = require('../models/Collection');
const mongoose = require('mongoose');
const { format } = require('date-fns');

// Create a new collection
const createCollection = async (req, res) => {
  try {
    const { title, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: 'Title and userId are required.' });
    }

    const newCollection = await Collection.create({ title, userId });
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ message: 'Error creating collection.', error: error.message });
  }
};

// Get all collections
const getCollections = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required.' });
    }

    // Run aggregation with lookup
    const collections = await Collection.aggregate([
      // Match collections for the user
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // Ensure userId is an ObjectId if required

      // Lookup bookmarks
      {
        $lookup: {
          from: 'bookmarks', // Ensure the collection name is correct
          localField: '_id', // The field in Collection
          foreignField: 'collectionId', // The field in Bookmark
          as: 'bookmarks', // Result alias
        },
      },

      // Add a bookmarkCount field
      {
        $addFields: {
          bookmarkCount: { $size: { $ifNull: ['$bookmarks', []] } }, // Ensure an empty array if no bookmarks
        },
      },

      // Optionally project only required fields
      {
        $project: {
          _id: 1,
          title: 1,
          bookmarkCount: 1,
          updatedAt: 1,
          createdAt:1
        },
      },

      // Sort collections by updatedAt in descending order
      {
        $sort: { updatedAt: -1 }, // Latest collections first
      },
    ]);

    // Format the updatedAt field using date-fns
    const formattedCollections = collections.map(collection => {
      const formattedUpdatedAt = format(new Date(collection.updatedAt), "dd MMMM yyyy 'at' h:mma").toLowerCase();
      return {
        ...collection,
        updatedAt: formattedUpdatedAt,
      };
    });

    // Send the response
    res.status(200).json(formattedCollections);
  } catch (error) {
    console.error("Error during aggregation:", error);
    res.status(500).json({ message: 'Error retrieving collections.', error: error.message });
  }
};




module.exports = {
  createCollection,
  getCollections,
};
