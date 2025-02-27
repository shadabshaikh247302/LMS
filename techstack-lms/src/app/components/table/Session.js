import { GetAllBatches } from '@/app/api/batchApi';
import { MainAdminContext } from '@/app/context/AdminContext';
import { UserContext } from '@/app/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';

// const batchDatas = [
//   {
//     "_id": "63f18b456a1d2b4d8f6c67e3",
//     "trainerId": "507f191e810c19729de860ea",
//     "courseId": "609b1f123f5b8c001fdd0b5a",
//     "timings": { "startTime": "9:00 AM", "endTime": "10:00 AM" },
//     "batchType": "Weekdays",
//   },
//   {
//     "_id": "63f18b4567hd2b4d8f6c67e3",
//     "trainerId": "507f191e810c19729de860ea",
//     "courseId": "609b1f123f5b8c001fdd0b5a",
//     "timings": { "startTime": "10:00 AM", "endTime": "12:00 PM" },
//     "batchType": "Weekdays",
//   },
//   {
//     "_id": "63f18b456a5g7b4d8f6c67e3",
//     "trainerId": "640d44f2e4b0a27b5b4f0c80",
//     "courseId": "640d44f2e4b0a27b5b4f0c71",
//     "timings": { "startTime": "10:00 AM", "endTime": "11:00 AM" },
//     "batchType": "Weekends",
//   }
// ];

// const courseData = [
//   {
//     "_id": "609b1f123f5b8c001fdd0b5a",
//     "Course Name": "Full Stack Web Development",
//     "Abbreviation": "FSWD",
//     "Duration": "6",
//     "DurationType": "Months",
//     "Course Fee": 1200,
//   },
//   {
//     "_id": "640d44f2e4b0a27b5b4f0c71",
//     "Course Name": "Web Development",
//     "Abbreviation": "WD",
//     "Duration": "6",
//     "DurationType": "Months",
//     "Course Fee": 800,
//   }
// ];

// const studentData  = [
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1001",
//     "Name": "John Doe",
//     "Phone": "1234567890",
//     "Email id": "johndoe@example.com",
//     "BatchId": "63f18b456a1d2b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1002",
//     "Name": "Jane Smith",
//     "Phone": "9876543210",
//     "Email id": "janesmith@example.com",
//     "BatchId": "63f18b4567hd2b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1003",
//     "Name": "Alice Johnson",
//     "Phone": "5556667777",
//     "Email id": "alicej@example.com",
//     "BatchId": "63f18b456a1d2b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1004",
//     "Name": "Robert Brown",
//     "Phone": "4445556666",
//     "Email id": "robertb@example.com",
//     "BatchId": "63f18b4567hd2b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1005",
//     "Name": "Emily Davis",
//     "Phone": "1112223333",
//     "Email id": "emilyd@example.com",
//     "BatchId": "63f18b456a1d2b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1006",
//     "Name": "Michael Wilson",
//     "Phone": "6667778888",
//     "Email id": "michaelw@example.com",
//     "BatchId": "63f18b4567hd2b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1007",
//     "Name": "Sophia Martinez",
//     "Phone": "9990001111",
//     "Email id": "sophiam@example.com",
//     "BatchId": "63f18b456a5g7b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1008",
//     "Name": "David Anderson",
//     "Phone": "2223334444",
//     "Email id": "davida@example.com",
//     "BatchId": "63f18b456a5g7b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1009",
//     "Name": "Olivia Thomas",
//     "Phone": "7778889999",
//     "Email id": "oliviat@example.com",
//     "BatchId": "63f18b456a5g7b4d8f6c67e3"
//   },
//   {
//     "_id": "65d3a1f5e5b1a24c8c8a1010",
//     "Name": "William Harris",
//     "Phone": "3334445555",
//     "Email id": "williamh@example.com",
//     "BatchId": "63f18b4567hd2b4d8f6c67e3"
//   }
// ]


export default function Session() {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const { adminState } = useContext(MainAdminContext)
  const [batchData, setBatchData] = useState([])
  // const [EmployeeData, setEmployeeData] = useState([])

  async function getAllBatches() {
    const data = await GetAllBatches(adminState)
    // console.log(data.data.batches);

    setBatchData([...data.data.batches])
    // setEmployeeData([...data.data.employees])
  }
  // console.log(batchData)


  useEffect(() => {
    getAllBatches()
    // console.log(batchData)
  }, [])
  // const groupedCourses = courseData.map(course => {
  //   const batches = batchDatas.filter(batch => batch.courseId === course._id);
  //   return { ...course, batches };
  // });


  const getStudentsForBatch = (batchId) => {
    return studentData.filter(student => student.BatchId === batchId);
  };

  // console.log(EmployeeData)
  console.log(batchData);

  return (
    <>
    </>
  );
}
