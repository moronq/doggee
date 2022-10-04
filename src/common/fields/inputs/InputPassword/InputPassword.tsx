import React from 'react'

import inputStyles from '../Input.module.css'
import inputPasswordStyles from './InputPassword.module.css'

export const InputPassword: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isFocus, setIsFocus] = React.useState(!!props.value ?? false)
  const [showPassword, setShowPassword] = React.useState(false)
  const showPasswordToggle = !!props.value

  return (
    <>
      <div
        className={`${inputStyles.input_container} ${isError ? inputStyles.input_container : ''} ${
          isFocus ? inputStyles.focused : ''
        }`}
        onClick={() => {
          inputRef.current?.focus()
        }}
        onBlur={() => {
          return !props.value && setIsFocus(false)
        }}
      >
        <label htmlFor='inputPasword' className={`${inputStyles.input_label}`}>
          {label}
        </label>
        <input
          onFocus={() => setIsFocus(true)}
          ref={inputRef}
          id='inputPasword'
          className={inputStyles.input}
          {...props}
          type={showPasswordToggle && showPassword ? 'text' : 'password'}
        />
        {showPasswordToggle && (
          <button
            className={inputPasswordStyles.password_toggle_container}
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'>
              <path
                d='M24 31.5q3.55 0 6.025-2.475Q32.5 
      26.55 32.5 23q0-3.55-2.475-6.025Q27.55 
      14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 
      19.45 15.5 23q0 3.55 2.475 6.025Q20.45 
      31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 
      23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 
      1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 
      9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 
      8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 
      38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 
      23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 
      3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z'
              />
            </svg>
          </button>
        )}
      </div>
      {isError && helperText && <div className={inputStyles.helper_text}>{helperText}</div>}
    </>
  )
}
