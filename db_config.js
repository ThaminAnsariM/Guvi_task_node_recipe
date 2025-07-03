const mongoose = require("mongoose");
// Connect to the MongoDB database
async function connectToDatabase() {
  return await mongoose.connect("mongodb://localhost:27017/recipeDB");
}

module.exports = connectToDatabase;