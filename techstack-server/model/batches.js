const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    trainerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",  // FIX: Change "Trainer" to "Employee"s
        required: true
    },  
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    timings: {
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    },
    batchType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;
