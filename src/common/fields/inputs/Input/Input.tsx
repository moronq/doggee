import React from 'react'

import styles from '../Input.module.css'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string
  isError?: boolean
  helperText?: string
  availableChars?: RegExp
  components?: {
    indicator?: () => React.ReactElement
  }
}

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  availableChars,
  onChange,
  components,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      <div className={styles.field_container}>
        <div
          aria-hidden='true'
          aria-disabled={props.disabled}
          className={`${styles.input_container} ${isError ? styles.input_error : ''}`}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            className={styles.input}
            {...props}
            onChange={(e) => {
              if (!!onChange && !e.target.value) return onChange(e)
              if (!onChange || (availableChars && !availableChars.test(e.target.value)))
                // @ts-ignore
                return onChange({ ...e, target: { ...e.target, value: props.value } })
              onChange(e)
            }}
          />
          <label htmlFor={props.id} className={`${styles.input_label}`}>
            {label}
          </label>
        </div>
        {components?.indicator && (
          <div className={styles.input_indicator}>{components.indicator()}</div>
        )}
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  )
}
