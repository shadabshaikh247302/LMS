"use client"
import React, { Suspense } from 'react'
import Login from '../components/Auth/Login'
import AdminLoginForm from '../components/Form/AdminLoginForm'

export default function page() {
  return (
     <Suspense fallback={<>Loading...</>}>
      <Login>
          <AdminLoginForm/>
     </Login> 
     </Suspense>
  )
}