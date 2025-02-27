const { createStudent, getAllStudent, getStudent, updateStudent, deleteStudent, LoginStudent, getStudentById, addBatchToStudent, } = require("../controllers/studentCtrl");
const express=require("express");
const { authenticator } = require("../middleware/authenticator");
const studentRouter=express.Router();

studentRouter.post("/create",authenticator,createStudent)
studentRouter.get("/getStudents",getAllStudent)
studentRouter.get("/getStudent",getStudent)
studentRouter.put("/updateStudent/:id",authenticator,updateStudent)
studentRouter.delete("/deleteStudent/:id",authenticator,deleteStudent)
studentRouter.post("/LoginStudent",LoginStudent)
studentRouter.get("/getStudentById/:id",getStudentById)
studentRouter.post("/addBatchToStudent", addBatchToStudent);

module.exports=studentRouter;