const express = require("express");
const { register, login, forgotPassword, Resetpassword } = require("../Controllers/Auth_Controllers");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",Resetpassword)

module.exports = router;
