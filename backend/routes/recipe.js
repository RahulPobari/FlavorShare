const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require("../controller/recipe");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/multer");

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", verifyToken, upload.single("coverImage"), addRecipe);
router.put("/:id", verifyToken, upload.single("coverImage"), editRecipe);
router.delete("/:id", verifyToken, deleteRecipe);

module.exports = router;
