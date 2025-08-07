// middleware/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "flavourshare_recipes", // change folder name if needed
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => {
      return Date.now() + "-" + file.originalname.split(".")[0];
    },
  },
});

const upload = multer({ storage });

module.exports = upload;
