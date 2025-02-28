"use client";
import React, { useState, useEffect, useContext, Suspense } from "react";
import { getAllStd, updateStd } from "../../../api/studentApi"; 

import { UserContext } from "../../../context/UserContext";
import { MainAdminContext } from "../../../context/AdminContext";
import { StudentContext } from "../../../context/StudentContext";
import dynamic from "next/dynamic";
import Loader from "../../../components/common/Loader";

const StudentTable = dynamic(() => import("@/app/components/table/StudentTable"), {
  loading: () => {<Loader/>},  // You can display a loading message or spinner here
  ssr: false,
});

export default function NewAdmission() {
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);
  const{studentData,studentDispatch} = useContext(StudentContext)
  const [students, setStudents] = useState([]);

async function fetchStudent() {
    try {
      let data = adminState.token == "undefined" ? 
      await getAllStd(state) : await getAllStd(adminState);

      if(studentData){
          studentDispatch({
            type:"GET_STUDENT",
            payload:data
          })
      }
    } catch (error) {
      console.log(error); 
    }
}

useEffect(()=>{
  fetchStudent();
},[])


  const updateStdData = async (studentId, updatedData) => {
    try {
      // Make the API call to update the student
      if(!adminState.token)
      await updateStd(state,studentId, updatedData);
      else
      await updateStd(adminState,studentId, updatedData);
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };
  
  const handleCourseSelectionChange = (id,index,selectedCourses) => {
    // If selectedCourses is valid and contains 'fee', the following will work
    const updatedstudents = [...students];
    const totalFee = selectedCourses.reduce((sum, course) => sum + (course["Course Fee"] || 0), 0);
    
    updatedstudents[index].Course = selectedCourses.map((course) => course.Abbreviation);
    updatedstudents[index].Fee = totalFee;
    // Call your update function to sync with backend or state management
    updateStdData(id, { 
      Course: selectedCourses.map((course) => course.Abbreviation),
      Fee: totalFee 
    });
  
    setStudents(updatedstudents);
  };

  return (
    <Suspense fallback={<Loader/>}>
        <StudentTable 
          StdData={students} 
          fetchStudent={fetchStudent}
          setStudents={setStudents}
          updateStdData={updateStdData}
          handleCourseSelectionChange={handleCourseSelectionChange}
        />
    </Suspense>           
  )
}
