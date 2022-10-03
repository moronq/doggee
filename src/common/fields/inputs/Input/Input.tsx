import React from 'react'

import './Input.css'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  isError?: boolean
  helperText?: string
}

export const Input: React.FC<InputProps> = ({ isError = false, helperText, ...props }) => {
  const className = isError ? 'input_error' : ''
  return (
    <div>
      <input className={className} {...props} />
      {isError && helperText && <div className='input_helper_text'>{helperText}</div>}
    </div>
  )
}
