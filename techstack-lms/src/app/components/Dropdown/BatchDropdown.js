import { GetAllBatches } from "@/app/api/batchApi";
import { MainAdminContext } from "@/app/context/AdminContext";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";

export default function BatchDropdown() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const {adminState} = useContext(MainAdminContext);

  async function batch(){
    let response = await GetAllBatches(adminState);
    const batchData = response.data.batches;
    
    // Transform batch data to create options with both timings and batch type
    const timeOptions = batchData.map(batch => ({
      value: `${batch.timings.startTime}-${batch.timings.endTime} (${batch.batchType})`,
      label: `${batch.timings.startTime} - ${batch.timings.endTime} (${batch.batchType})`
    }));
    
    setOptions(timeOptions);
  } 

  useEffect(() => {
    batch();
  }, [adminState]);

  return (
    <div>
      {/* <label className="block mb-2 font-bold">Select Batch Type:</label> */}
      <Select
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
        isSearchable
        // placeholder="Search & Select Timing..."
        className="w-full"
      />

      {selectedOption && (
        <p className="mt-3">
          You selected: <b>{selectedOption.label}</b>
        </p>
      )}
    </div>
  );
}










// import { GetAllBatches } from "@/app/api/batchApi";

// import { MainAdminContext } from "@/app/context/AdminContext";
// import { UserContext } from "@/app/context/UserContext";
// import React, { useContext, useEffect, useState } from "react";

// export default function BatchDropdown() {
//   const [selectedValue, setSelectedValue] = useState("");
//   const {adminState} = useContext(MainAdminContext)
//   const {state} = useContext (UserContext)

//   const options = [
//     { value: "weekdays", label: "Weekdays Batch" },
//     { value: "weekends", label: "Weekends Batch" },
//     { value: "evening", label: "Evening Batch" },
//   ];



//   async function batch(){
//     let data = await GetAllBatches(adminState)
//     console.log(data)
//   } 

//   useEffect(()=>{
//     batch()
//   },[adminState])
//   return (
//     <div>
//       {/* <label className="block mb-2 font-bold">Select Batch Type:</label> */}
//       <select
//         className="border rounded p-2 w-full"
//         value={selectedValue}
//         onChange={(e) => setSelectedValue(e.target.value)}
//       >
//         <option value="">Select an option</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       {selectedValue && (
//         <p className="mt-3">You selected: <b>{selectedValue}</b></p>
//       )}
//     </div>
//   );
// }
