const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/student.routes");

// DB connection
require("./config/database");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", studentRoutes);

// test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "LMS Backend API Running",
  });
});

module.exports = app;