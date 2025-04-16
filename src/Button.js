import React from 'react'

function Button({ text, onClick, disabled, classes, buttonType}) {
  const buttonStyle = {
    classic: {
      background: "[#3b8d84]",
      text: "[#f8f4ec]",
      border: "[#f8f4ec]",
      hoverBackground: "[#f8f4ec]",
      hoverText: "[#3b8d84]",
      hoverBorder: "[#3b8d84]"
    },
    disabled: {
      background: "gray-200",
      text: "gray-500",
      border: "none",
      hoverBackground: "gray-200",
      hoverText: "grey-500",
      hoverBorder: "none"
    },
    inverted: {
      background: "[#f8f4ec]",
      text: "[#3b8d84]",
      border: "[#3b8d84]",
      hoverBackground: "[#3b8d84]",
      hoverText: "[#f8f4ec]",
      hoverBorder: "[#f8f4ec]"
    }
  }

  return (
    <button 
      className={`text-${buttonStyle[buttonType].text} hover:text-${buttonStyle[buttonType].hoverText} border border-${buttonStyle[buttonType].border} hover:border-${buttonStyle[buttonType].hoverBorder} font-semibold p-3 rounded-lg bg-${buttonStyle[buttonType].background} hover:bg-${buttonStyle[buttonType].hoverBackground} text-xl ${classes}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  )
}
export default Button