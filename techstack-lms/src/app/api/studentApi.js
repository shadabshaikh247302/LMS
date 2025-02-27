import axios from "axios";
import { API } from "@/utils/Utils";
import toast from "react-hot-toast";

export async function createStd(state,body) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.post('/student/create', body)
    // console.log("Student Added Successfully", response.data);
    return response.status;  // Return the response in case you need to handle it
  } catch (error) {
    // console.error("Error Student Lead:", error);
  }
}
export async function getAllStd(state) {  
  // console.log(state);
  
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.get('/student/getstudents')
    // // Ensure that the response is an array
    return response.data.data?.students || [];
  } catch (error) {
    // console.error("Error fetching Students:", error);
    return []; // Return an empty array in case of error
  }
}
// export async function getStd() {
//     const reqStd = await axios.get('http://localhost:8000/student/getstudent')
//     console.log(reqStd.data.data);
// }
export async function updateStd(state,id, body) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.put(`/student/updateStudent/${id}`, body)
    // console.log("Student Updated Successfully", response.data);
    return response.status; // Return the updated Student data
  } catch (error) {
    // console.error("Error updating Student:", error);
    throw error;
  }
}
export async function deleteStd(state,id) {
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.delete(`/student/deleteStudent/${id}`)
    // console.log("Student Deleted Successfully:", response.data);
    return response.status; // Optionally, return the response
  } catch (error) {
    // console.error("Error deleting Student:", error);
    throw error; // Re-throw error for handling in the calling component
  }
}



export async function getStudentByBatchId(state,id){
  try {
    API.interceptors.request.use((req)=>{
      req.headers.authorization=`bearer ${state?.token}`
      return req;
    })
    const response = await API.get(`student/getStudentById/${id}`)
    console.log(response.data.students);
    return response.data.students; // Optionally, return the response
  } catch (error) {
    // toast.error("Empty Batch!")
    // console.error("Error deleting Student:", error);
    // throw error; // Re-throw error for handling in the calling component
  }
}