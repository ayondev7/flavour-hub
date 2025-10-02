const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const User = require("../models/User");
const { format } = require("date-fns");

exports.postComment = async (req, res) => {
  const { userId, recipeId, content, parentCommentId } = req.body;

  if (!userId || !recipeId || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the recipe to get the chefId
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const chefId = recipe.chefId; // Assuming the Recipe model has a field chefId for the chef

    // Create and save the new comment
    const newComment = new Comment({
      userId,
      recipeId,
      content,
      parentCommentId: parentCommentId || null, // Default to null if not provided
    });
    await newComment.save();

    // Create and save the notification with the chefId as the userId
    const newNotification = new Notification({
      commentorId: userId,
      recipeId,
      userId: chefId, // Set the chefId as the userId in the notification
      type: 'comment',
    });
    await newNotification.save();

    res
      .status(201)
      .json({
        message: "Comment posted and notification created successfully",
      });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.aggregate([
      {
        $match: { recipeId: new mongoose.Types.ObjectId(req.params.recipeId) },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          name: "$userDetails.name",
          image: "$userDetails.image",
          isReply: { $cond: [{ $ifNull: ["$parentId", false] }, true, false] },
        },
      },
      {
        $project: {
          userDetails: 0,
        },
      },
    ]);

    const commentsWithImages = comments.map((comment) => {
      return {
        ...comment,
        image: comment.image,
        formattedDate: comment.createdAt ? format(new Date(comment.createdAt), "d MMMM yyyy, h:mm a") : null,
      };
    });

    res.status(200).json(commentsWithImages);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateComment = async (req, res) => {
  const { commentId, content } = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment updated successfully.", comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getNotificationsById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch notifications
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    // Prepare response data by separating notifications based on type
    const notificationsData = await Promise.all(
      notifications.map(async (notification) => {
        const { type, commentorId, likerId, followerId, recipeId, createdAt } = notification;

        let userDetails = null;
        let notificationType = '';
        let recipeIdData = null;

        if (type === 'follow' && followerId) {
          // Handle follow type notification
          notificationType = 'follow';
          userDetails = await User.findById(followerId);
        } else if (type === 'comment' || type === 'like') {
          // Handle comment or like type notification
          notificationType = type;

          // Look up the recipe by recipeId
          const recipe = await Recipe.findById(recipeId);
          if (!recipe) return null; // If no recipe found, skip this notification

          // Check if the recipe's chefId matches the userId from params
          if (recipe.chefId.toString() === userId) {
            // If it matches, proceed based on the type of notification
            if (type === 'comment' && commentorId) {
              userDetails = await User.findById(commentorId); // Get commentor details
            } else if (type === 'like' && likerId) {
              userDetails = await User.findById(likerId); // Get liker details
            }

            // If userDetails is available, store the recipeId for response
            if (userDetails) {
              recipeIdData = recipeId;
            }
          }
        }

        // Skip the notification if userDetails are not found
        if (!userDetails) {
          return null; // Skip if no user details found
        }

        // Skip the notification if the user is the commentor or liker
        if ((type === 'comment' && commentorId.toString() === userId) || 
            (type === 'like' && likerId.toString() === userId)) {
          return null; // Skip if the commentorId or likerId is the same as userId
        }

        const { name, image } = userDetails;

        const formattedCreatedAt = format(new Date(createdAt), 'dd MMMM yyyy, hh:mm a');

        return {
          type: notificationType,
          recipeId: recipeIdData,
          userId: userDetails._id,
          name,
          image: image,
          createdAt: formattedCreatedAt
        };
      })
    );

    // Filter out any null values (in case of errors fetching user details)
    const filteredNotifications = notificationsData.filter(
      (notification) => notification !== null
    );

    // Return success with notifications
    res.status(200).json(filteredNotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

