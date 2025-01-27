const Like = require('../models/Like'); 

const toggleLike = async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        // Check if a like already exists
        const existingLike = await Like.findOne({ userId, recipeId });

        if (existingLike) {
            // If it exists, remove it (unlike)
            await Like.findByIdAndDelete(existingLike._id);
            return res.status(200).json({ message: 'You have unliked this post.' });
        } else {
            // If it doesn't exist, create a new like
            const newLike = new Like({ userId, recipeId });
            await newLike.save();
            return res.status(201).json({ message: 'You have liked this post.', like: newLike });
        }
    } catch (error) {
        console.error('Error toggling like:', error);
        return res.status(500).json({ message: 'An error occurred while toggling the like.', error: error.message });
    }
};

const getLikes = async (req, res) => {
    try {
      const { recipeId, userId } = req.params;
  
      // Fetch all likes for the recipe
      const likes = await Like.find({ recipeId });
  
      // Check if the user has liked the recipe (optional)
      const userHasLiked = likes.some((like) => like.userId.toString() === userId);
  
      return res.status(200).json({
        totalLikes: likes.length,
        userHasLiked,
      });
    } catch (error) {
      console.error("Error fetching likes:", error);
      return res.status(500).json({ message: "Error fetching likes", error: error.message });
    }
  };
  

module.exports = {
    toggleLike,getLikes
  };
