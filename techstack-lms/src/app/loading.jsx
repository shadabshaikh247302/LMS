import React from 'react'

export default function loading() {
  return (
  <div className='container d-flex justify-content-center align-items-center' style={{height:"100vh",width:"100vw"}}>
     <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <div className="loader">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
   </div>

  )
}
