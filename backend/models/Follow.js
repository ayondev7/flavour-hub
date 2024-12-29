const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema(
    {
      follower: {
        type: mongoose.Schema.Types.ObjectId, // Stores the ID of the user who is following another user.
        ref: 'User', // References the `User` collection.
        required: true, // Ensures this field is mandatory.
      },
      following: {
        type: mongoose.Schema.Types.ObjectId, // Stores the ID of the user who is being followed.
        ref: 'User', // References the `User` collection.
        required: true, // Ensures this field is mandatory.
      },
    },
    {
      timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields to track when the follow relationship was created/updated.
    }
  );

  module.exports = mongoose.model('Follow', FollowSchema);