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
  const [showPassword, setShowPassword] = React.useState(false)
  const showPasswordToggle = !!props.value

  return (
    <>
      <div
        aria-hidden='true'
        aria-disabled={props.disabled}
        className={`${inputStyles.input_container} ${isError ? inputStyles.input_container : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          className={inputStyles.input}
          {...props}
          type={showPasswordToggle && showPassword ? 'text' : 'password'}
        />
        <label htmlFor={props.id} className={`${inputStyles.input_label}`}>
          {label}
        </label>
        {showPasswordToggle && (
          <button
            className={inputPasswordStyles.password_toggle_container}
            onClick={() => setShowPassword(!showPassword)}
          >
            jfijds
          </button>
        )}
      </div>
      {isError && helperText && <div className={inputStyles.helper_text}>{helperText}</div>}
    </>
  )
}
