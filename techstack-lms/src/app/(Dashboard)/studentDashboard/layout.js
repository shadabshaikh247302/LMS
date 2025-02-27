"use client"
import FooterLayout from "@/app/components/Layout/FooterLayout";
import SidebarLayout from "@/app/components/Layout/SidebarLayout";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const NavbarLayout=dynamic(()=>import("../../components/Layout/NavbarLayout"),{ssr:false});

export default function layout({ children }) {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(''); // State for the selected menu

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
//      ------------------------ SideBar Menu ---------------------------
const menuItems = [
  {
    id: 'Announcements',
    label: 'Announcements',
    icon: 'bi bi-bell',
    href: '/studentDashboard/Announcement',
    title: 'Announcements',
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: 'bi bi-list-task',
    href: '/studentDashboard/schedule',
    title: 'View schedule', 
  },
  {
    id: 'courseArea',
    label: 'Course Area',
    icon: 'bi bi-journals',
    href: '####',
    title: 'View Course', 
    subItems: [
      { label: 'Study Material', href: '/studentDashboard/studyMaterial' } 
    ]
  },
  {
    id: 'recordedVideos',
    label: 'Recorded Videos',
    icon: 'bi bi-record-btn',
    href: '/studentDashboard/recordedVideos',
    title: 'View recorded videos', 
  },
  {
    id: 'studentAttendance',
    label: 'Student Attendance',
    icon: 'bi bi-calendar-day',
    href: '###',
    title: 'Student Attendance', 
    subItems: [
      { label: 'View Attendance', href: '/studentDashboard/viewAttendance' },
    ]
  },
  // Add more menu items as needed
];

  // Handle the selection of a menu item
  const handleMenuSelect = (menuLabel) => {
    localStorage.setItem("MenuLabel",menuLabel)
    setSelectedMenu(menuLabel); // Set the selected menu when an item is clicked
  };


  return (
   <>
      <SidebarLayout 
      isSidebarOpen={isSidebarOpen} 
      toggleSidebar={toggleSidebar}
      menuItems={menuItems} 
      dashboardName={"/studentDashboard"} 
      onMenuSelect={handleMenuSelect} // Pass the callback to Sidebar
      />
      <div className={`main ${isSidebarOpen ? "" : "expand"}`}>
        <NavbarLayout 
        toggleSidebar={toggleSidebar} 
        selectedMenu={selectedMenu} // Pass the selected menu to Navbar
        />
            <div className='pt-5 px-4 mt-5 '>
                {children}
            </div>
        <FooterLayout/>
      </div>
   </>
  );
}
