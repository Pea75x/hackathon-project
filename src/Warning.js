import React from 'react'
import { formatMinutesAndSeconds } from './utils/time'

function Warning({ warning, remainingTime }) {
  const warningType = {
    half: {
      class: "bg-green-100 border-green-400 text-green-700",
      text: `⏰ half way there!`
    },
    thirty: {
      class: "bg-amber-100 border-amber-400 text-amber-700",
      text: `⏰ 30 minutes left!`
    },
    five: {
      class: "bg-red-100 border-red-400 text-red-700",
      text: `⏰ ${formatMinutesAndSeconds(remainingTime)} remaining!`
    }
  }
  return (
    <div className={`${warningType[warning].class} absolute border rounded-lg w-10/12 h-[50px] flex justify-center items-center`}>
      {warningType[warning].text}
    </div>
  )
}

export default Warning;