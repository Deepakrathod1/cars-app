const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
  //  Check if all fields are filled
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  // Check if user already exists
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    // res.status(401);

    throw new Error("User Already Exist");

    // res.status(401).json({
    //   error: "User Already Exist!",
    // });
  }

  // Hash Password

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Register User

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(401);
    throw new Error("User Not Created");
  }
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

const loginUser = expressAsyncHandler(async (req, res) => {
  //  Check if all fields are filled
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const privateController = expressAsyncHandler(async (req, res) => {
  res.send("I am Protected Route");
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, privateController };
