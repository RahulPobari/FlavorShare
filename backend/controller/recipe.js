const Recipes = require("../models/recipe");
const upload = require("../middleware/multer"); // uses Cloudinary
const cloudinary = require("../config/cloudinary");

// Get all recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipes.find();
  return res.json(recipes);
};

// Get single recipe
const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  res.json(recipe);
};

// Add new recipe with Cloudinary image upload
const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required fields can't be empty" });
  }

  const newRecipe = await Recipes.create({
    title,
    ingredients,
    instructions,
    time,
    coverImage: req.file?.path, // Cloudinary URL
    createdBy: req.user.id,
  });

  return res.json(newRecipe);
};

// Edit existing recipe
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  try {
    let recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    let coverImage = recipe.coverImage;

    if (req.file?.path) {
      // Optional: Delete old image from Cloudinary if needed
      // const publicId = coverImage.split('/').pop().split('.')[0];
      // await cloudinary.uploader.destroy(`recipe_images/${publicId}`);
      coverImage = req.file.path;
    }

    const updated = await Recipes.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions, time, coverImage },
      { new: true }
    );

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Error updating recipe", error: err });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Optional: Delete image from Cloudinary if needed
    // const publicId = recipe.coverImage.split('/').pop().split('.')[0];
    // await cloudinary.uploader.destroy(`recipe_images/${publicId}`);

    await Recipes.deleteOne({ _id: req.params.id });
    res.json({ status: "ok" });
  } catch (err) {
    return res.status(400).json({ message: "Error deleting recipe", error: err });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload
};
