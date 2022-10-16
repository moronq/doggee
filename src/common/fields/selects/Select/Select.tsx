import React from 'react'

import { formatDate, MAX_LENGTH, useOnClickOutside } from '@utils'

import { Input, InputProps } from '../../inputs/Input/Input'

import styles from './Select.module.css'

const options = [
  { label: 'Apple', value: 'Apple', option: 'Apple' },
  { label: 'orange', value: 'orange', option: 'orange' },
  { label: 'qiwi', value: 'qiwi', option: 'qiwi' }
]

interface Option {
  label: string
  value: string | number
  option: $TSFixMe
}

interface SelectProps extends Omit<InputProps, 'value' | 'onChange'> {
  option?: Option
  locale?: string
  onChange: (date: Date) => void
}

export const Select: React.FC<SelectProps> = ({
  option,
  disabled,
  isError,
  locale = 'en-US',
  ...props
}) => {
  const selectContainerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [showOptions, setShowOptions] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(option?.label ?? '')

  useOnClickOutside(selectContainerRef, () => setShowOptions(false))

  const SelectIcon = React.useCallback(
    () => (
      <div aria-hidden role='button' onClick={() => !disabled && setShowOptions(!showOptions)}>
        <div
          className={styles.select_icon}
          style={{ transform: !showOptions ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>
    ),
    [disabled, showOptions]
  )

  return (
    <div
      aria-hidden
      className={styles.date_input_container}
      ref={selectContainerRef}
      onClick={() => {
        setShowOptions(true)
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }}
    >
      <div className={styles.field_container}>
        <div
          aria-hidden='true'
          aria-disabled={disabled}
          className={`${styles.input_container} ${isError ? styles.input_error : ''}`}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            className={styles.input}
            {...props}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target
              setInputValue(value)
            }}
          />
          <label htmlFor={props.id} className={`${styles.input_label}`}>
            {props.label}
          </label>
        </div>
        <div className={styles.input_indicator}>
          <SelectIcon />
        </div>
      </div>
      {/* <Input
        value={inputValue}
        disabled={disabled}
        {...props}
        components={{
          indicator: () => <SelectIcon />
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target
          setInputValue(value)
        }}
      /> */}
      {showOptions && (
        <ul className={styles.options_container}>
          {options
            .filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
            .map((option) => (
              <li className={styles.option_container} key={option.value}>
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
