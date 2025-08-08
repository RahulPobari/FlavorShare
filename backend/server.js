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
app.use(express.urlencoded({ extended: true })); // Recommended for form parsing

// CORS configuration to allow only your frontend
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://flavourshare-ux1a.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Static files
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

// Optional: Basic error handler middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
