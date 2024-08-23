const { mongoose } = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    car: {
      type: String,
      enum: ["punch", "nexon", "curvv", "harrier", "safari"],
      required: true,
    },
    registration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "pending"],
      required: true,
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
