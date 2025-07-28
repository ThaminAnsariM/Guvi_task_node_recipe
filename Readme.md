While using TempMail, pls copy the reset link separately and use it directly by clicking the reset link. The temp mail is alerting to the reset link 


# 🍽️ Recipe API Server

This is a **Node.js** REST API server for managing recipes, built with **Express**, **MongoDB**, and **Mongoose**. It supports full **CRUD** operations, **user authentication** using **JWT**, and includes middleware for secure access.

---

## 🔥 New Features

- ✅ Create, read, update, and delete recipes
- 🔐 User registration and login with hashed passwords (bcrypt)
- 🔑 JWT-based token authentication for protected routes
- 🛡️ Middleware to verify JWT token for recipe creation
- 🌍 CORS enabled for cross-origin requests
- 🔧 Environment variables with dotenv

---

## 🧪 Sample Test Data

```json
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

Authentication: endpoint

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| `POST` | `/api/auth/register` | Register a new user     |
| `POST` | `/api/auth/login`    | Login and get JWT token |


Recipe Management


| Method   | Endpoint                      | Description                                     |
| -------- | ----------------------------- | ----------------------------------------------- |
| `POST`   | `/api/recipes/create`         | Create a new recipe                             |
| `GET`    | `/api/recipes/all`            | Get all recipes                                 |
| `GET`    | `/api/recipes?id=<id>`        | Get a specific recipe by `id` (use query param) |
| `PUT`    | `/api/recipes/update?id=<id>` | Update a recipe by `id` (query param)           |
| `DELETE` | `/api/recipes/delete?id=<id>` | Delete a recipe by `id` (query param)           |




POST /register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

POST /login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}


POST /createRecipe
Authorization: <JWT_TOKEN>
Content-Type: application/json

{
  "id": "ck6",
  "name": "Pasta",
  "ingredients": ["pasta", "sauce", "cheese"],
  "instructions": "Boil pasta, add sauce, mix well.",
  "preparationTime": 25
}
