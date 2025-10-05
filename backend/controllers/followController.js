const Follow = require('../models/Follow');
const User = require('../models/User');
const Notification = require('../models/Notification');
const socketManager = require('../socket/socketManager');
const { formatNotificationForEmit } = require('../utils/notificationFormatter');

const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({ message: 'Follower or Following user not found' });
    }

    const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });

    if (existingFollow) {
      await existingFollow.deleteOne();
      return res.status(200).json({ message: 'You have unfollowed this user' });
    } else {
      const follow = new Follow({
        follower: followerId,
        following: followingId,
      });

      await follow.save();

      const notification = new Notification({
        followerId,
        userId: followingId,
        type: 'follow',
      });

      await notification.save();

      const populatedNotification = await Notification.findById(notification._id)
        .populate('followerId', 'name image')
        .lean();

      const formattedNotification = await formatNotificationForEmit(populatedNotification, 'follow');

      if (formattedNotification) {
        socketManager.emitToUser(followingId.toString(), 'notification', formattedNotification);
      }

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
