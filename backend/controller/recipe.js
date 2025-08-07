const Recipes = require("../models/recipe");
const cloudinary = require("../config/cloudinary");

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find().sort({ createdAt: -1 });
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch recipes", error });
  }
};

// Get single recipe
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching recipe", error });
  }
};


const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    const recipe = new Recipe({
      title,
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      instructions,
      time,
      createdBy: req.userId,
      coverImage: req.file ? req.file.path : null, // ✅ store image URL
    });

    await recipe.save();
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    console.error("Error in addRecipe:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Edit existing recipe
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    let coverImage = recipe.coverImage;
    let imagePublicId = recipe.imagePublicId;

    if (req.file?.path && req.file?.filename) {
      // Delete old image from Cloudinary if exists
      if (recipe.imagePublicId) {
        await cloudinary.uploader.destroy(recipe.imagePublicId);
      }

      coverImage = req.file.path;
      imagePublicId = req.file.filename;
    }

    const updated = await Recipes.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions, time, coverImage, imagePublicId },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: "Error updating recipe", error });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Delete image from Cloudinary if available
    if (recipe.imagePublicId) {
      await cloudinary.uploader.destroy(recipe.imagePublicId);
    }

    await Recipes.deleteOne({ _id: req.params.id });
    return res.json({ status: "ok", message: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting recipe", error });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
};
