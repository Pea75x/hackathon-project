import React from 'react'
import { formatMinutesAndSeconds } from './utils/time'

function Warning({ warning, remainingTime }) {
  const warningType = {
    half: {
      class: "bg-red-100 border-red-400 text-red-700",
      text: `⏰ ${formatMinutesAndSeconds(remainingTime)} remaining!`
    }
  }
  return (
    <div className={`${warningType['half'].class} absolute top-15 border rounded-lg w-10/12 lg:w-1/4 h-[50px] flex justify-center items-center`}>
      {warningType['half'].text}
    </div>
  )
}

export default Warning;