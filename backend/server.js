// Load environment variables before anything else
require("dotenv").config();

const express = require("express");
const app = express();
const connectDb = require("./config/connectionDb");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// Connect to database
connectDb();

// Middleware
app.use(express.json());

// CORS configuration to allow only your frontend
app.use(cors({
  origin: ["https://flavourshare-ux1a.onrender.com"], // Your frontend URL on Render
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Static files
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

// Start server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
