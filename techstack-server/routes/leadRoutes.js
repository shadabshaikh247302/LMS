
const { createLead, getAllLead, getLead, updateLead, deleteLead } = require("../controllers/leadCtrl");
const express=require("express");
const { authenticator } = require("../middleware/authenticator");
const leadRouter=express.Router();

leadRouter.post("/create",authenticator,createLead)
leadRouter.get("/getLeads",getAllLead)
leadRouter.get("/getLead",getLead)
leadRouter.put("/updateLead/:id",authenticator,updateLead)
leadRouter.delete("/deleteLead/:id",authenticator,deleteLead)

module.exports=leadRouter;