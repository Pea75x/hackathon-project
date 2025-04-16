
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

  function moveToNextTimer(page) {
    setPage(page)
    playNotification()
  }

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
          <Countdown moveToNextTimer={() => setPage(3)} goBack={() => setPage(1)}/>
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
                  goBack={() => setPage(1)}
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
