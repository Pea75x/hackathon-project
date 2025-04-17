import React from 'react'
import Button from './Button'
import { formatTotalTime } from './utils/time'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import logo from './logo.png'

function TimeAllocationPage({ totalHours, allocatedTime, setAllocatedTime, confirmHours }) {
  const [hoursSet, setHoursSet] = React.useState(totalHours)

  React.useEffect(() => {
    setHoursSet(allocatedTime.reduce((sum, phase) => sum + phase.value, 0) * totalHours)  
  }, [allocatedTime, totalHours]);

  function handleChange(event, phaseToChange) {
    const updatedAnswer = allocatedTime.map((phase) =>
      phase.name === phaseToChange.name
        ? { ...phase, value: parseFloat(event) }
        : phase
    )
    setAllocatedTime(updatedAnswer)
  }
  const diffPercent = ((totalHours - hoursSet) / totalHours) * 100;
  const colorClass = diffPercent >= 0 ? 'text-green-500' : 'text-red-500'; 

  return (
    <div className="w-full md:w-[375px] m-auto flex items-center flex-col justify-around h-[100%] overflow-y-scroll bg-[#f8f4ec]">
      <img src={logo} alt="hacktrack logo" width="90%" className="pt-2"/>
        <div className="text-3xl font-bold mb-2 h-[70px] w-full justify-center flex items-center text-[#ed5b2c]">
          <div>Allocated time</div>
        </div>
        <div className="w-11/12 py-2">
          <div className="px-1 grid grid-cols-2">
          {allocatedTime.map((phase) => (
            <div key={phase.name} className="flex justify-start items-center my-3 rounded-xl mx-1 p-1 shadow-sm relative max-w-[180px] bg-white/70">
              <div className="text-2xl relative flex justify-center items-center mr-2">
                <div className="x-0">
                <CountdownCircleTimer
                  key={hoursSet}
                  isPlaying={false}
                  size="35"
                  strokeWidth={6}
                  duration={totalHours}
                  initialRemainingTime={(phase.value * totalHours)}
                  colors={['#d9d9d9']}
                  trailColor={"#d9d9d980"}
                >
                </CountdownCircleTimer>
              </div>
              <div className="x-10 absolute">{phase.icon}</div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-xs">{phase.name}</label>
                  <div className="absolute right-1 text-gray-500 text-xs">
                    <input
                      type="number"
                      className="w-[40px] text-right bg-transparent outline-none"
                      value={(phase.value * 100).toFixed(0)}
                      min="0"
                      max="100"
                      onChange={(e) => {
                        let percent = parseFloat(e.target.value)
                        if (isNaN(percent) || percent > 100 || percent < 0) return
                        handleChange(percent / 100, phase)
                      }}
                    />
                    %
                  </div>
                </div>
                <div className="text-[10px]">{formatTotalTime(phase.value * totalHours)}</div>
                <input type="range" className="rangeInput" value={phase.value} min={0} step={0.01} max={1} onChange={(event) => handleChange(event.target.value, phase)}>
                </input>
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className="w-10/12 flex justify-center items-center text-right">
          <div className="w-1/2">
            <div className="font-semibold">Total time:</div>
            <div className="shadow-sm py-2 bg-white/50 rounded-xl">{formatTotalTime(hoursSet)}</div>
          </div>
          <div className="relative flex justify-center items-center w-1/2">
            <CountdownCircleTimer
              key={hoursSet}
              isPlaying={false}
              size="70"
              strokeWidth={10}
              duration={totalHours}
              initialRemainingTime={hoursSet}
              colors={[`${diffPercent >= 0 ? '#78bf86' : 'red'}`]}
                trailColor={"#d9d9d980"}
            >
            </CountdownCircleTimer>
            <div className={`absolute font-semibold ${colorClass}`}>
              {`${((hoursSet / totalHours) * 100).toFixed(0)}%`}
            </div>
          </div>
        </div>
        <div className="w-11/12 flex items-center">
          <Button text="Begin" onClick={confirmHours} classes="my-4 w-full" disabled={diffPercent.toFixed(0) < 0} buttonType={diffPercent.toFixed(0) < 0 ? "disabled" : "classic"}/>
        </div>
    </div>
  )
}
export default TimeAllocationPage;