const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema(
  {
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection', // Reference to the Collection model
      required: true
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe', // Reference to the Recipe model
      required: true
    }
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
