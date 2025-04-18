import React from 'react'
import { formatMinutesAndSeconds } from './utils/time'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import information from './information.png'
import Warning from './Warning'
import Button from './Button'
import logo from './logo.png'
import Modal from './Modal'

function TimerPage({allocatedTime, totalHours, moveToNextTimer, index, goBack, remainingTime, setRemainingTime, isPlaying, setIsPlaying}) {
  const [duration, setDuration] = React.useState(0);
  const [showWarning, setShowWarning] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (allocatedTime && totalHours) {
      const seconds = allocatedTime.value * totalHours * 60 * 60;
      setDuration(seconds);
    }
  }, [allocatedTime, totalHours])

  React.useEffect(() => {
    if (remainingTime === null) return;

    if (remainingTime < 300) {
      (showWarning !== "five") && setShowWarning("five");
    } else if (remainingTime > ((duration / 2).toFixed(0) - 5) && remainingTime < (parseFloat(duration).toFixed(0) / 2) + 5) {
      (showWarning !== "half") && setShowWarning("half")
    } else if (remainingTime > 1800 && remainingTime < 1860) {
      (showWarning !== "thirty") && setShowWarning("thirty")
    } else {
      showWarning && setShowWarning(false)
    }
  }, [remainingTime, showWarning, duration])
  
  const curve = (i) => {
    const center = 3;
    return Math.round(Math.cos((i - center) * (Math.PI / 6)) * 10);
  };

  function toggleModal(play) {
    setIsPlaying(play)
    setModalOpen(!modalOpen)
  }

  function cancel() { 
    setIsPlaying(true)
    goBack()
  }

  return (
    <div className="h-full w-full md:w-[375px] m-auto flex justify-around items-center flex-col bg-[#f8f4ec] relative">
      <img src={logo} alt="hacktrack-logo" width="80%" className="pt-2"/>
      <div className="flex flex-col items-center w-full justify-start relative text-[#ed5b2c] text-center">
        <div className="flex justify-center">
          <div className="text-4xl">{allocatedTime.name}</div>
          <div className="group">
            <img src={information} width="40px" alt="information" className="ml-2"/> 
            <div className="left-4 top-35 flex flex-col text-[#ffcc6c] border border-[#ffcc6c] text-sm bg-white absolute shadow-lg py-2 rounded-md mt-1 w-11/12 opacity-0 text-center group-hover:opacity-100 z-50">
              {allocatedTime.tasks && allocatedTime.tasks.map((task) => (
                <div key={task} className="py-2 font-semibold">
                  {task}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="font-semibold text-[#ffcc6c] mt-2">{allocatedTime.info}</div>
        <div className="text-sm py-2">{allocatedTime.moreInfo}</div>
      </div>
      <div className="text-[#ed5b2c] w-11/12 text-center">
          
      </div>
      <div className="my-6 w-full text-center items-center justify-center flex">
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={duration}
          colors={['#3b8d84']}
          onComplete={() => {
            moveToNextTimer()
          }}
        >
          {({ remainingTime }) => {
            setRemainingTime(remainingTime)
            return formatMinutesAndSeconds(remainingTime)}
            }
        </CountdownCircleTimer>
        <div>
          <div className="pb-1 font-semibold text-[#ffcc6c]">Stages</div>
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`pl-${curve(i)} ${i + 1 === index && "font-semibold"}`}>{i + 1 === index ? allocatedTime.name : i + 1}</div>
          ))}
        </div>
      </div>
      {showWarning && <Warning warning={showWarning} remainingTime={remainingTime}/>}
      <div className="my-4 w-full text-center">
        <Button 
          text={isPlaying ? "Pause" : "Resume"} 
          onClick={() => setIsPlaying(prev => !prev)}
          classes="w-5/12 mr-2"
          buttonType="classic"
        />
        <Button 
          text="Cancel" 
          onClick={() => toggleModal(false)} 
          classes="w-5/12 ml-2"
          buttonType="inverted"
        />
      </div>
      {modalOpen && <Modal text="Are you sure you want cancel?" onConfirm={cancel} onCancel={() =>toggleModal(true)} />}
    </div>
  )
}

export default TimerPage;