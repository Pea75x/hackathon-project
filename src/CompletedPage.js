import React from 'react'

function CompletedPage() {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
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