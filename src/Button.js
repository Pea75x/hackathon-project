import React from 'react'

function Button({ text, onClick, disabled }) {
  React.useEffect(() => {
    console.log(disabled)
  }, [disabled])
  return (
    <button 
      className={`p-3 border rounded-lg hover:bg-white text-xl ${disabled ? 'bg-gray-200 text-gray-500' : 'bg-[#68a4ac]'}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  )
}
export default Button