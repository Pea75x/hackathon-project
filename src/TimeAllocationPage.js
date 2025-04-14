import React from 'react'
import Button from './Button'
import { formatTotalTime } from './utils/time'

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
  const diffPercent = ((totalHours - hoursSet) / totalHours) * 100;
  const colorClass = diffPercent > 0 ? 'text-green-500' : 'text-red-500'; 

  return (
    <div className="w-full lg:w-1/3 m-auto flex items-center flex-col justify-start">
        <div className="text-2xl h-[9vh] border-b w-10/12 justify-center flex items-center">
          <div>Allocated time</div>
        </div>
        <div className="h-[70vh] overflow-y-scroll w-full py-2">
        {allocatedTime.map((phase) => (
          <div key={phase.name} className="flex flex-col items-center">
            <label className="font-semibold">{phase.name}</label>
            <div className="text-xs">{formatTotalTime(phase.value * totalHours)}</div>
            <input type="range" className="rangeInput" value={phase.value} min={0} step={0.01} max={1} onChange={(event) => handleChange(event, phase)}>
            </input>
            <div className="w-1/3 text-gray-500 text-sm">{(phase.value * 100).toFixed(0)}%</div>
          </div>
        ))}
        </div>
        <div className="text-center h-[8vh] flex flex-col justify-center">
          <div>Total time: {formatTotalTime(hoursSet)}</div>
          {hoursSet.toFixed(2) !== totalHours?.toFixed(2) && (() => {
            return <div className={colorClass}>
              {`${diffPercent.toFixed(2) > 0 ? '+' : ''}${diffPercent.toFixed(0)}%`}
            </div>;
          })()}
        </div>
        <div className="h-[11vh] flex items-center">
          <Button text="Begin" onClick={confirmHours} className="m-4" disabled={diffPercent.toFixed(0) < 0}/>
        </div>
    </div>
  )
}
export default TimeAllocationPage;