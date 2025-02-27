const express = require("express");
const { assignCoursesToTrainer } = require("../controllers/coursesAssignCtrl");
const coursesAssignRoutes  = express.Router();


// ✅ Route to assign a course to a trainer
coursesAssignRoutes.post("/assign-course", assignCoursesToTrainer);

module.exports = coursesAssignRoutes;

// module.exports = 