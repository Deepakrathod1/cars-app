const express = require("express");
const {
  getUsers,
  getAllComplaints,
  getAllNotes,
} = require("../controlllers/adminControllers");
const adminProtect = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/user", adminProtect, getUsers);
router.get("/complaints", adminProtect, getAllComplaints);
router.get("/notes", adminProtect, getAllNotes);

module.exports = router;
