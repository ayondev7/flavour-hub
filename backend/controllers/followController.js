const Follow = require('../models/Follow');
const User = require('../models/User');
const Notification = require('../models/Notification'); // Import Notification model

// Function to follow a user
const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    // Ensure the follower and following are valid users
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({ message: 'Follower or Following user not found' });
    }

    // Check if the user is already following the target user
    const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });

    if (existingFollow) {
      // Unfollow the user
      await existingFollow.deleteOne();
      return res.status(200).json({ message: 'You have unfollowed this user' });
    } else {
      // Create a new follow relationship
      const follow = new Follow({
        follower: followerId,
        following: followingId,
      });

      await follow.save();

      // Create a notification for the new follow
      const notification = new Notification({
        followerId,       // The user who is following
        userId: followingId,  // The user being followed
        type: 'follow',    // The type of notification
      });

      await notification.save();

      return res.status(201).json({ message: 'You have followed this user' });
    }
  } catch (error) {
    console.error('Error in follow/unfollow user:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  followUser
};
