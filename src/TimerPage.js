import React from 'react'
import { formatMinutesAndSeconds } from './utils/time'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import information from './information.png'
import Warning from './Warning'

function TimerPage({allocatedTime, totalHours, moveToNextTimer}) {
  const [duration, setDuration] = React.useState(0);
  const [remainingTime, setRemainingTime] = React.useState(null);
  const [showWarning, setShowWarning] = React.useState(false)

  React.useEffect(() => {
    if (allocatedTime && totalHours) {
      const seconds = allocatedTime.value * totalHours * 60 * 60;
      setDuration(seconds);
    }
  }, [allocatedTime, totalHours])

  React.useEffect(() => {
    if (remainingTime === null) return;

    if (remainingTime < ((allocatedTime / 2) - 5) && remainingTime > ((allocatedTime / 2) + 5)) {
      setShowWarning("half")
    } else if (remainingTime < 300 && remainingTime > 0 && !showWarning) {
      setShowWarning("five")
    } else if (remainingTime > 1800 && remainingTime < 1860 && !showWarning) {
      setShowWarning("thirty")
    } else {
      setShowWarning && setShowWarning(false)
    }
  }, [remainingTime])
  
  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <div className="flex items-center w-full justify-center my-6 relative">
        <div className="text-3xl mx-4 my-4">{allocatedTime.name}</div>
        <div className="group">
          <img src={information} width="20px" className=""/>
          <div className="absolute my-3 w-full left-0 flex justify-center text-center opacity-0 group-hover:opacity-100">
            <div className="lg:w-1/3">{allocatedTime.info}</div>
          </div>
        </div>
      </div>
      <div className="my-6 relative w-full text-center items-center flex-col flex">
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          colors={['#68a4ac', '#ffbca4', '#A30000', '#A30000']}
          colorsTime={[duration * 0.75, duration * 0.5, duration * 0.25, 0]}
          onComplete={() => {
            moveToNextTimer()
          }}
        >
          {({ remainingTime }) => {
            setRemainingTime(remainingTime)
            return formatMinutesAndSeconds(remainingTime)}
            }
        </CountdownCircleTimer>
        {showWarning && <Warning warning={showWarning} remainingTime={remainingTime}/>}
      </div>
    </div>
  )
}

export default TimerPage;