"use client"
import WorkReport from '@/app/components/common/workReport'
import { MainAdminContext } from '@/app/context/AdminContext'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

export default function WorkReportPage() {
  const{adminState} = useContext(MainAdminContext)
  
    const router = useRouter()
          useEffect(()=>{
            if(!adminState?.token){
              router.push('/')
              // toast.success("You are logged in!")
            }
          },[adminState?.token])
  return (
    <WorkReport/>
  )
}
