const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String], // ✅ explicitly store as array of strings
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
    coverImage: {
      type: String, // ✅ Cloudinary URL
    },
    imagePublicId: {
      type: String, // ✅ Cloudinary public_id for deletion
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipes", recipeSchema);
