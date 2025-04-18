import React from 'react'
import Button from './Button'
import logo from './logo.png'

function StartingPage({hours, setHours, onNext}) {
  const handleChange = (event) => {
    const value = event.target.value;
    value === "" ? setHours("") : setHours(parseFloat(value))
  };
  return (
    <div className="w-full md:w-[375px] h-screen m-auto flex justify-center items-center bg-[#f8f4ec]">
      <div className="w-11/12 flex justify-around flex-col items-center h-[70%]">
        <img src={logo} alt="hacktrack-logo" width="90%"/>
        <label className="text-2xl text-center text-[#ed5b2c]">How many hours are you committing to your hackathon?</label>
        <input
          style={{lineHeight: "40px", verticalAlign: "text-bottom"}}
          className="text-lg py-2 px-5 rounded-full w-full text-center rounded-full h-[50px] bg-white/50 shadow-sm outline-[#3b8d84]"
          type="number"
          id="name"
          name="totalHours"
          value={hours === "" ? "" : hours}
          onChange={handleChange}
          required
          size="10" />
        <Button 
          text="confirm"
          onClick={onNext}
          disabled={hours === "" || hours <= 0}
          buttonType={hours === "" || hours <= 0 ? "disabled" : "classic"}/>
      </div>
    </div>
  )
}

export default StartingPage;