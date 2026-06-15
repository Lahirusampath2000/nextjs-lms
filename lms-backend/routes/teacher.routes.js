const express = require("express");
const router = express.Router();
const teacherService = require("../services/teacher.service");

router.get("/teachers", teacherService.getTeacher);

module.exports = router;