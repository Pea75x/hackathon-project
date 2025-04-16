import React from 'react'
import logo from './logo.png'

function CompletedPage() {
  return (
    <div className="h-full w-full md:w-[375px] m-auto flex justify-center items-center flex-col bg-[#f8f4ec]">
      <img src={logo} alt="hacktrack-logo" width="90%" className="pt-2"/>
      <div className="flex items-center w-full justify-center my-6 relative">
        <div className="text-3xl mx-4 my-4">Time is up</div>
      </div>
      <div className="text-5xl">⏰</div>
      <div className="my-6 relative w-full text-center items-center flex-col flex">
        Good luck! You got this!
      </div>
    </div>
  )
}

export default CompletedPage;