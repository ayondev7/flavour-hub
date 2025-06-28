const express = require('express');
const multer = require('multer');
const {createRecipe, getAllRecipes, searchRecipes, getMyRecipes, deleteRecipe,
     getRecipe, updateRecipe, getRelatedRecipes, postRating, getAverageRatingPerRecipe, getRecipeByGenre} = require('../controllers/recipeController');
const recipeController = require('../controllers/recipeController');
const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, JPG, PNG, and WEBP formats are allowed"));
    }
    cb(null, true);
  },
});

router.post('/upload', upload.single('image'), createRecipe);

router.put('/updateRecipeImage/:recipeId', upload.single('image'), recipeController.updateImage);

router.get('/getAllRecipes', getAllRecipes);

router.get('/getRecipe/:recipeId', getRecipe);

router.get('/getRelatedRecipes/:cuisineType', getRelatedRecipes);

router.get('/search', searchRecipes);

router.get('/getMyRecipes/:userId', getMyRecipes);

router.put('/updateRecipe/:id', recipeController.updateRecipe);

router.delete('/deleteRecipe/:id', deleteRecipe);

router.post('/postRating', upload.none(), postRating);

router.put('/updateIngredient/:recipeId', recipeController.updateIngredient);

router.delete('/deleteIngredient/:recipeId/:ingredientId', recipeController.deleteIngredient);

router.put('/updateInstruction/:recipeId', recipeController.updateInstruction);

router.delete('/deleteInstruction/:recipeId/:instructionId', recipeController.deleteInstruction);

router.put('/updateNutritionalValues/:recipeId', recipeController.updateNutritionalValues);

router.put('/updatePrepTime/:recipeId', recipeController.updatePrepTime);

router.put('/updateCookTime/:recipeId', recipeController.updateCookTime);

router.get('/getRecipeDetails/:recipeId', recipeController.getRecipeDetails);

module.exports = router;