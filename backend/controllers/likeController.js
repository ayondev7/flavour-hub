const Like = require('../models/Like'); 
const Notification = require('../models/Notification');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const socketManager = require('../socket/socketManager');

const toggleLike = async (req, res) => {
  try {
      const { userId, recipeId } = req.body;

      const existingLike = await Like.findOne({ userId, recipeId });

      if (existingLike) {
          await Like.findByIdAndDelete(existingLike._id);
          return res.status(200).json({ message: 'You have unliked this post.' });
      } else {
          const newLike = new Like({ userId, recipeId });
          await newLike.save();

          const recipe = await Recipe.findById(recipeId);
          if (!recipe) {
              return res.status(404).json({ message: 'Recipe not found' });
          }
          const chefId = recipe.chefId;

          const notification = new Notification({
              likerId: userId,
              recipeId: recipeId,
              userId: chefId,
              type: 'like'
          });

          await notification.save();

          const populatedNotification = await Notification.findById(notification._id)
            .populate('likerId', 'name image')
            .populate('recipeId', 'title')
            .lean();

          socketManager.emitToUser(chefId, 'notification', populatedNotification);

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
  
      const likes = await Like.find({ recipeId });
  
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
