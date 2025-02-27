const { default: mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema({
    "Lead by": {
        type: String,
        // required: true,
        default: "",
    },
    "Demo by": {
        type: String,
        // required: true,
        default: "",
    },
    //--------------------------------------------
    "Name": {
        type: String,
        required: true,
        default: "",
    },
    Phone: {
        type: String,
        required: true,
        default: "",
    },
    "Email id": {
        type: String,
        required: true,
        unique: true,
        default: "",
    },
    Course: {
        type: Array,
        required: true,
        default: [],
    },
    Fee: {
        type: Number,
        default: 0,
    },
    Remark: {
        type: String,
        required: true,
        default: "",
    },
    "DOJ": {
        type: String, 
        default: new Date(),
    },
    EmiId:{
        type: String,
        default: "",
    },
    Password: {
        type: String,
        default: "",
    },
    isFullyPaid: {
        type: Boolean,
        default: false,
    },
    isCourseCompleted: {
        type: Boolean,
        default: false,
    },
    "Student Status": {
        type: String,
        default: "running",
    },
    leadId: {
        type: String,
        default: "",
    },
    Role:{
        type:String,
        default:"STD"
    },
    
batchIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch", // Assuming your batch model is named "Batch"
        default: []
    }]

},{
    timestamps:true // date of Admission
});
const Student = mongoose.model("Student", studentSchema)
module.exports = Student;