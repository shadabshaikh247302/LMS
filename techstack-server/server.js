const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");

const courseRouter = require("./routes/courseRoutes");
const emiRouter = require("./routes/emiRoutes");
const leadRouter = require("./routes/leadRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const studentRouter = require("./routes/studentRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const roleRouter = require("./routes/roleRoutes");
const adminRouter = require("./routes/adminRoutes");
const batchRouters = require("./routes/batchRoutes");

const app = express();
dotenv.config({ path: "./config/config.env" });

// Connect to the database
connectDb();

// CORS middleware
let whitelist = ["http://localhost:3000", "https://lms-seven-drab.vercel.app"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     }, // Replace with your frontend URL if different
//     methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
//     // credentials: true, // Include credentials like cookies if needed
//   })
// );

// app.all("*", function (req, res, next) {
//   // const origin = whitelist.includes(req.header("origin").toLowerCase())
//   //   ? req.headers.origin
//   //   : "http://localhost:3000";
//   const origin=req.header("origin")
//   if (whitelist.indexOf(origin) !== -1){
//      res.header("Access-Control-Allow-Origin", origin);
//     res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
//   }else{
//     res.status(500).send("Not Allowed")
//   }
 
// });

// app.use(cors({
//   origin:"*"
// })

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

// Middleware to parse JSON requests
app.use(cors())
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome TO APP");
});

// API routes
app.use("/course", courseRouter);
app.use("/emi", emiRouter);
app.use("/lead", leadRouter);
app.use("/payment", paymentRouter);
app.use("/student", studentRouter);
app.use("/employee", employeeRouter);
app.use("/role", roleRouter);
app.use("/auth/admin", adminRouter);
app.use("/batch", batchRouters);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
