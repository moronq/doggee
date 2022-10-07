import React from 'react'

import styles from '../Input.module.css'

export const Input: React.FC<InputProps> = ({ isError = false, helperText, label, ...props }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      <div
        className={`${styles.input_container} ${isError ? styles.input_container : ''}`}
        onClick={() => inputRef.current?.focus()}
      >
        <input ref={inputRef} id='input' className={styles.input} {...props} />
        <label htmlFor='input' className={`${styles.input_label}`}>
          {label}
        </label>
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  )
}
