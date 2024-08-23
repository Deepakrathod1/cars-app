const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getComplaints,
  raiseComplaint,
  getComplaint,
  closeComplaint,
} = require("../controlllers/carServiceController");

const router = express.Router();

router.get("/", protect, getComplaints);
router.post("/", protect, raiseComplaint);
router.get("/:id", protect, getComplaint);
router.put("/:id", protect, closeComplaint);

// Note Routes

router.use("/:id/note", require("./noteRoutes"));

module.exports = router;
