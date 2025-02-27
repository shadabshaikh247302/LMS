const Employee = require('./../model/employee');
const Batch = require("../model/batches.js");
const Course = require('../model/course');

// const Trainer = require('../models/trainerModel');

exports.createBatch = async (req, res) => {
     try {
         const { trainerid, courseId, timings, batchType } = req.body;
 
         
         // Validate required fields
         if (!timings || !timings.startTime) {
              return res.status(400).send("Start time is required.");
          }
          
          if (!timings.endTime) {
               return res.status(400).send("End time is required.");
          }
          
          if (!batchType) {
               return res.status(400).send("Batch type (Weekdays/Weekend) is required.");
          }
          
          // Find the course by abbreviation
          const course = await Course.findOne({ Abbreviation: courseId });
          
          console.log("courseId:",course);
          if (!course) {
               return res.status(404).send("Course not found with the given Abbreviation.");
          }
          
          // Create and save the new batch
          const newBatch = new Batch({
               trainerid: trainerid,
               courseId: course._id,  // Now `course._id` won't throw an error
               timings,
               batchType
          });
          
          const newBatchSaved = await newBatch.save();
         return res.status(201).json({ newBatchSaved, message: "Batch created successfully" });
 
     } catch (error) {
         console.error("Error creating batch:", error);
         return res.status(500).send("Internal Server Error");
     }
 };
 

 exports.getAllBatches = async (req, res) => {
     try {
        console.log("hello")
         const batches = await Batch.find()
             .populate({
                 path: "trainerid",
                 select: `s"First Name" "Last Name" Email Phone Role`, // Fetch only these fields
             })
             .populate({
                 path: "courseId",
                 select: "Abbreviation Course Name Duration DurationType", // Fetch only these fields
             });
         res.send({ batches });
     } catch (error) {
         console.error("Error fetching batches:", error);
         res.status(500).send({ error: "Internal Server Error" });
     }
 };
 











// exports.gettrainers_mail_ids = async (req, res) => {
//         try {
            
//             const trainers = await Employee.find({ Role: "TRNR" }); 

//             if (trainers.length === 0) {
//                 res.status(404).send("No trainers found.");
//             }
            
//             res.status(200).json({ trainers_mail_ids: trainers.map(trainer => trainer._id) });

//         } catch (error) {
//             console.error("Error fetching Trainer IDs:", error);
//             res.status(500).send("Internal Server Error");
//         }
// };
    

// exports.gettrainers_mail_ids = async (req, res) => {
//         try {
            
//             const course = await Course.find({ "Abbreviation" }); 

//             if (course) {
//                 res.status(404).send("No course found.");
//             }
            
//             res.status(200).json({ courseId: course.map(course => course._id) });

//         } catch (error) {
//             console.error("Error fetching Trainer IDs:", error);
//             res.status(500).send("Internal Server Error");
//         }
// };
    


// exports.createBatch = async (req,res)=>{
//     try {
//         const batch = new Batch(req.body)
//         const batchToBeSaved = await batch.save()
//         res.send({  
//             status:"success",
//             data:{batchToBeSaved},
//             "message":"Your Batch is created!"
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }


// exports.getAllBatches = async (req,res)=>{
//     try {
//         const get_batches = await Batch.find()
//         if(!get_batches){
//             res.status(404).send({"message":"Batch not foun d"})
//         }
//         res.send() 
//     } catch (error) {
//         console.log(error)
//     }
// }


// exports.deleteBatch = async (req,res)=>{
//     try {
//         const delete_batch = await Batch.findByIdAndDelete(req.params.id)
//         if(!delete_batch){
//             res.status(404).send({"message":"Batch not found."})
//         }
//         res.send({
//             "message":"Batch deleted successfully.", 
//             delete_batch
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }


// exports.updateBatch = async (req,res) =>{
//     try {
//         const update_batch = await Batch.findByIdAndUpdate(req.params.id, req.body)
//         res.json({
//             status: 'success',
//             data: update_batch,
//             "message":"Updated successfully!"
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }


