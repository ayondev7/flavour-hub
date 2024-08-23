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
    const chefId = recipe.chefId; // Assuming the Recipe model has a field userId for the chef

    // Create and save the new comment
    const newComment = new Comment({
      userId,
      recipeId,
      content,
      parentCommentId: parentCommentId || null, // Default to null if not provided
    });
    await newComment.save();

    // Create and save the notification
    const newNotification = new Notification({
      commentorId: userId,
      recipeId,
      chefId,
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
    const comments = await Comment.find({ recipeId: req.params.recipeId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateComment = async (req, res) => {
  const { commentId, content } = req.body;

  console.log(req.body);

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    console.log("Updated comment:", comment);

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
    // Find notifications where chefId matches the userId
    const notifications = await Notification.find({ chefId: userId });

    // If no notifications found, return an error
    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for this user." });
    }

    // Prepare response data
    const notificationsData = await Promise.all(
      notifications.map(async (notification) => {
        const { recipeId, commentorId, createdAt } = notification;

        // Fetch the commentor details from User model
        const commentor = await User.findById(commentorId);
        if (!commentor) {
          return null;
        }

        const { name, image } = commentor;

        // Convert binary image to base64 if the image exists
        let imageBase64 = "";
        if (image) {
          try {
            imageBase64 = image.toString("base64");
          } catch (error) {
            console.error("Error converting image to base64:", error);
          }
        }

        // Format createdAt to "hh:mm A, dd MMMM yyyy" format
        const formattedCreatedAt = format(
          new Date(createdAt),
          "hh:mm a, dd MMMM yyyy"
        );

        return {
          recipeId,
          commentorId,
          name,
          image: imageBase64,
          createdAt: formattedCreatedAt,
        };
      })
    );

    // Filter out any null values (in case of errors fetching commentor details)
    const filteredNotifications = notificationsData.filter(
      (notification) => notification !== null
    );

    res.status(200).json(filteredNotifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
