const express = require("express");
const dotenv = require("dotenv").config();
const connectToDatabase = require("./db_config");
const cors = require("cors");

const authRoutes = require("./Routes/Auth_Route");
const recipeRoutes = require("./Routes/Recipe_Route");

const app = express();

// Connect to DB
(async () => {
  try {
    await connectToDatabase();
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
})();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to Recipe API"));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);
