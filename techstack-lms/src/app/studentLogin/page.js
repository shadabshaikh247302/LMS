  "use client"
import React, { Suspense } from 'react'
import Login from '../components/Auth/Login'
import StudentLoginForm from '../components/Form/StudentLoginForm'

export default function page() {
  return (
    //  <Suspense fallback={<>Loading...</>}>
      <Login>
          <StudentLoginForm/>
     </Login> 
    //  </Suspense>
  )
}
