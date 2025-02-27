const { createEmployee, getAllEmployee, getEmployee, updateEmployee, deleteEmployee, LoginEmployee, loginEmployee } = require("../controllers/employeeCtrl");
const express=require("express");
const { authenticator } = require("../middleware/authenticator");
const employeeRouter=express.Router();

employeeRouter.post("/create",authenticator,createEmployee)
employeeRouter.get("/getEmployees",getAllEmployee)
employeeRouter.get("/getEmployee",getEmployee)
employeeRouter.put("/updateEmployee/:id",authenticator,updateEmployee)
employeeRouter.delete("/deleteEmployee/:id",authenticator,deleteEmployee)
employeeRouter.post("/login",loginEmployee)


module.exports=employeeRouter;