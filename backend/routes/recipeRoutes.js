const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const recipeController = require("../controllers/recipeController");
const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, JPG, PNG, and WEBP formats are allowed"));
    }
    cb(null, true);
  },
});

router.post(
  "/upload",
  authMiddleware.auth,
  upload.single("image"),
  recipeController.createRecipe
);
router.put(
  "/update-recipe-image/:recipeId",
  upload.single("image"),
  recipeController.updateImage
);
router.get(
  "/get-all-recipes",
  authMiddleware.auth,
  recipeController.getAllRecipes
);
router.get(
  "/get-recipe/:recipeId",
  authMiddleware.auth,
  recipeController.getRecipe
);
router.get(
  "/get-related-recipes/:cuisineType",
  authMiddleware.auth,
  recipeController.getRelatedRecipes
);
router.get("/search", recipeController.searchRecipes);
router.get(
  "/get-my-recipes",
  authMiddleware.auth,
  recipeController.getMyRecipes
);
router.put(
  "/update-recipe/:id",
  authMiddleware.auth,
  recipeController.updateRecipe
);
router.delete(
  "/delete-recipe/:id",
  authMiddleware.auth,
  recipeController.deleteRecipe
);
router.post(  
  "/post-rating",
  authMiddleware.auth,
  upload.none(),
  recipeController.postRating
);
router.put("/update-ingredient/:recipeId",authMiddleware.auth, recipeController.updateIngredient);
router.delete(
  "/delete-ingredient/:recipeId/:ingredientId",
  recipeController.deleteIngredient
);
router.put("/update-instruction/:recipeId",authMiddleware.auth, recipeController.updateInstruction);
router.delete(
  "/delete-instruction/:recipeId/:instructionId",authMiddleware.auth,
  recipeController.deleteInstruction
);
router.put(
  "/update-nutritional-values/:recipeId",
  authMiddleware.auth,
  recipeController.updateNutritionalValues
);
router.put("/update-prep-time/:recipeId", authMiddleware.auth, recipeController.updatePrepTime);
router.put("/update-cook-time/:recipeId", authMiddleware.auth, recipeController.updateCookTime);
router.get(
  "/get-recipe-details/:recipeId",
  authMiddleware.auth,
  recipeController.getRecipeDetails
);

module.exports = router;
