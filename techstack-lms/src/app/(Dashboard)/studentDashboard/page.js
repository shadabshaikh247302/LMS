"use client"
import AnnouncementPage from '@/app/components/common/Announcement'
import React, { Suspense } from 'react'

export default function Adminpage() {
  return (
  
        <Suspense fallback={<>Loading...</>}>
          <AnnouncementPage/>
        </Suspense>
   
  )
}
