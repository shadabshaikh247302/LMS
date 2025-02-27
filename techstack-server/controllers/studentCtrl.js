const Student = require('./../model/student');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');

// exports.createStudent = async (req, res) => {
//     console.log(req.body);
    
//     try {
//         const testStudent = await Student.create(req.body);
//         console.log(testStudent);
        
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 testStudent
//             }
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: 'fail',
//             message: error.message
//         })
//     }
// }

exports.createStudent = async(req,res)=>{
    // console.log(req.body);
    
    try {
        const email = req.body["Email id"]
        // console.log(email);
        
        const checkStudent = await Student.findOne({
            "Email id" : email
        })        
        if(checkStudent){
            res.status(409).send("student Already Exists");
        }
        const {Password} = req.body;
        console.log(Password);
        
        const salt = await bcrypt.genSalt(11);
        console.log(salt);
        
        const hashedPassword = await bcrypt.hash(Password, salt);
        console.log(hashedPassword);
        
        const studentToBeAdded = new Student({
            ...req.body,
            Password: hashedPassword,
        })
        console.log(studentToBeAdded);
        
        const student = await studentToBeAdded.save();
        console.log(student);
        
        res.status(200).send({student})
    } catch (error) {
        res.status(400).send(error)
    }
}

//--------------------------------------------------------------------------------
exports.getAllStudent = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            status: 'success',
            length: students.length,
            data: {
                students
            }
        })
    } catch (error) {
        console.log(error);
    }
}
//--------------------------------------------------------------------------------
exports.getStudent = async (req, res) => {

}
//--------------------------------------------------------------------------------
exports.updateStudent = async (req, res) => {
    try {
        const testStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: testStudent // Return updated data directly
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    } 
}
//--------------------------------------------------------------------------------
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params; 
        const deleteStudent = await Student.findByIdAndDelete(id);
        if (!deleteStudent) {
          // If no students is found, respond with an error
          return res.status(404).json({ message: "students not found" });
        }
        // If the students is deleted, send a success response
        res.status(200).json({ message: "students deleted successfully", deleteStudent });
      } catch (error) {
        console.error("Error deleting students:", error);
        res.status(500).json({ message: "Failed to delete the students. Please try again." });
      }
}



exports.LoginStudent = async(req,res)=>{
    try {
        
      const students = await Student.findOne({Email:req.body['Email id']});
      if(students){
        const verify = await bcrypt.compare(req.body['Password'],students.Password);
        if(verify){
            const token = jwt.sign({Email,Password},process.env.SECRET,{expiresIn:"1hr"})
            res.status(200).send({token,"Name":students["Name"]})
        }else{
          res.status(401).send("Wrong password")
        }
      }else{
        res.status(404).send("Student does not exists")
      }
    } catch (error) {
      console.log(error);
      
    }
}


// exports.getStudentById = async (req, res) => {
//     try {
//        const data = await 
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

// const Student = require("../models/Student");



// const Student = require("../models/Student");

// Add a batch ID to a student's batchIds array
exports.addBatchToStudent = async (req, res) => {
    try {
        const { studentId, batchId } = req.body; // Get student ID and batch ID from request body
        console.log(req.body)
        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Check if the batch ID already exists in batchIds
        if (student.batchIds.includes(batchId)) {
            return res.status(400).json({ message: "Batch ID already added" });
        }

        // Add the batch ID to the batchIds array
        student.batchIds.push(batchId);
        await student.save();

        res.status(200).json({ message: "Batch ID added successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// module.exports = { addBatchToStudent };

// const mongoose = require("mongoose");
// const Student = require("../models/Student");

exports.getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if batchId is a valid ObjectId
        let objectIdBatchId;
        if (mongoose.Types.ObjectId.isValid(id)) {
            objectIdBatchId = new mongoose.Types.ObjectId(id);
        }

        // Find students where batchId exists in batchIds array (as ObjectId or String)
        const students = await Student.find({
            $or: [
                { batchIds: objectIdBatchId }, // If stored as ObjectId
                { batchIds: id } // If stored as String
            ]
        });
        console.log(students);
        

        if (students.length === 0) {
            return res.status(404).json({ message: "No students found for this batch ID" });
        }

        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// module.exports = { getStudentsByBatchId };
