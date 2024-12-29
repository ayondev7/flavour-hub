const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user who rated the recipe
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true }, // The recipe being rated
    chefId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The chef (owner of the recipe)
    rating: { type: Number, required: true } // The rating value
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Rating', RatingSchema);
