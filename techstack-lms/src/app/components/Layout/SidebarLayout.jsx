"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StudentContext } from "../../context/StudentContext";

export default function SidebarLayout({
  isSidebarOpen,
  toggleSidebar,
  menuItems,
  dashboardName,
  onMenuSelect,
}) {
  const [iconClass, setIconClass] = useState("bi bi-grid-fill");
  const [selectedLink, setSelectedLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedLink = localStorage.getItem("selectedMenu");
    if (savedLink) {
      setSelectedLink(savedLink);
    }

    const updateIconOnResize = () => {
      if (window.innerWidth < 576) {
        setIconClass("bi bi-arrow-left");
      } else {
        setIconClass("bi bi-grid-fill");
      }
    };

    window.addEventListener("resize", updateIconOnResize);
    updateIconOnResize();

    return () => window.removeEventListener("resize", updateIconOnResize);
  }, []);

  const handleMenuClick = (menuLabel, linkHref) => {
    setSelectedLink(linkHref);
    localStorage.setItem("selectedMenu", linkHref);
    onMenuSelect(menuLabel);
  };

  function logoutHandler() {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    let EmployeToken = localStorage.getItem("EmployeToken")
    let MainAdminToken = localStorage.getItem("MainAdminToken")
    let STDToken = localStorage.getItem("studentToken")

    if (confirmLogout) {
      if(EmployeToken){
        localStorage.removeItem("EmployeToken"); 
              // setTimeout(() => {
                toast.success("Logged out successfully!"); 
                window.location.reload()
      }

      if(MainAdminToken){
        localStorage.removeItem("MainAdminToken"); 
        setTimeout(() => {
          // window.location.reload()
          router.push("/administratorLogin")
        }, 500);
        toast.success("Logged out successfully!"); 
      }
 
      
      if(STDToken){
        localStorage.removeItem("studentToken"); 
        setTimeout(() => {
          // window.location.reload()
          router.push("/studentLogin")
        }, 500);
        toast.success("Logged out successfully!");  
      }
    } 
  }
  
  const {} = useContext(StudentContext)

  return (
    <>
      <aside id="sidebar" className={isSidebarOpen ? "" : "small-expand expand"}>
        <div style={{ position: "fixed" }}>
          <div className="sidebar-body">
            <div className="d-flex justify-content-between align-item-center bg-white py-sm-3 py-1 border-transparent">
              <div className="sidebar-logo ms-4">
                <Link href={dashboardName}>
                  <img src="/Logo/TechStack.png" alt="" style={{ height: "44px" }} />
                </Link>
              </div>

              <button
                className="toggle-btn"
                type="button"
                onClick={toggleSidebar}
                title={isSidebarOpen ? "Hide SideBar" : "Expand SideBar"}
              >
                <i id="Sidebar-Btn" className={`${iconClass} text-dark`}></i>
              </button>
            </div>
            <ul className="sidebar-nav">
              {menuItems.map((item, index) => (
                <li key={index} className={`sidebar-item`}>
                  <Link
                    className={`sidebar-link 
                      ${item.subItems ? "collapsed has-dropdown" : ""} 
                      ${selectedLink === item.href ? "active" : ""}`}
                    data-bs-toggle={item.subItems ? "collapse" : null}
                    data-bs-target={item.subItems ? `#${item.id}` : null}
                    aria-expanded="false"
                    aria-controls={item.subItems ? item.id : ""}
                    href={item.href}
                    title={item.title}
                    onClick={() => {
                      if (!item.subItems) {
                        handleMenuClick(item.label, item.href);
                        toggleSidebar();
                      }
                    }}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </Link>
                  {item.subItems && (
                    <ul
                      id={item.id}
                      className="sidebar-dropdown list-unstyled collapse"
                      data-bs-parent="#sidebar"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="sidebar-item">
                          <Link
                            href={subItem.href}
                            className={`sidebar-link ps-3 ms-5 
                              ${selectedLink === subItem.href ? "active" : ""}`}
                            onClick={() => {
                              handleMenuClick(subItem.label, subItem.href);
                              toggleSidebar();
                            }}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Logout Button with Confirmation */}
          <div className="sidebar-footer">
            <a
              style={{ cursor: "pointer",background:" #ff000050" }}
              onClick={logoutHandler}
              className="sidebar-link"
              title="Logout">
              <i className="bi bi-box-arrow-left"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}