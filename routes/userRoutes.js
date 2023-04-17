const express = require("express");
const {
    registerUser,
    loginUser,
    currentUser
} = require('../controllers/userController');
const { validate } = require("../model/userModel");
const validateToken = require("../middlewar/validateTokenHandeler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;