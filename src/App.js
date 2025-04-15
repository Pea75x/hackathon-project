
import React from 'react'
import StartingPage from './StartingPage'
import TimeAllocationPage from './TimeAllocationPage'
import { motion } from 'framer-motion';
import TimerPage from './TimerPage'
import CompletedPage from './CompletedPage'
import Countdown from'./Countdown'

function App() {
  const [page, setPage] = React.useState(0);
  const [totalHours, setTotalHours] = React.useState(5)
  const phases = [
    {
      icon: "❤️",
      name: "Empathise",
      value: 1 / 7,
      info: "Research Your Users' Needs"
    }, 
    {
      icon: "🎯",
      name: "Define",
      value: 1 / 7,
      info: "State Your Users' Needs and Problems"
    },
    {
      icon: "💡",
      name: "Ideate",
      value: 1 / 7,
      info: "Challenge Assumptions and Create Ideas"
    },
    {
      icon: "🛠️",
      name: "Prototype",
      value: 1 / 7,
      info: "Start to Create Solutions"
    },
    {
      icon: "❓",
      name: "Test",
      value: 1 / 7,
      info: "Try Your Solutions Out"
    },
    {
      icon: "📃",
      name: "Submission",
      value: 1 / 7,
      info: "Demonstrate your understanding of the process and the rationale behind your design choices"
    },
    {
      icon: "🗣️",
      name: "Practice",
      value: 1 / 7,
      info: "Rehearse your presentation"
    }
  ];

  const [allocatedTime, setAllocatedTime] = React.useState(phases);

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
          <Countdown moveToNextTimer={() => setPage(3)}/>
        </div>
        {allocatedTime && allocatedTime.map((phase, index) => {
          const currentPage = index + 3;
          return (
            <div className="w-full h-full" key={phase.name}>
              {page === currentPage && (
                <TimerPage
                  allocatedTime={phase}
                  totalHours={totalHours}
                  moveToNextTimer={() => setPage(currentPage + 1)}
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
