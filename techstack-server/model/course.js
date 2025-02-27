const { default: mongoose } = require("mongoose");

const courseSchema = new mongoose.Schema({
    "Course Name" :{
        type : String,
        required : true,
        unique: true,
        default: "",
    },
    "Abbreviation" :{
        type : String,
        required : true,
        unique:true,
        default: "",
    },
    "Duration" :{
        type : String,
        required : true,
        default: "",
    },
    "Course Fee":{
        type : Number,
        required : true,
        default: "0",
    },
        
});

const Course = mongoose.model("Course",courseSchema)
module.exports=Course;