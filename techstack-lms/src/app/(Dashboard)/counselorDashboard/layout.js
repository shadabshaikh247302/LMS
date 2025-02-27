"use client"
import FooterLayout from "@/app/components/Layout/FooterLayout";
import Navbar from "@/app/components/Layout/NavbarLayout";
import SidebarLayout from "@/app/components/Layout/SidebarLayout";
import { UserContext } from "@/app/context/UserContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
const NavbarLayout=dynamic(()=>import("../../components/Layout/NavbarLayout"),{ssr:false});


export default function layout({ children }) {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(''); // State for the selected menu

  
  const {state} = useContext(UserContext)
  const router = useRouter();


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
//      ------------------------ SideBar Menu ---------------------------
const menuItems = [
  {
    id: 'workReport',
    label: 'Work Report',
    icon: 'bi bi-clipboard-data',
    href: '###',
    title: 'View work reports', 
    subItems: [
      { label: 'Work Report', href: '/counselorDashboard/workReport' },
      { label: 'Announcements', href: '/counselorDashboard/Announcement' }, // No title for sub-items
    ]
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: 'bi bi-list-task',
    href: '/counselorDashboard/schedule',
    title: 'View schedule', 
  },
  {
    id: 'courseArea',
    label: 'Course Area',
    icon: 'bi bi-journals',
    href: '###',
    title: 'View Course', 
    subItems: [
      { label: 'Study Material', href: '/counselorDashboard/studyMaterial' } 
    ]
  },
  {
    id: 'studentAdmission',
    label: 'Student Admission',
    icon: 'bi bi-people',
    href:  '/counselorDashboard/newAdmission',
    title: 'Student Admission', 
  },
  {
    id: 'Leads ',
    label: 'Leads ',
    icon: 'bi bi-graph-up-arrow',
    href: '/counselorDashboard/Leads',
    title: 'Leads', 
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
      dashboardName={"/counselorDashboard"} 
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
