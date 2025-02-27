"use client"
import Login from "./components/Auth/Login";
import EmployeeLoginForm from "./components/Form/EmployeeLoginForm";

export default function Home() {
  return (
     <Login>
          <EmployeeLoginForm/>
     </Login>
  );
}
