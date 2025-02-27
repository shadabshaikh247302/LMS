const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Admin = require("../model/admin");
const bcrypt = require("bcrypt")

exports.createAdmin = async (req, res) => {
  try {
    const { Email, password } = req.body;
    // Check if all required fields are present
    if (!Email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }

    // Check if admin already exists
    const checkAdmin = await Admin.findOne({ Email });

    if (checkAdmin) {
      return res.status(409).json({ error: "Email Already Exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const AdminToBeAdded = new Admin({
      ...req.body,
      password: hashedPassword, // Store hashed password
    });

    const admin = await AdminToBeAdded.save();

    res.status(200).json({ admin, msg: "Admin Created Successfully" });

  } catch (error) {
    console.error("Error in createAdmin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { Email, password } = req.body;

    const admin = await Admin.findOne({ Email: Email });

    if (admin) {
      const verify = await bcrypt.compare(password, admin.password)
      
      if (verify) {
        const token = jwt.sign({ Email,Role:"ADMIN"}, process.env.SECRET, { expiresIn: "10h" });
        // console.log(admin);
        
        res.status(200).send({
          token,
          "admin_id": admin._id,
          "First Name": admin.first_name,
          "last_name" :admin.last_name,
           "Role": admin.Role
        })
      } else {
        return res.status(401).send("Wrong password.")
      }
    } else {
      return res.status(404).send("Admin does not exist.")
    }

  } catch (error) {
    console.log(error);
    res.status(500).send(JSON.stringify(error))
  }
};

exports.getOtp = async (req, res) => {
  try {
    const email = req.query.email; // Extract the email from the request body

    // if (!email) {
    //   return res.status(400).send({ msg: "Email is required" });
    // }

        // ✅ Check if email exists in the database
        const user = await Admin.findOne({ Email: email }); // Use correct field name (`Email` from your schema)
        if (!user) {
          return res.status(404).send({ msg: "Email not found. Please enter a valid email." });
        }
    
    
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    const salt = await bcrypt.genSalt(11);
    const hashedOtp = await bcrypt.hash(OTP, salt);

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${OTP}. It will expire in 5 minutes.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Store OTP expiry time (optional, based on your logic)
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now

    // Optionally, save OTP hash and expiry to database here
    // req.headers.origin
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.status(200).send({ generated: true, hashedOtp, otpExpiry, msg: "OTP sent successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to send OTP. Please try again later." });
  }
};





// exports.loginAdmin = async (req, res) => {
//   try {
//     const { Email, Password, Role } = req.body;
//     const Admin = await Admin.findOne({ Email: Email });

//     if (!Admin) {
//       return res.status(404).send("Employee does not exist.");
//     }

//     // Check if the account is inactive or suspended
//     if (Admin.Status === "inactive" || Admin.Status === "suspended") {
//       return res.status(403).send(`Your account is ${Admin.Status}. Please contact support.`);
//     }

//     const verify = await bcrypt.compare(Password, Admin.Password);
//     if (!verify) {
//       return res.status(401).send("Wrong password.");
//     }

//     if (Admin.Role !== Role) {
//       return res.status(403).send(`You are not authorized as a ${Role}.`);
//     }

//     const token = jwt.sign({ Email, Role }, process.env.SECRET, { expiresIn: "1h" });
//     console.log(token,Admin);
    

//     // res.send({
//     //   token,
//     //   employeeId: employee._id,
//     //   "First Name": employee["First Name"],
//     //   "Last Name": employee["Last Name"],
//     //   Role: employee.Role
//     // });

//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).send("Internal server error.");
//   }
// };


