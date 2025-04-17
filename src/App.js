
import React from 'react'
import StartingPage from './StartingPage'
import TimeAllocationPage from './TimeAllocationPage'
import { motion } from 'framer-motion';
import TimerPage from './TimerPage'
import CompletedPage from './CompletedPage'
import Countdown from'./Countdown'
import useSound from 'use-sound';
import notificationSound from './fonts/notification-alert.mp3'; 
import phases from './utils/phases.json'

function App() {
  const [page, setPage] = React.useState(0);
  const [totalHours, setTotalHours] = React.useState(5)
  const [playNotification] = useSound(notificationSound);
  const [allocatedTime, setAllocatedTime] = React.useState(phases);
  const [remainingTime, setRemainingTime] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  function moveToNextTimer(page) {
    setPage(page)
    playNotification()
  }

  // const saveProgress = (data) => {
  //   try {
  //     localStorage.setItem("timerAppProgress", JSON.stringify(data))
  //   } catch (e) {
  //     console.error("Failed to save progress:", e)
  //   }
  // }

  // React.useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     saveProgress({
  //       page,
  //       totalHours,
  //       allocatedTime,
  //       remainingTime,
  //       lastSaved: Date.now()
  //     })
  //   }
  //   window.addEventListener("beforeunload", handleBeforeUnload)
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  // }, [page, totalHours, allocatedTime])

  // const loadProgress = () => {
  //   try {
  //     const stored = localStorage.getItem("timerAppProgress")

  //     if (!stored) return null
  //     const data = JSON.parse(stored)

  //     // Optional: validate structure
  //     if (
  //       typeof data.page === "number" &&
  //       typeof data.totalHours === "number" &&
  //       typeof data.allocatedTime === "object"
  //     ) {
  //       return data
  //     }

  //     return null
  //   } catch (e) {
  //     console.error("Failed to load progress:", e)
  //     return null
  //   }
  // }

  // React.useEffect(() => {
  //   const saved = loadProgress()

  //   if (saved) {
  //     setPage(saved.page)
  //     setTotalHours(saved.totalHours)
  //     setAllocatedTime(saved.allocatedTime)
  //     setRemainingTime(saved.remainingTime)
  //     setIsPlaying(false)
  //   }
  // }, [])

  return (
    <div className="w-full h-screen overflow-hidden">
      <motion.div
        className="flex w-[1100vw] h-full"
        animate={{ x: `-${page * 100}vw` }}
        transition={{ type: 'spring', stiffness: 60 }}
      >
        <div className="w-full h-full">
          <StartingPage hours={totalHours} setHours={setTotalHours} onNext={() => setPage(1)} />
        </div>
        <div className="w-full h-full">
          <TimeAllocationPage totalHours={totalHours} allocatedTime={allocatedTime} setAllocatedTime={setAllocatedTime} confirmHours={() => setPage(2)}/>
        </div>
        <div className="w-full h-full">
          <Countdown moveToNextTimer={() => setPage(3)} goBack={() => setPage(0)}/>
        </div>
        {allocatedTime && allocatedTime.map((phase, index) => {
          const currentPage = index + 3;
          return (
            <div className="w-full h-full" key={phase.name}>
              {page === currentPage && (
                <TimerPage
                  allocatedTime={phase}
                  totalHours={totalHours}
                  index={index + 1}
                  moveToNextTimer={() => moveToNextTimer(currentPage + 1)}
                  goBack={() => setPage(0)}
                  remainingTime={remainingTime}
                  setRemainingTime={setRemainingTime}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              )}
            </div>
          );
        })}
        <div className="w-full h-[100%]">
          <CompletedPage />
        </div>
      </motion.div>
    </div>
  );
}

export default App;
