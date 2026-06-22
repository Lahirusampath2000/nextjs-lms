const express = require("express");
const router = express.Router();
const courseService = require("../services/course.service");
const upload = require("../config/multer");

router.post(
    "/courses",
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
    ]),
    courseService.addCourse
);

router.get("/courses/:teacher_id", courseService.getCourseByTutor);

module.exports = router;