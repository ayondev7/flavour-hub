const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Ensure the title is mandatory
      trim: true // Automatically trims leading and trailing whitespace
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    }
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Collection', CollectionSchema);
