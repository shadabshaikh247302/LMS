"use client";
import dynamic from "next/dynamic";
import SidebarLayout from "@/app/components/Layout/SidebarLayout";
// import dynamic from "next/dynamic";
import React, { useState } from "react";

const NavbarLayout = dynamic(() => import("@/app/components/Layout/NavbarLayout"), {
  ssr: false, // Disable SSR for Navbar component
});

export default function Layout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(""); // State for the selected menu

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // ------------------------ SideBar Menu ---------------------------
  const menuItems = [
    {
      id: "workReport",
      label: "Work Report",
      icon: "bi bi-clipboard-data",
      href: "###",
      title: "View work reports",
      subItems: [
        { label: "Announcements", href: "/adminDashboard/Announcement" },
        { label: "Work Report", href: "/adminDashboard/workReport" },
      ],
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: "bi bi-list-task",
      href: "/adminDashboard/schedule",
      title: "View schedule",
    },
    {
      id: "recordedVideos",
      label: "Recorded Videos",
      icon: "bi bi-record-btn",
      href: "/adminDashboard/recordedVideos",
      title: "View recorded videos",
    },
    {
      id: "studentAdmission",
      label: "Student Admission",
      icon: "bi bi-person-add",
      href: "/adminDashboard/newAdmission",
      title: "studentAdmission",
    },
    {
      id: "Leads ",
      label: "Leads ",
      icon: "bi bi-graph-up-arrow",
      href: "/adminDashboard/Leads",
      title: "Leads",
    },
    {
      id: "addFacultyMember",
      label: "Faculty Member",
      icon: "bi bi-people-fill",
      href: "/adminDashboard/addFacultyMember",
      title: "Faculty Member",
    },
    {
      id: "Course",
      label: "Course",
      icon: "bi bi-journal-bookmark-fill",
      href: "/adminDashboard/Course",
      title: "Course",
    },
    {
      id: "Sessions",
      label: "Session",
      icon: "bi bi-bounding-box",
      href: "/adminDashboard/Session",
      title: "Sessions",
    },
    {
      id: "Batches",
      label: "Batches",
      icon: "bi bi-view-stacked",
      href: "/adminDashboard/batches",
      title: "Batches",
    },
  ];



  // Handle the selection of a menu item
  const handleMenuSelect = (menuLabel) => {
    sessionStorage.setItem("MenuLabel", menuLabel);
    setSelectedMenu(menuLabel); // Set the selected menu when an item is clicked
  };

  return (
    <>
      <SidebarLayout
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
        dashboardName="/adminDashboard"
        onMenuSelect={handleMenuSelect} // Pass the callback to Sidebar
      />

      <div className={`main ${isSidebarOpen ? "" : "expand"}`}>
        <NavbarLayout
          toggleSidebar={toggleSidebar}
          selectedMenu={selectedMenu} 
          />

        <div className="pt-5 mt-5 px-4 container-fluid">{children}</div>
      </div>
    </>
  );
}
