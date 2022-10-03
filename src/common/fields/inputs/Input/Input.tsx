import React from 'react'

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return <input {...props} />
}
