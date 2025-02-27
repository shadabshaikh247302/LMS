"use client"
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

export default function Adminpage() {
     const router = useRouter()
    
      const {state} = useContext(UserContext)


      
  useEffect(() => {
    if (state && state.Role) {
      if (state.Role !== "CNSLR" && state.Role !== "HR") {
        router.replace('/');
      } else {
        const handlePopState = (event) => {
          if (state.Role === 'CNSLR' || state.Role === "HR") {
            router.replace('/counselorDashboard');
          }
        };
        window.onpopstate = handlePopState;
        return () => {
          window.onpopstate = null;
        };
      }
    } else {
      router.replace("/");
    }
  }, [state, router]);

  

  return (
    <div>
        Counselor Dashboard
    </div>   
  )
}
