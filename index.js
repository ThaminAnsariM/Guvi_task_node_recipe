const express = require("express");
const app = express();
const connectToDatabase = require("./db_config.js");
const Recipe = require("./recipe_Schema.js");
const User = require("./user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const JWT_KEY = "0dd9dc2b21d48e1a";
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

// Middleware to authenticate JWT tokens
function authenticateJWT (req, res, next) {
  console.log("Request Headers:", req.headers);

  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized access, please provide a valid token",
    });
  } else {
    try {
      const payload = jwt.verify(req.headers.authorization, JWT_KEY);

      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized access, invalid token",
      });
    }
  }
};

// Middleware to parse JSON bodies

app.use(express.json());

// Endpoint to create a new recipe

app.post("/createRecipe", authenticateJWT, async (req, res) => {
  try {
    console.log(req.user.id);
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

app.get("/getAllRecipes", authenticateJWT,async (req, res) => {
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

app.get(`/getRecipeByID`, authenticateJWT, async (req, res) => {
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

app.put("/updateRecipe",  authenticateJWT, async (req, res) => {
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

app.delete("/deleteRecipe", authenticateJWT, async (req, res) => {
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

app.post("/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({ username: req.body.username, password: hash });
    if (!user.username || !user.password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    } else {
      await user.save();
      return res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (checkPassword) {
        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: "user" }, JWT_KEY, {
          expiresIn: "1hr",
        });

        return res.status(200).json({
          message: "Login successful",
          data: user,
          token: token,
        });
      } else {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
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
