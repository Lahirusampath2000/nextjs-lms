const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const app = express();
require("./config/database");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LMS Backend API Running",
  });
});

//add students

app.post("/add-student", (req, res)=>{
  console.log(req.body);
  res.status(200).json({
    success: true,
    message: "LMS Backend API Running",
  });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});