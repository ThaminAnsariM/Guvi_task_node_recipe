const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  getRecipeByID,
  updateRecipe,
  deleteRecipe
} = require("../Controllers/RecipeConrtollers");

const authenticateJWT = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.post("/create", authenticateJWT, createRecipe);
router.get("/all", authenticateJWT, getAllRecipes);
router.get("/", authenticateJWT, getRecipeByID);
router.put("/update", authenticateJWT, updateRecipe);
router.delete("/delete", authenticateJWT, deleteRecipe);

module.exports = router;
