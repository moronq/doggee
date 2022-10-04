import React from 'react'

import styles from '../Input.module.css'

export const Input: React.FC<InputProps> = ({ isError = false, helperText, label, ...props }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isFocus, setIsFocus] = React.useState(!!props.value ?? false)

  return (
    <>
      <div
        className={`${styles.input_container} ${isError ? styles.input_container : ''} ${
          isFocus ? styles.focused : ''
        }`}
        onClick={() => {
          inputRef.current?.focus()
        }}
        onBlur={() => {
          return !props.value && setIsFocus(false)
        }}
      >
        <label htmlFor='input' className={`${styles.input_label}`}>
          {label}
        </label>
        <input
          onFocus={() => setIsFocus(true)}
          ref={inputRef}
          id='input'
          className={styles.input}
          {...props}
        />
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  )
}
