"use client";
import { useState } from "react";
import React from "react";
import RoleDropdown from "../Dropdown/RoleDropdown";
import toast from "react-hot-toast";

export default function StudentLoginForm() {
  const [userType, setUserType] = useState("faculty");
  const [formData, setFormData] = useState({});
  const [UserData, setUserData] = useState({Email:"",Password:""})
  const [showPassword, setShowPassword] = useState(false);
  

  function handleSumbit(){
    if(UserData.Email !== "" && UserData.Password !== ""){
      // your code
     
    }else{
      // if(UserData.Email === ""){
      //   toast.error("Email is required.")
      // }
      // if(UserData.Password === ""){
      //   toast.error("Password is required.")
      // }
      // if(UserData.Role === ""){
      //   toast.error("Role is required.")
      // }
      toast.error("All fields are required.")
      
    }
  }

  return (
    <>
      <div className="text-center position-relative w-100">
        <div className="text-white ">
              <div className="icon-container  mb-2">
                <img
                 style={{ width: "70px", height: "auto" }}
                src="/Avatar/student.png" alt="Faculty" />
              </div>
              <h6>Student</h6>
            </div>
      </div>

      <h1 className="text-white text-center fs-5">Login into your account</h1>

      <form className="w-100" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <input
            style={{ padding: "15px 20px", fontSize: "1rem" }}
            id="email"
            onChange={(e)=>{
              setUserData((prev)=>{return {...prev, Email:e.target.value}})
            }}
            type="email"
            className="form-control"
            placeholder="Enter your email"
            required
            autoComplete="off"
          />
        </div>

         
          <div className="mb-3">
          <input
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, Password: e.target.value }));
            }}
            style={{ padding: "15px 20px", fontSize: "1rem" }}
            id="password"
            type={showPassword ? "text" : "password"}  
            className="form-control"
            placeholder="Enter your password"
            required
            autoComplete="off"
          />

          <div className="mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" style={{ color: "white" }} className="mx-2">
              <p className="m-0">Show Password</p>
            </label>
          </div>
        </div>

      
      
        <button style={{fontWeight:'600px'}} onClick={() => { (handleSumbit()) }} type="submit" className="btn btn-primary w-100 py-2">
          Login
        </button>
      </form>

      {/* CSS Styles */}
      <style jsx>{`
        .text-center {
          position: relative;
        }

        .role-selection {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 10px;
          border-radius: 10px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .border-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50%;
          height: 2px;
          background-color: rgb(0, 255, 17);
          transition: transform 0.3s ease-in-out;
        }

        .d-flex {
          display: flex;
          justify-content: space-between;
        }

        .option-container {
          text-align: center;
          cursor: pointer;
          padding: 15px;
          width: 50%;
          transition: color 0.3s ease;
          font-size: 1.1rem;
          font-weight: bold;
        }

        .option-container:hover,
        .option-container.active {
          color: rgb(0, 255, 17);
        }

        .icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 5px;
        }

        .icon-container img {
          width: 70px;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .role-selection {
            max-width: 300px;
          }
          .border-indicator {
            height: 3px;
          }
          .option-container {
            font-size: 1rem;
            padding: 10px;
          }
          .icon-container img {
            width: 60px;
          }
        }

        @media (max-width: 480px) {
          .role-selection {
            max-width: 250px;
          }
          .border-indicator {
            height: 2px;
          }
          .option-container {
            font-size: 0.9rem;
            padding: 8px;
          }
          .icon-container img {
            width: 50px;
          }
        }
       .middle-border {
  border-left: 1px solid rgba(255, 255, 255, 0.2); /* Transparent white */
  height: 50px;
  // margin-top: 25px;
}
      `}</style>
    </>
  );
}