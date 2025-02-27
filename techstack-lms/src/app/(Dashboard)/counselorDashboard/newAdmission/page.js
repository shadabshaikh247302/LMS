"use client"
import React, { useContext, useEffect } from 'react'
import { MainAdminContext } from '@/app/context/AdminContext'
import { useRouter } from 'next/navigation'
import NewAdmission from './NewAdmission'

export default function Page(){
  const {adminState} = useContext(MainAdminContext)
  const router = useRouter();

  useEffect(()=>{
    if(!adminState?.token){
      router.push("/administratorLogin")
    }
  },[adminState?.token])

  return (
      <NewAdmission/>
  )
}

