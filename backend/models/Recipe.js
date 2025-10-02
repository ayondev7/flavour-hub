const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [
        {
            value: {
                type: String,
                required: true // Ensures the instruction value is mandatory
            }
        }
    ],
    instructions: [
        {
            value: {
                type: String,
                required: true // Ensures the instruction value is mandatory
            }
        }
    ],
    servings: { type: String, required: true },
    prepTime: {
        hours: { type: Number },
        minutes: { type: Number }
    },
    cookTime: {
        hours: { type: Number },
        minutes: { type: Number }
    },
    cuisineType: { type: String, required: true },
    mealType: { type: String, required: true },
    nutritionalValues: {
        calories: { type: String },
        protein: { type: String },
        carbs: { type: String },
        fat: { type: String }
    },
    dietaryInformation: { type: String, required: true },
    chefId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true }
}, { 
    timestamps: true 
    }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
