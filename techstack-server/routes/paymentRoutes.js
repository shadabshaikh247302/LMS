
const { createPayment, getAllPayment, getPayment, updatePayment, deletePayment, getPaymentByEmiId } = require("../controllers/paymentCtrl");
const express=require("express");
const { authenticator } = require("../middleware/authenticator");
const paymentRouter=express.Router();

paymentRouter.post("/create",authenticator,createPayment)
paymentRouter.get("/getPayments",getAllPayment)
paymentRouter.get("/getPayment",getPayment)
paymentRouter.get("/getPaymentById/:id",authenticator,getPaymentByEmiId)
paymentRouter.put("/updatePayment/:id",authenticator,updatePayment)
paymentRouter.delete("/deletePayment/:id",authenticator,deletePayment)

module.exports=paymentRouter;