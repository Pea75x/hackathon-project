import React from 'react'
import Button from './Button'
import titlepage from './titlepage.webp'

function StartingPage({hours, setHours, onNext}) {
  return (
    <div className="h-screen w-full lg:w-1/3 m-auto flex justify-center items-center">
      <div className="w-11/12 flex justify-around flex-col items-center h-[70%]">
        <label className="text-2xl text-center">How many hours is your hackathon?</label>
        <input
          style={{lineHeight: "40px", verticalAlign: "text-bottom"}}
          className="text-lg py-2 px-5 rounded-full w-full text-center rounded-full h-[50px] border"
          type="number"
          id="name"
          name="totalHours"
          value={hours}
          onChange={(event) => setHours(parseFloat(event.target.value) || 0)}
          required
          size="10" />
        <Button text="confirm" onClick={onNext} disabled={hours === 0}/>
      </div>
    </div>
  )
}

export default StartingPage;