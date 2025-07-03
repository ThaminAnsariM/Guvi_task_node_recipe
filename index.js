const express = require("express");
const app = express();
const connectToDatabase = require("./db_config.js");
const Recipe = require("./recipe_Schema.js");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const cors = require("cors");
const dotenv = require("dotenv").config(); // Load environment variables from .env file

// Connect to the database
(async () => {
  try {
    await connectToDatabase();
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();


app.use(
  cors({
    origin: "*",
  })
);

// Middleware to parse JSON bodies

app.use(express.json());

// Endpoint to create a new recipe

app.post("/createRecipe", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);

    await recipe.save();

    res.status(201).json({
      message: "Recipe created successfully",
      data: Recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Endpoint to get all recipes
// This endpoint retrieves all recipes from the database

app.get("/getAllRecipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (recipes.length === 0) {
      return res.status(404).json({
        message: "No recipes found",
      });
    } else {
      res.status(200).json({
        data: recipes,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Endpoint to get a recipe by ID

app.get(`/getRecipeByID`, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ id: req.query.id });
    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    } else {
      res.status(200).json({
        data: recipe,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Endpoint to update a recipe by ID

app.put("/updateRecipe", async (req, res) => {
  try {
    const recipe = await Recipe.updateOne(
      { id: req.query.id },
      { $set: req.body }
    );
    if (recipe.modifiedCount === 0) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    } else {
      res.status(200).json({
        message: "Recipe updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// Endpoint to delete a recipe by ID

app.delete("/deleteRecipe", async (req, res) => {
  try {
    const recipe = await Recipe.deleteOne({ id: req.query.id });

    if (recipe.deletedCount === 0) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    } else {
      res.status(200).json({
        message: "Recipe deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
