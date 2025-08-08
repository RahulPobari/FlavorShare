// Load environment variables before anything else
require("dotenv").config();

const express = require("express");
const app = express();
const connectDb = require("./config/connectionDb");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

// Connect to database
connectDb();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
