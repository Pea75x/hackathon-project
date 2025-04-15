import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function Countdown({ moveToNextTimer }) {
  const [playing, setPlaying] = React.useState(false)
  const [showBegin, setShowBegin] = React.useState(false)
  const [isPulsing, setIsPulsing] = React.useState(false)
  
  function finishCountdown() {
    setShowBegin(true)
    setIsPulsing(true)

    setTimeout(() => {
      setIsPulsing(false)
      moveToNextTimer()
    }, 2000)
  }

  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <div className="flex items-center w-full justify-center my-6 relative">
        Ready to begin?
      </div>
      <div 
        className={`my-6 relative w-full text-center items-center flex-col flex ${isPulsing ? 'animate-pulse' : ''}`}
        onClick={() => setPlaying(!playing)}>
        <CountdownCircleTimer
          isPlaying={playing}
          duration={3}
          colors={['#68a4ac', '#ffbca4', '#A30000', '#A30000']}
          onComplete={() => {
            finishCountdown()
          }}
        >
          {({ remainingTime }) => {
            if (showBegin) return 'BEGIN'
            return playing ? remainingTime : "Start"}
            }
        </CountdownCircleTimer>
      </div>
    </div>
  )
}

export default Countdown;