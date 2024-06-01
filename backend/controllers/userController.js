import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc Register a new user
// route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Define regex for alphabetic characters and numbers only, max 10 characters
    const nameRegex = /^[A-Za-z0-9]{1,10}$/;
    if (!nameRegex.test(name)) {
        res.status(400);
        throw new Error('Name can only contain alphabetic characters and numbers, and must be 1-10 characters long');
    }

    // Define regex for password: 6-15 characters, at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    if (!passwordRegex.test(password)) {
        res.status(400);
        throw new Error('Password must be 6-15 characters long and contain at least one letter, one number, and one special character');
    }

    // Define regex for email validation
    const emailRegex = /^[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)?@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Logging out 
// route POST /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'User logged out' });
});

// @desc Get user profile
// route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };
    res.status(200).json(user);
});

// @desc Update user profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Define regex for alphabetic characters and numbers only, max 10 characters
    const nameRegex = /^[A-Za-z0-9]{1,10}$/;
    if (name && !nameRegex.test(name)) {
        res.status(400);
        throw new Error('Name can only contain alphabetic characters and numbers, and must be 1-10 characters long');
    }

    // Define regex for password: 6-15 characters, at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    if (password && !passwordRegex.test(password)) {
        res.status(400);
        throw new Error('Password must be 6-15 characters long and contain at least one letter, one number, and one special character');
    }

    // Define regex for email validation
    const emailRegex = /^[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)?@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        res.status(400);
        throw new Error('Invalid email format');
    }

    const user = await User.findById(req.user._id);
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };
