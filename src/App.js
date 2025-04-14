
import React from 'react'
import StartingPage from './StartingPage'
import TimeAllocationPage from './TimeAllocationPage'
import { motion } from 'framer-motion';
import TimerPage from './TimerPage'

function App() {
  const [page, setPage] = React.useState(0);
  const [totalHours, setTotalHours] = React.useState(5)
  const phases = [
    {
      name: "❤️ Empathise",
      value: 1 / 7,
      info: "Research Your Users' Needs"
    }, 
    {
      name: "🎯 Define",
      value: 1 / 7,
      info: "State Your Users' Needs and Problems"
    },
    {
      name: "💡 Ideate",
      value: 1 / 7,
      info: "Challenge Assumptions and Create Ideas"
    },
    {
      name: "🛠️ Prototype",
      value: 1 / 7,
      info: "Start to Create Solutions"
    },
    {
      name: "❓ Test",
      value: 1 / 7,
      info: "Try Your Solutions Out"
    },
    {
      name: "📃 Submission",
      value: 1 / 7,
      info: "Demonstrate your understanding of the process and the rationale behind your design choices"
    },
    {
      name: "🗣️ Practice",
      value: 1 / 7,
      info: "Rehearse your presentation"
    }
  ];

  const [allocatedTime, setAllocatedTime] = React.useState(phases);

  return (
    <div className="w-full h-screen">
      <motion.div
        className="flex w-[900vw] h-screen"
        animate={{ x: `-${page * 100}vw` }}
        transition={{ type: 'spring', stiffness: 60 }}
      >
        <div className="w-full h-screen">
          <StartingPage hours={totalHours} setHours={setTotalHours} onNext={() => setPage(1)} />
        </div>
        <div className="w-full h-[100%]">
          <TimeAllocationPage totalHours={totalHours} allocatedTime={allocatedTime} setAllocatedTime={setAllocatedTime} confirmHours={() => setPage(2)}/>
        </div>
        {allocatedTime && allocatedTime.map((phase, index) => {
          const currentPage = index + 2;
          return (
            <div className="w-full h-screen" key={phase.name}>
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
      </motion.div>
    </div>
  );
}

export default App;
