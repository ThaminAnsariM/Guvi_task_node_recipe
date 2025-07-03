# Recipe API Server

This is a Node.js REST API server for managing recipes, built with Express and MongoDB.

## Features

- Create, read, update, and delete recipes
- MongoDB database integration using Mongoose
- CORS enabled for cross-origin requests
- Environment variable support with dotenv

## Endpoints

| Method | Endpoint           | Description                       |
|--------|--------------------|-----------------------------------|
| POST   | /createRecipe      | Create a new recipe               |
| GET    | /getAllRecipes     | Retrieve all recipes              |
| GET    | /getRecipeByID     | Retrieve a recipe by its `id`     |
| PUT    | /updateRecipe      | Update a recipe by its `id`       |
| DELETE | /deleteRecipe      | Delete a recipe by its `id`       |

sample data 
[
  {
    "id": "ck2",
    "name": "Chicken Biryani",
    "ingredients": ["basmati rice", "chicken", "yogurt", "onions", "biryani spices"],
    "instructions": "Marinate chicken in yogurt and spices. Cook rice separately. Layer chicken and rice. Steam on low flame.",
    "preparationTime": 60
  },
  {
    "id": "ck3",
    "name": "Veggie Stir Fry",
    "ingredients": ["broccoli", "bell peppers", "carrot", "soy sauce", "garlic"],
    "instructions": "Stir fry veggies in a hot pan with garlic. Add soy sauce. Serve hot with rice or noodles.",
    "preparationTime": 20
  },
  {
    "id": "ck4",
    "name": "Mango Smoothie",
    "ingredients": ["mango", "yogurt", "milk", "honey"],
    "instructions": "Blend all ingredients until smooth. Serve chilled.",
    "preparationTime": 5
  },
  {
    "id": "ck5",
    "name": "Garlic Bread",
    "ingredients": ["baguette", "garlic", "butter", "parsley"],
    "instructions": "Mix minced garlic with butter and parsley. Spread on sliced baguette. Bake until golden.",
    "preparationTime": 15
  }
]