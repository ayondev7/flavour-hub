const express = require('express');
const multer = require('multer');
const auth = require('../middleware/authMiddleware');
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

router.post('/upload',auth, upload.single('image'), recipeController.createRecipe);

router.put('/updateRecipeImage/:recipeId', upload.single('image'), recipeController.updateImage);

router.get('/getAllRecipes',auth, recipeController.getAllRecipes);

router.get('/getRecipe/:recipeId',auth, recipeController.getRecipe);

router.get('/getRelatedRecipes/:cuisineType', recipeController.getRelatedRecipes);

router.get('/search', recipeController.searchRecipes);

router.get('/getMyRecipes',auth, recipeController.getMyRecipes);

router.put('/updateRecipe/:id',auth,recipeController.updateRecipe);

router.delete('/deleteRecipe/:id',auth, recipeController.deleteRecipe);

router.post('/postRating',auth, upload.none(), recipeController.postRating);

router.put('/updateIngredient/:recipeId', recipeController.updateIngredient);

router.delete('/deleteIngredient/:recipeId/:ingredientId', recipeController.deleteIngredient);

router.put('/updateInstruction/:recipeId', recipeController.updateInstruction);

router.delete('/deleteInstruction/:recipeId/:instructionId', recipeController.deleteInstruction);

router.put('/updateNutritionalValues/:recipeId', recipeController.updateNutritionalValues);

router.put('/updatePrepTime/:recipeId', recipeController.updatePrepTime);

router.put('/updateCookTime/:recipeId', recipeController.updateCookTime);

router.get('/getRecipeDetails/:recipeId',auth, recipeController.getRecipeDetails);

module.exports = router;