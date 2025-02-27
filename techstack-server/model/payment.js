const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount : {
        type:Number,
        required:true,
        default: 0,
    },
    payerName:{
        type: String,
        default:"",
    },
    MOP:{
        type: String,
        default:"",
    },
    platform:{
        type: String,
        default:"",
    },
    EmiId:{
        type: mongoose.Types.ObjectId,
        default:"",
    },
},{
    timestamps:true
})


const Payment = mongoose.model("Payment",paymentSchema)
module.exports=Payment;