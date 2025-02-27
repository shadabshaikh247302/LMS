"use client"
import React, { useContext, useState } from "react";
import { getAllLead, updateLead } from "@/app/api/leadApi";

import { MainAdminContext } from "@/app/context/AdminContext";
import { PaymentContext } from "@/app/context/PaymentContext";
import { StudentContext } from "@/app/context/StudentContext";
import { UserContext } from "@/app/context/UserContext";
import { LeadContext } from "@/app/context/LeadContext";
import CourseDropdown from "../Dropdown/CourseDropdown";

const VarificationTable = ({leads, handleCourseSelectionChange }) => {
  const { paymentData } = useContext(PaymentContext);
  const {studentData} = useContext(StudentContext)
  const { leadDispatch } = useContext(LeadContext);
  const { adminState } = useContext(MainAdminContext);
  const { state } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredLeads = leads.filter(lead => 
    lead.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.Remark.toLowerCase().includes(searchQuery.toLowerCase())
  );

// ========================= Handle Update & Change ========================================================

  const updateLeadData = async (leadId, updatedData) => {
    try {
      // Make the API call to update the lead
      let status = !adminState.token
        ? await updateLead(state, leadId, updatedData)
        : updateLead(adminState, leadId, updatedData);

        if(status==200){
          let data = !adminState.token ? await getAllLead(state) : await getAllLead(adminState)
          if(data){
            leadDispatch({
              type:"GET_LEAD",
              payload:data
            })
          }
        }
    } catch (error) {
      console.error("Error updating lead data:", error);
    }
  };

  function handleChange(index, e, field) {
    const updatedLeads = [...leads];
    updatedLeads[index][field] = e.target.value;
    leadDispatch({
      type: "GET_LEAD",
      payload: updatedLeads,
    });
  }
  return (
    <div className="container-fluid mt-3 px-0">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-3"
        style={{width:"25vw"}}
      />
      <div
        className="table-responsive"
        style={{ height: "calc(100vh - 200px)"}}
      >
        <table
          className="table table-bordered"
          style={{ position: "relative" }}
        >
          <thead>
            <tr style={{ position: "sticky", top: "-1px", zIndex: "1001" }}>
              <th style={{ minWidth: "20px", background: "#b562ff" }}>Sr</th>
              <th style={{ minWidth: "180px", background: "#b562ff" }}>Name</th>
              <th style={{ minWidth: "100px", background: "#b562ff" }}>Fee</th>
              <th style={{ minWidth: "220px", background: "#b562ff" }}>
                Course
              </th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>
                Paid Amount
              </th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>
                Payer Name
              </th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>MOP</th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>
                PlatForm
              </th>
              <th style={{ minWidth: "150px", background: "#b562ff" }}>
                Verification
              </th>
              <th style={{ minWidth: "180px", background: "#b562ff" }}>
                Remark
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads?.length === 0 ? (
              <tr>
              <td colSpan="6" className="text-center">Loading...</td>
            </tr>
            ) : (
            filteredLeads?.map((lead, index) =>
              paymentData?.find((pay) => pay.EmiId === lead.EmiId) ? (
                <tr
                  key={lead._id}
                  style={{
                    background: `${
                      lead.isVerified == "Verified"
                        ? "#54ff54"
                        : lead.isVerified == "Not Verified"
                        ? "#fffa35"
                        : "#ff3434"
                    }`,
                  }}
                >
                  {/* Sr No */}
                  <td
                    className="text-center"
                    style={{
                      background: "transparent",
                      padding: "8px 0 0 0",
                      minWidth: "20px",
                    }}
                  >
                    {index + 1}
                  </td>

                  {/* Name */}
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "180px",
                    }}
                  >
                    <input
                      id={`Name-${index + 1}`}
                      type="text"
                      value={lead["Name"]}
                      className="form-control bg-transparent shadow-none border-0"
                      // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                      disabled={true}
                      readOnly={
                        studentData &&
                        studentData?.some((std) => std.leadId === lead._id)
                          ? true
                          : false
                      }
                      // onChange={(e) => {
                      //   const updatedLeads = [...leads];
                      //   updatedLeads[index].Name = e.target.value;
                      //   // setLeads(updatedLeads);
                      //   leadDispatch({
                      //     type:"GET_LEAD",
                      //     payload:updatedLeads
                      //   })
                      // }}
                      onChange={(e) => {
                        handleChange(index, e, "Name");
                      }}
                    />
                  </td>

                  {/* Fee */}
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "100px",
                    }}
                  >
                    <input
                      id={`Fee-${index + 1}`}
                      type="text"
                      value={lead.Fee || ""}
                      className="form-control bg-transparent shadow-none border-0"
                      // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                      disabled={true}
                      placeholder="Enter Fee"
                      readOnly
                      onChange={(e) => {
                        handleChange(index, e, "Fee");
                      }}
                    />
                  </td>

                  {/* Coursee */}
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "220px",
                    }}
                  >
                    <CourseDropdown
                      indexId={index}
                      studentCourses={lead.Course || []}
                      // disable={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") || StdData && StdData.some((std) => std.leadId === lead._id) ? true : false}
                      disable={true}
                      onSelectionChange={(selectedCourses) =>
                        handleCourseSelectionChange(
                          lead._id,
                          index,
                          selectedCourses
                        )
                      }
                    />
                  </td>

                  {/* Paid Amount */}
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "100px",
                    }}
                  >
                    <input
                      id={`PaidAmount-${index + 1}`}
                      type="text"
                      defaultValue={
                        paymentData?.length > 0
                          ? paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                              ?.amount || "No Payment"
                          : "Loading..."
                      }
                      className="form-control bg-transparent shadow-none border-0"
                      // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                      disabled={true}
                      placeholder="Enter Fee"
                      readOnly
                    />
                  </td>

                  {/* Payer Name */}
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "100px",
                    }}
                  >
                    <input
                      id={`PayerName-${index + 1}`}
                      type="text"
                      defaultValue={
                        paymentData?.length > 0
                          ? paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                              ?.payerName || "Not Mention"
                          : "Loading..."
                      }
                      className="form-control bg-transparent shadow-none border-0"
                      // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                      disabled={true}
                      placeholder="Enter Fee"
                      readOnly
                    />
                  </td>

                  {/* MOP Name */}
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "100px",
                    }}
                  >
                    <input
                      id={`MOP-${index + 1}`}
                      type="text"
                      defaultValue={
                        paymentData?.length > 0
                          ? paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                              ?.MOP || "Not Mention"
                          : "Loading..."
                      }
                      className="form-control bg-transparent shadow-none border-0"
                      // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                      disabled={true}
                      placeholder="Enter Fee"
                      readOnly
                    />
                  </td>

                  {/* Payment Platform */}
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "100px",
                    }}
                  >
                    <input
                      id={`Platform-${index + 1}`}
                      type="text"
                      defaultValue={
                        paymentData?.length > 0
                          ? paymentData?.find((pay) => pay.EmiId === lead.EmiId)
                              ?.platform || "---"
                          : "Loading..."
                      }
                      className="form-control bg-transparent shadow-none border-0"
                      // disabled={(lead["Admission Status"] === "Not Interested" || lead["Admission Status"] === "Wrong No") ? true : false}
                      disabled={true}
                      placeholder="Enter Fee"
                      readOnly
                    />
                  </td>

                  {/* isVerified */}
                  <td
                    className="text-center"
                    style={{ padding: "1px", minWidth: "150px" }}
                  >
                    <select
                      id={`Verify-${index + 1}`}
                      value={lead.isVerified} // Directly store the selected string
                      onChange={(e) => {
                        const newValue = e.target.value; // Store selected string value
                        const updatedLeads = [...leads];
                        updatedLeads[index].isVerified = newValue;
                        leadDispatch({
                          type: "GET_LEAD",
                          payload: updatedLeads,
                        });
                        updateLeadData(lead._id, { isVerified: newValue });
                      }}
                      className="form-select shadow-none"
                    >
                      <option value="Not Verified">Not Verified</option>
                      <option value="Verified">Verified</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </td>

                  {/* Remark */}
                  <td
                    style={{
                      background: "transparent",
                      padding: "2px",
                      minWidth: "150px",
                    }}
                  >
                    <input
                      id={`Remark-${index + 1}`}
                      type="text"
                      value={lead.Remark}
                      className="form-control bg-transparent shadow-none border-0"
                      disabled={
                        lead["Admission Status"] === "Not Interested" ||
                        lead["Admission Status"] === "Wrong No"
                          ? true
                          : false
                      }
                      readOnly={
                        studentData &&
                        studentData?.some((std) => std.leadId === lead._id)
                          ? true
                          : false
                      }
                      maxLength={15}
                      onChange={(e) => {
                        handleChange(index, e, "Remark");
                      }}
                      onBlur={(e) =>
                        updateLeadData(lead._id, { Remark: e.target.value })
                      }
                    />
                  </td>
                </tr>
              ) : null
            )
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VarificationTable;
