const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    rating: { type: Number, required: true }
}, { 
    timestamps: true 
    }
);

module.exports = mongoose.model('Rating', RatingSchema);
