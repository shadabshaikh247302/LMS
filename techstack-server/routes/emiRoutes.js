const { createEmi, getAllEmi, getEmi, updateEmi, deleteEmi } = require("../controllers/emiCtrl");
const express=require("express");
const { authenticator } = require("../middleware/authenticator");
const emiRouter=express.Router();

emiRouter.post("/create",authenticator,createEmi)
emiRouter.get("/getEmis",getAllEmi)
emiRouter.get("/getEmi",getEmi)
emiRouter.put("/updateEmi/:id",authenticator,updateEmi)
emiRouter.delete("/deleteEmi/:id",authenticator,deleteEmi)

module.exports=emiRouter;