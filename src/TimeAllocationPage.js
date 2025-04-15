import React from 'react'
import Button from './Button'
import { formatTotalTime } from './utils/time'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function TimeAllocationPage({ totalHours, allocatedTime, setAllocatedTime, confirmHours }) {
  const [hoursSet, setHoursSet] = React.useState(totalHours)

  React.useEffect(() => {
    setHoursSet(allocatedTime.reduce((sum, phase) => sum + phase.value, 0) * totalHours)  
  }, [allocatedTime, totalHours]);

  function handleChange(event, phaseToChange) {
    const updatedAnswer = allocatedTime.map((phase) =>
      phase.name === phaseToChange.name
        ? { ...phase, value: parseFloat(event.target.value) }
        : phase
    )
    setAllocatedTime(updatedAnswer)
  }
  console.log((parseFloat((hoursSet / totalHours) * 100).toFixed(0)))
  const diffPercent = ((totalHours - hoursSet) / totalHours) * 100;
  const colorClass = diffPercent > 0 ? 'text-green-500' : 'text-red-500'; 

  return (
    <div className="w-[375px] m-auto flex items-center flex-col justify-start h-[100%] overflow-y-scroll">
        <div className="text-4xl font-bold my-4 h-[9vh] border-b w-10/12 justify-center flex items-center">
          <div>Allocated time</div>
        </div>
        <div className="w-11/12 md:w-10/12 py-2 grid grid-cols-2">
        {allocatedTime.map((phase) => (
          <div key={phase.name} className="flex justify-start items-center my-3 rounded-xl m-1 p-1 shadow-sm relative">
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
                <div className="text-gray-500 text-xs absolute right-1">{(phase.value * 100).toFixed(0)}%</div>
              </div>
              <div className="text-[10px]">{formatTotalTime(phase.value * totalHours)}</div>
              <input type="range" className="rangeInput" value={phase.value} min={0} step={0.01} max={1} onChange={(event) => handleChange(event, phase)}>
              </input>
            </div>
          </div>
        ))}
        </div>
        <div className="w-10/12 py-2 flex justify-center items-center text-center">
          <div className="w-1/2">
            <div className="font-semibold">Total time:</div>
            <div className="pt-2">{formatTotalTime(hoursSet)}</div>
          </div>
          <div className="relative flex justify-center items-center w-1/2">
            <CountdownCircleTimer
              key={hoursSet}
              isPlaying={false}
              size="70"
              strokeWidth={10}
              duration={totalHours}
              initialRemainingTime={hoursSet}
              colors={[`${diffPercent > 0 ? '#78bf86' : 'red'}`]}
                trailColor={"#d9d9d980"}
            >
            </CountdownCircleTimer>
            <div className={`absolute font-semibold ${colorClass}`}>
              {`${((hoursSet / totalHours) * 100).toFixed(0)}%`}
            </div>
          </div>
        </div>
        <div className="h-[11vh] w-11/12 flex items-center">
          <Button text="Begin" onClick={confirmHours} classes="my-4 w-full" disabled={diffPercent.toFixed(0) < 0}/>
        </div>
    </div>
  )
}
export default TimeAllocationPage;