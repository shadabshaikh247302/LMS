"use client";
import React, { useContext, useEffect, useState } from "react";
import BooleanButton from "../Button/BooleanButton";

// import { getAllStd, updateStd } from "@/acpp/api/studentApi";

import CourseDropdown from "../Dropdown/CourseDropdown";
import EmiDrowdown from "../Dropdown/EmiDropdownModal";

import { UserContext } from "@/app/context/UserContext";
import { StudentContext } from "@/app/context/StudentContext";
import { MainAdminContext } from "@/app/context/AdminContext";
import { getAllStd, updateStd } from "@/app/api/studentApi";
import BatchDropdown from "../Dropdown/BatchDropdown";

const StudentTable = ({setStudents}) => {
  const { state } = useContext(UserContext);
  const { studentData, studentDispatch } = useContext(StudentContext);
  const { adminState } = useContext(MainAdminContext);
  const [adminToken, setAdminToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [batch, setBatch] = useState({ batch: "" });

  async function fetchStudent() {
    try {
      let data = !adminState.token
        ? await getAllStd(state)
        : await getAllStd(adminState);

        if(data){
          studentDispatch({
            type:"GET_STUDENT",
            payload:data
          })
        }
    } catch (error) {
      console.log(error);
      
    }
  }

  function handleChange(index,e,field){
    const updatedStudents = [...studentData];
    updatedStudents[index][field] = e.target.value;
    studentDispatch({
      type: "GET_STUDENT",
      payload: updatedStudents
    });
  }

  async function updateStudent(studentId, updatedData) {
    try {
      let data = !adminState.token
        ? await updateStd(state, studentId, updatedData)
        : await updateStd(adminState, studentId, updatedData);
      if (data) {
        fetchStudent();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCourseSelectionChange(id, index, selectedCourses) {
    try {
      const updatedstudents = [...studentData];
      const totalFee = selectedCourses.reduce(
        (sum, course) => sum + (course["Course Fee"] || 0),
        0
      );

      updatedstudents[index].Course = selectedCourses.map(
        (course) => course.Abbreviation
      );
      updatedstudents[index].Fee = totalFee;
      // Call your update function to sync with backend or state management
      updateStudent(id, {
        Course: selectedCourses.map((course) => course.Abbreviation),
        Fee: totalFee,
      });
      fetchStudent();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminToken(localStorage.getItem("MainAdminToken"));
      // setEmpToken(localStorage.getItem("EmployeToken"));
    }
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // "No Record"
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    // const hours = date.getHours() % 12 || 12;
    // const minutes = date.getMinutes().toString().padStart(2, "0");
    // const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}-${month}-${year}`; // ${hours}:${minutes} ${ampm}
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBatchChange = (e) => {
    setBatch({ batch: e.target.value });
  };

  const filteredStudents = Array.isArray(studentData) 
    ? studentData.filter(student => 
        (student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         student?.phone?.includes(searchQuery) ||
         student?.email?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!batch.batch || student?.batch?.toLowerCase().includes(batch.batch.toLowerCase()))
      ) 
    : [];

  return (
    <div className="container-fluid mt-3 px-0">
      <div
        className="table-responsive"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <table
          className="table table-bordered"
          style={{ position: "relative" }}
        >
          <thead>
            <tr style={{ position: "sticky", top: "-1px", zIndex: "5" }}>
              <th style={{ minWidth: "20px", background: "#ffcd72" }}>Sr</th>
              <th style={{ minWidth: "180px", background: "#ffcd72" }}>Name</th>
              <th style={{ minWidth: "180px", background: "#ffcd72" }}>
                Phone
              </th>
              <th style={{ minWidth: "250px", background: "#ffcd72" }}>
                Email ID
              </th>
              <th style={{ minWidth: "180px", background: "#ffcd72" }}>
                Course
              </th>
              <th style={{ minWidth: "100px", background: "#ffcd72" }}>Fee</th>
              <th style={{ minWidth: "90px", background: "#ffcd72" }}>
                Lead by
              </th>
              <th style={{ minWidth: "90px", background: "#ffcd72" }}>
                Demo by
              </th>
              <th
                style={{ minWidth: "105px", background: "#ffcd72" }}
                title="Date of Admission"
              >
                DOA
              </th>
              <th
                style={{ minWidth: "105px", background: "#ffcd72" }}
                title="Date of Joinig"
              >
                DOJ
              </th>
              {adminToken || state.Role === "HR" ? (
                <>
                  <th style={{ minWidth: "100px", background: "#ffcd72" }}>
                    Fee Paid
                  </th>
                  <th style={{ minWidth: "150px", background: "#ffcd72" }}>
                    Remark
                  </th>
                  <th style={{ background: "#ffcd72" }}>isFullyPaid</th>
                  <th style={{ background: "#ffcd72" }}>isCompleted</th>
                  <th style={{ minWidth: "150px", background: "#ffcd72" }}>
                    Status
                  </th>
              <th style={{ minWidth: "150px", background: "#ffcd72" }}>Batch</th>
                </>
              ) : null}
            </tr>
          </thead>
          <tbody>
          {studentData?.length === 0 ?(
            <tr>
              <td colSpan="10" className="text-center">Loading...</td>
            </tr>
          ) : (
            studentData?.map((Std, index) => (
              <tr key={Std._id}>
                <td
                  style={{
                    padding: "8px 0 0 0",
                    backgroundColor: "transparent",
                  }}
                  className="text-center"
                >
                  {index + 1}
                </td>

                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <input
                    id={"Name-" + index}
                    type="text"
                    value={Std["Name"]}
                    className="form-control shadow-none border-0"
                    onChange={(e) => {
                      handleChange(index,e,"Name")
                    }}
                    onBlur={(e) =>
                      updateStudent(Std._id, { Name: e.target.value })
                    }
                  />
                </td>
                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <input
                    id={"Phone-" + index}
                    type="text"
                    value={Std.Phone}
                    className="form-control shadow-none border-0"
                    onChange={(e) => {
                      handleChange(index,e,"Phone")
                    }}
                    onBlur={(e) =>
                      updateStudent(Std._id, { Phone: e.target.value })
                    }
                  />
                </td>
                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <input
                    id={"Email-" + index}
                    type="text"
                    value={Std["Email id"]}
                    className="form-control shadow-none border-0"
                    onChange={(e) => {
                      handleChange(index,e,"Email id")
                    }}
                    onBlur={(e) =>
                      updateStudent(Std._id, { "Email id": e.target.value })
                    }
                  />
                </td>
                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <CourseDropdown
                    indexId={index}
                    studentCourses={Std.Course || []}
                    onSelectionChange={(selectedCourses) => {
                      handleCourseSelectionChange(
                        Std._id,
                        index,
                        selectedCourses
                      );
                    }}
                  />
                </td>
                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <input
                    id={"Fee-" + index}
                    type="text"
                    value={Std.Fee || ""}
                    className="form-control shadow-none border-0"
                    onChange={(e) => {
                      handleChange(index,e,"Fee")
                    }}
                    onBlur={(e) =>
                      updateStudent(Std._id, { Fee: e.target.value })
                    }
                  />
                </td>
                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <input
                    id={"Lead-" + index}
                    type="text"
                    value={Std["Lead by"]}
                    className="form-control shadow-none border-0"
                    readOnly
                  />
                </td>
                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <input
                    id={"Demo-" + index}
                    type="text"
                    value={Std["Demo by"]}
                    className="form-control shadow-none border-0"
                    readOnly
                  />
                </td>
                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <input
                    id={"DOA-" + index}
                    type="text"
                    value={formatDate(Std.createdAt)}
                    className="form-control shadow-none border-0"
                    readOnly
                  />
                </td>
                <td style={{ padding: "2px", backgroundColor: "transparent" }}>
                  <input
                    id={"DOJ-" + index}
                    type="text"
                    value={formatDate(Std.DOJ)}
                    className="form-control shadow-none border-0"
                    readOnly
                  />
                </td>

                {adminToken || state.Role === "HR" ? (
                  <>
                    <td
                      style={{ padding: "2px", backgroundColor: "transparent" }}
                    >
                      {/* <input
                    id={'EMI-' + index}
                    type="text"
                    value={Std.EmiId}
                    className="form-control shadow-none border-0"
                    readOnly
                  /> */}
                      <EmiDrowdown StdById={Std} idx={index} />
                    </td>
                    <td
                      style={{ padding: "2px", backgroundColor: "transparent" }}
                    >
                      <input
                        id={"Remark-" + index}
                        type="text"
                        value={Std.Remark}
                        className="form-control shadow-none border-0"
                        onChange={(e) => {
                          handleChange(index,e,"Remark")
                        }}
                        onBlur={(e) =>
                          updateStudent(Std._id, { Remark: e.target.value })
                        }
                      />
                    </td>
                    <td
                      style={{ padding: "2px", backgroundColor: "transparent" }}
                    >
                      <BooleanButton
                        booleanValue={Std.isFullyPaid}
                        onClick={() => {
                          const updatedStudents = [...studentData];
                          updatedStudents[index].isFullyPaid = !Std.isFullyPaid;
                          setStudents(updatedStudents); // Update the state with the modified student
                          updateStudent(Std._id, {
                            isFullyPaid: updatedStudents[index].isFullyPaid,
                          });
                        }}
                      />
                    </td>
                    <td
                      style={{ padding: "2px", backgroundColor: "transparent" }}
                    >
                      <BooleanButton
                        booleanValue={Std.isCourseCompleted}
                        onClick={() => {
                          const updatedStudents = [...studentData];
                          updatedStudents[index].isCourseCompleted =
                            !Std.isCourseCompleted;
                          setStudents(updatedStudents); // Update the state with the modified student
                          updateStudent(Std._id, {
                            isCourseCompleted:
                              updatedStudents[index].isCourseCompleted,
                          });
                        }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "2px",
                        backgroundColor: "transparent",
                        minWidth: "100px",
                      }}
                      className="text-center"
                    >
                      <select
                        id={"Status-" + index}
                        value={Std["Student Status"]}
                        className="form-control shadow-none border-0"
                        onChange={(e) => {
                          handleChange(index,e,"Student Status")
                          updateStudent(Std._id, {
                            "Student Status": e.target.value,
                          });
                        }}
                      >
                        <option value="Running">Running</option>
                        <option value="Drop">Drop</option>
                        <option value="Hold">Hold</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                <td>
                <BatchDropdown  />
                </td>
                  </>
                ) : null}
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
// cxz