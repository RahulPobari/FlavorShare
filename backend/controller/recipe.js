const Recipes = require("../models/recipe");
const cloudinary = require("../config/cloudinary");

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find().sort({ createdAt: -1 });
    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching all recipes:", error);
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
    console.error("Error fetching single recipe:", error);
    return res.status(500).json({ message: "Error fetching recipe", error });
  }
};

// Add new recipe
const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    // Debug: log uploaded file info
    console.log("addRecipe - uploaded file info:", req.file);

    // Normalize ingredients to array
    const formattedIngredients = Array.isArray(ingredients)
      ? ingredients.filter(i => i && i.trim() !== "")
      : typeof ingredients === "string"
      ? [ingredients.trim()]
      : [];

    // Extract Cloudinary URL and public_id from multer-storage-cloudinary
    const coverImage = req.file?.path || null;
    const imagePublicId = req.file?.filename || null;

    const recipe = new Recipes({
      title: title?.trim(),
      ingredients: formattedIngredients,
      instructions: instructions?.trim(),
      time: time?.trim(),
      createdBy: req.userId,
      coverImage,
      imagePublicId,
    });

    await recipe.save();

    return res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    console.error("Error in addRecipe:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Edit existing recipe
const editRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    // Debug: log uploaded file info if any
    console.log("editRecipe - uploaded file info:", req.file);

    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    let coverImage = recipe.coverImage;
    let imagePublicId = recipe.imagePublicId;

    // Replace image if a new one is uploaded
    if (req.file?.path && req.file?.filename) {
      // Delete old image from Cloudinary if exists
      if (imagePublicId) {
        try {
          await cloudinary.uploader.destroy(imagePublicId);
        } catch (delError) {
          console.error("Error deleting old image from Cloudinary:", delError);
          // Continue anyway, do not block update
        }
      }
      coverImage = req.file.path;
      imagePublicId = req.file.filename;
    }

    // Normalize ingredients to array
    const formattedIngredients = Array.isArray(ingredients)
      ? ingredients.filter(i => i && i.trim() !== "")
      : typeof ingredients === "string"
      ? [ingredients.trim()]
      : [];

    const updated = await Recipes.findByIdAndUpdate(
      req.params.id,
      {
        title: title?.trim(),
        ingredients: formattedIngredients,
        instructions: instructions?.trim(),
        time: time?.trim(),
        coverImage,
        imagePublicId,
      },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error in editRecipe:", error);
    return res.status(500).json({ message: "Error updating recipe", error });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Delete image from Cloudinary if exists
    if (recipe.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(recipe.imagePublicId);
      } catch (delError) {
        console.error("Error deleting image from Cloudinary:", delError);
        // Continue anyway
      }
    }

    await recipe.deleteOne();
    return res.json({ status: "ok", message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
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
