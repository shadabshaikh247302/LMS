
// const Trainer = require('../model/Trainer');
const Employee = require('./../model/employee');
const Course = require("../model/course");
// const coursesAssignToTrainer = require('../model/coursesAssign');
const { default: mongoose } = require('mongoose');
const coursesAssignToTrainer = require('../model/coursesAssign');

exports.assignCoursesToTrainer = async (req, res) => {
    try {
        const { trainerid, course_abbriviation } = req.body;

        // console.log("Trainer Email:", trainers_mail_id);
        // console.log("Course Abbreviations:", course_abbriviation);

        if (!trainerid || !Array.isArray(course_abbriviation) || course_abbriviation.length === 0) {
            return res.status(400).send("Trainer email and at least one course abbreviation are required.");
        }

        // const trainer = await Employee.findOne({ Email: trainers_mail_id, Role: "TRNR" });
        // if (!trainer) {
        //     return res.status(404).send("Check your role and email!");
        // }

        const courses = await Course.find({ Abbreviation: { $in: course_abbriviation } });
        if (courses.length === 0) {
            return res.status(404).send("No matching courses found.");
        }
      
        const courseAbbriviation = courses.map(course => course._id); 

        const trainerCourse = await coursesAssignToTrainer.findOneAndUpdate(
            { trainerid:trainerid },
            { $addToSet: { course_abbriviation: { $each: courseAbbriviation } } }, 
            { new: true, upsert: true }
        )

        return res.status(200).send({ trainerCourse, message: "Courses assigned successfully" });

    } catch (error) {
        console.error("Error assigning courses:", error);
        return res.status(500).send("Internal Server Error");
    }
};
