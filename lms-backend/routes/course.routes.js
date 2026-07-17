const express = require("express");
const router = express.Router();
const courseService = require("../services/course.service");
const upload = require("../config/multer");
const verifyToken = require("../util/jwt");

router.post(
    "/courses",
    verifyToken,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
    ]),
    courseService.addCourse
);

router.get("/courses/:teacherId", courseService.getCourseByTutor);
router.get("/courses", courseService.getAllCourses);
router.get("/coursesDetails/:id", courseService.getCourseById);

module.exports = router;