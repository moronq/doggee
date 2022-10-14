import React from 'react'

import type { InputProps } from '../Input/Input'
import { Input } from '../Input/Input'

import styles from './InputPassword.module.css'

type InputPasswordProps = InputProps

export const InputPassword: React.FC<InputPasswordProps> = ({ value, disabled, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const showPasswordToggle = value

  const EyeIcon = React.useCallback(
    () => (
      <button
        onClick={(e) => {
          e.preventDefault()
          setShowPassword(!showPassword)
        }}
      >
        <div className={showPassword ? styles.password_hide_icon : styles.password_show_icon} />
      </button>
    ),
    [showPassword, disabled]
  )

  return (
    <Input
      availableChars={/^[a-zA-Z0-9!;,.]+$/g}
      type={showPassword ? 'text' : 'password'}
      value={value}
      disabled={disabled}
      {...(showPasswordToggle && {
        components: {
          indicator: EyeIcon
        }
      })}
      {...props}
    />
  )
}
