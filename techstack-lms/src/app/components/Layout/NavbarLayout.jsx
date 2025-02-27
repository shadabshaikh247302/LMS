"use client"
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { MainAdminContext } from "@/app/context/AdminContext";



export default function NavbarLayout({ toggleSidebar, selectedMenu }) {
    const {state}=useContext(UserContext)
    const{adminState} = useContext(MainAdminContext)

  const [adminToken, setAdminToken] = useState(null);
  const [EmpToken, setEmpToken] = useState(null);
  return (
    <>
      <nav className="navbar navbar-expand fixed-top bg-white py-1 px-3 shadow-sm border-bottom">
        <div className="navbar-collapse collapse">
          <button
            className="toggle-btn sidebar-Toggler ps-0"
            type="button"
            onClick={toggleSidebar}
          >
            <i className="bi bi-grid-fill text-dark"></i>
          </button>

          <ul className="navbar-nav ms-auto ms-sm-0">
            <li className="nav-item dropdown">
              <h6 className="selectedMenu mb-0">
                {selectedMenu || "Dashboard"} {/* Display the selected menu */}
              </h6>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                <img src="/Avatar/profile.png" alt="" className="avatar img-fluid" />
              </a>

              <div className="dropdown-menu dropdown-left">
                
                <button className="dropdown-item" type="button">
                  <i className="bi bi-person"></i> 
                  {
                     state?.token?
                  `${state["First Name"]} (${state?.Role})`
                  : adminState?.token?
                  `${adminState?.["First Name"]} (${adminState?.Role})` 
                  :
                  "User"
                }
                </button>
                
                <button className="dropdown-item" type="button">
                  <i className="bi bi-gear"></i> Settings
                </button>

              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
