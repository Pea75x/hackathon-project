import React from 'react'

function Button({ text, onClick, disabled, classes }) {
  return (
    <button 
      className={`p-3 border rounded-lg hover:bg-white text-xl ${disabled ? 'bg-gray-200 text-gray-500' : 'bg-[#68a4ac]'} ${classes}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  )
}
export default Button