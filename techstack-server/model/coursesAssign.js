const { default: mongoose } = require("mongoose");


const coursesAssignToTrainers = new mongoose.Schema({
    "trainerid":{
        type:mongoose.Types.ObjectId
    },
    "course_abbriviation": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course" // Reference to Course collection
    }]

},{
    timestamps:true
});


const coursesAssignToTrainer = mongoose.model("coursesAssignTrainers", coursesAssignToTrainers);
module.exports = coursesAssignToTrainer;
