import React from 'react'

function Button({ text, onClick, disabled, classes }) {
  return (
    <button 
      className={`text-[#f8f4ec] hover:text-[#3b8d84] hover:border border-[#3b8d84] font-semibold p-3 rounded-lg hover:bg-[#f8f4ec] text-xl ${disabled ? 'bg-gray-200 text-gray-500' : 'bg-[#3b8d84]'} ${classes}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  )
}
export default Button