"use client"
import FooterLayout from "@/app/components/Layout/FooterLayout";
import SidebarLayout from "@/app/components/Layout/SidebarLayout";
import { UserContext } from "@/app/context/UserContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const NavbarLayout=dynamic(()=>import("../../components/Layout/NavbarLayout"),{ssr:false});


export default function layout({ children }) {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(''); // State for the selected menu
  const router = useRouter()

  const {state} = useContext(UserContext)
  useEffect(()=>{
    if(state && state.Role){
      
      if(state.Role==="CNSLR" || state.Role==="HR"){
        router.replace('/');
      }
      const handlePopState = (event) => {
        if (state.Role !== 'CNSL' || state.Role!=="HR") {
          router.replace('/facultyDashboard');
        }
      };
  
      window.onpopstate = handlePopState;
  
      return () => {
        window.onpopstate = null;
      };
    }
    else{
      router.replace('/')
    }
  },[])

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
      { label: 'Work Report', href: '/facultyDashboard/workReport' },
      { label: 'Announcements', href: '/facultyDashboard/Announcement'}, // No title for sub-items
    ]
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: 'bi bi-list-task',
    href: '/facultyDashboard/schedule',
    title: 'View schedule', 
  },
  {
    id: 'courseArea',
    label: 'Course Area',
    icon: 'bi bi-journals',
    href: '####',
    title: 'View Course', 
    subItems: [
      { label: 'Study Material', href: '/facultyDashboard/studyMaterial' } 
    ]
  },
  {
    id: 'studentAttendance',
    label: 'Student Attendance',
    icon: 'bi bi-calendar-day',
    href: '###',
    title: 'Student Attendance', 
    subItems: [
      { label: 'Mark Attendance', href: '/facultyDashboard/markAttendance' }, 
      { label: 'View Attendance', href: '/facultyDashboard/viewAttendance' },
      { label: 'Percentage-Wise', href: '/facultyDashboard/Percentage-Wise' },
    ]
  },
  {
    id: 'studentAdmission',
    label: 'Student Admission',
    icon: 'bi bi-people',
    href: '###',
    title: 'Student Admission', 
    subItems: [
      { label: 'New Admission', href: '/facultyDashboard/newAdmission' }, 
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
      dashboardName={"/facultyDashboard"} 
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
