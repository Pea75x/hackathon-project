import React from 'react'
import Button from './Button'

function Modal({ text, onConfirm, onCancel }) {
  return (
    <div className="z-60 shadow-md absolute w-11/12 h-[200px] rounded-xl flex justify-center items-center flex-col bg-[#3b8d84]">
      <div className="text-[#f8f4ec] text-md py-6">{text}</div>
      <div>
        <Button text="Confirm" onClick={onConfirm} buttonType="inverted" classes="mr-1"/>
        <Button text="Cancel" onClick={onCancel} buttonType="classic" classes="ml-1"/>
      </div>
    </div>
  )
}
export default Modal;