const Recipe = require("../Model/recipe_Schema");

exports.createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json({ message: "Recipe created", data: recipe });
};

exports.getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.json({ data: recipes });
};

exports.getRecipeByID = async (req, res) => {
  const recipe = await Recipe.findOne({ id: req.query.id });
  if (!recipe) return res.status(404).json({ message: "Not found" });
  res.json({ data: recipe });
};

exports.updateRecipe = async (req, res) => {
  const result = await Recipe.updateOne({ id: req.query.id }, { $set: req.body });
  if (result.modifiedCount === 0)
    return res.status(404).json({ message: "Recipe not found" });
  res.json({ message: "Recipe updated" });
};

exports.deleteRecipe = async (req, res) => {
  const result = await Recipe.deleteOne({ id: req.query.id });
  if (result.deletedCount === 0)
    return res.status(404).json({ message: "Recipe not found" });
  res.json({ message: "Recipe deleted" });
};
