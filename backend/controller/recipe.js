const Recipes = require("../models/recipe");
const cloudinary = require("../config/cloudinary");

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    console.log("Fetching all recipes...");
    const recipes = await Recipes.find().sort({ createdAt: -1 });
    console.log(`Fetched ${recipes.length} recipes.`);
    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    return res.status(500).json({ message: "Failed to fetch recipes", error });
  }
};

// Get single recipe
const getRecipe = async (req, res) => {
  try {
    console.log(`Fetching recipe with id: ${req.params.id}`);
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      console.log("Recipe not found");
      return res.status(404).json({ message: "Recipe not found" });
    }
    console.log("Recipe found:", recipe.title);
    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching single recipe:", error);
    return res.status(500).json({ message: "Error fetching recipe", error });
  }
};

// Add new recipe
const addRecipe = async (req, res) => {
  try {
    console.log("addRecipe called");
    console.log("Request body:", req.body);
    console.log("Uploaded file info:", req.file);

    const { title, ingredients, instructions, time } = req.body;

    // Normalize ingredients to array
    const formattedIngredients = Array.isArray(ingredients)
      ? ingredients.filter(i => i && i.trim() !== "")
      : typeof ingredients === "string"
      ? [ingredients.trim()]
      : [];

    // Extract Cloudinary URL and public_id from multer-storage-cloudinary
    const coverImage = req.file?.path || null;
    const imagePublicId = req.file?.filename || null;

    console.log("Formatted Ingredients:", formattedIngredients);
    console.log("Image URL (coverImage):", coverImage);
    console.log("Image public id:", imagePublicId);

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
    console.log("Recipe saved successfully:", recipe._id);

    return res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    console.error("Error in addRecipe:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Edit existing recipe
const editRecipe = async (req, res) => {
  try {
    console.log(`editRecipe called for id: ${req.params.id}`);
    console.log("Request body:", req.body);
    console.log("Uploaded file info:", req.file);

    const { title, ingredients, instructions, time } = req.body;

    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      console.log("Recipe not found for update");
      return res.status(404).json({ message: "Recipe not found" });
    }

    let coverImage = recipe.coverImage;
    let imagePublicId = recipe.imagePublicId;

    if (req.file?.path && req.file?.filename) {
      console.log("New image uploaded, deleting old image if exists...");
      if (imagePublicId) {
        try {
          await cloudinary.uploader.destroy(imagePublicId);
          console.log("Old image deleted:", imagePublicId);
        } catch (delError) {
          console.error("Error deleting old image from Cloudinary:", delError);
        }
      }
      coverImage = req.file.path;
      imagePublicId = req.file.filename;
      console.log("Updated image URL (coverImage):", coverImage);
      console.log("Updated image public id:", imagePublicId);
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

    console.log("Recipe updated:", updated._id);

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Error in editRecipe:", error);
    return res.status(500).json({ message: "Error updating recipe", error });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    console.log(`deleteRecipe called for id: ${req.params.id}`);

    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      console.log("Recipe not found for deletion");
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(recipe.imagePublicId);
        console.log("Deleted image from Cloudinary:", recipe.imagePublicId);
      } catch (delError) {
        console.error("Error deleting image from Cloudinary:", delError);
      }
    }

    await recipe.deleteOne();
    console.log("Recipe deleted:", req.params.id);

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
