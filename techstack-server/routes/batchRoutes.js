const express=require("express");
const { createBatch, getAllBatches } = require("../controllers/batchCtrl");

const batchRouters = express.Router();

batchRouters.post("/createBatch",createBatch)
batchRouters.get("/getAllBatches",getAllBatches)
module.exports=batchRouters;