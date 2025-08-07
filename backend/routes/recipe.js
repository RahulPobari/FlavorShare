const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload
} = require("../controller/recipe");
const verifyToken = require("../middleware/auth");

// ✅ Get all recipes
router.get("/", getRecipes);

// ✅ Get a specific recipe by ID
router.get("/:id", getRecipe);

// ✅ Add a new recipe (protected)
router.post(
  "/",
  verifyToken,
  upload.single("coverImage"), // form field name should be 'coverImage'
  addRecipe
);

// ✅ Edit an existing recipe (protected)
router.put(
  "/:id",
  verifyToken,
  upload.single("coverImage"),
  editRecipe
);

// ✅ Delete a recipe (protected)
router.delete("/:id", verifyToken, deleteRecipe);

module.exports = router;
