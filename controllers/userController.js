const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
// @des resgister an User
//@route post /api/user/register
//@acesss public

const registerUser = asyncHandler(async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are madatory!")
    }
    const userAvailable = await User.findOne({
        email
    });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!")
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedPassword", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log('user: ', user);
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User data us not valid")
    }

});

// @des login an User
//@route Post /api/user/login
//@acesss public

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({
        email
    });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT, {
            expiresIn: "15m"
        });
        res.status(200).json({
            accessToken
        })
    } else {
        res.status(401);
        throw new Error("email or password is not valid")
    }
});

// @des current an User
//@route Post /api/user/current
//@acesss public

const currentUser = asyncHandler((req, res) => {
    res.json(req.user);

});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}