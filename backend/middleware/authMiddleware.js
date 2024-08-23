const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Error } = require("mongoose");

const protect = expressAsyncHandler(async (req, res, next) => {
  try {
    let token = "";

    //   CHECK IF REQUEST IS COMING WITH TOKEN

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //    SPLIT TOKEN WITH BEARER

      token = req.headers.authorization.split(" ")[1];

      // Decoded token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //  find if user Exist

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("UnAuthorized Access : No Tokne found");
      }
      req.user = user;

      next();
    } else {
      res.status(401);
      throw new Error("Unauthorized Access: No Token Found");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }
});

module.exports = protect;
