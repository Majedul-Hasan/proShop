import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";

// @desc auth  user & get token
// @route post /api/users/login
// @access public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // res.send({ email, password });

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc register new user
// @route post /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // res.send({ email, password });

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User alredy exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("invalied user data");
  }
});

// @desc GET user profile
// @route get /api/users/profile
// @access public

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile };
