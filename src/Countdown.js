import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import useSound from 'use-sound';
import countdownSound from './fonts/countdown.mp3'; 

function Countdown({ moveToNextTimer, goBack }) {
  const [playing, setPlaying] = React.useState(false)
  const [showBegin, setShowBegin] = React.useState(false)
  const [timerKey, setTimerKey] = React.useState(0)
  const [cantCancel, setCantCancel] = React.useState(false)
  const [playCountdown, { sound }] = useSound(countdownSound, { interrupt: true });

  function finishCountdown() {
    setCantCancel(true)
    setShowBegin(true)

    setTimeout(() => {
      moveToNextTimer()
    }, 2000)
  }

  function startCountdown() {
    if (playing) {
      sound.pause();
    } else {
      if (sound) {
        sound.play(); 
      } else {
        playCountdown(); 
      }
    }
    setPlaying(!playing);
  }

  function clickBack() {
    setPlaying(false)
    sound.pause()
    setTimerKey(prev => prev + 1)
    goBack()
  }

  return (
    <div className="h-full w-full md:w-[375px] m-auto bg-[#f8f4ec] flex justify-center items-center flex-col">
      <div className="flex items-center w-full justify-center my-6 relative">
        Ready to begin?
      </div>
      <div 
        className={`text-2xl font-semibold hover:scale-110 my-6 relative w-full text-center items-center flex-col flex ${cantCancel ? 'animate-pulse' : ''}`}
        onClick={startCountdown}>
        <CountdownCircleTimer
          key={timerKey}
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
      <div className="text-center">
        <div className="text-xs">Changed your mind?</div>
        <button className="text-gray-500 underline font-semibold" onClick={clickBack} disabled={cantCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default Countdown;