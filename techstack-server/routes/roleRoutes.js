const { createRole, getAllRole, getRole, updateRole, deleteRole } = require("../controllers/roleCtrl");
const express=require("express");
const { authenticator } = require("../middleware/authenticator");
const roleRouter=express.Router();

roleRouter.post("/create",authenticator,createRole)
roleRouter.get("/getRoles",getAllRole)
roleRouter.get("/getRole",getRole)
roleRouter.put("/updateRole/:id",authenticator,updateRole)
roleRouter.delete("/deleteRole/:id",authenticator,deleteRole)

module.exports=roleRouter;