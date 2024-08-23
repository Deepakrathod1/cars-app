const express = require("express");
require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db_config");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;

// DB connect

connectDB();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    msg: "WELCOME TO ECAR AUTO SERVICE",
  });
});

// User Routes
app.use("/api/user", require("./routes/userRoutes"));

// Car Service Routes

app.use("/api/service", require("./routes/carServiceRoutes"));

// Admin Routes

app.use("/api/admin", require("./routes/adminRoutes"));

// errorHandler middleware

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`.bgBlue.black);
});
