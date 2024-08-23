const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Car = require("../models/carServiceModel");
const Note = require("../models/noteModel");

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  if (!users) {
    res.status(404);
    throw new Error("Users Not Found");
  }

  res.status(200).json(users);
});

const getAllComplaints = expressAsyncHandler(async (req, res) => {
  const cars = await Car.find();

  if (!cars) {
    res.status(404);
    throw new Error("Cars Not Found");
  }

  res.status(200).json(cars);
});

const getAllNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find();

  if (!notes) {
    res.status(404);
    throw new Error("Notes Not Found");
  }

  res.status(200).json(notes);
});

module.exports = { getUsers, getAllComplaints, getAllNotes };
