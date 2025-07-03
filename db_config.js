const mongoose = require("mongoose");
// Connect to the MongoDB database
async function connectToDatabase() {
  return await mongoose.connect(process.env.DB);
}

module.exports = connectToDatabase;