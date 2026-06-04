const express = require("express");
const router = express.Router();
const studentService = require("../services/student.service");

router.post("/students", studentService.addStudent);
router.get("/students", studentService.getStudent);

module.exports = router;