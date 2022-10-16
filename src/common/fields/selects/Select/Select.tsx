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
  onChange: (option: Option['option']) => void
}

export const Select: React.FC<SelectProps> = ({
  option,
  disabled,
  onChange,
  isError,
  locale = 'en-US',
  ...props
}) => {
  const selectContainerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const [showOptions, setShowOptions] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(
    options.findIndex((o) => o.value === option?.value) === -1
      ? 0
      : options.findIndex((o) => o.value === option?.value)
  )

  useOnClickOutside(selectContainerRef, () => {
    setInputValue('')
    setShowOptions(false)
  })

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

  React.useEffect(() => {
    if (showOptions && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showOptions])

  return (
    <div
      aria-hidden
      className={styles.date_input_container}
      ref={selectContainerRef}
      onClick={() => {
        setShowOptions(true)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          if (focusedOptionIndex === options.length - 1) {
            return setFocusedOptionIndex(0)
          }
          setFocusedOptionIndex(focusedOptionIndex + 1)
        }
        if (e.key === 'ArrowUp') {
          if (focusedOptionIndex === 0) {
            return setFocusedOptionIndex(options.length - 1)
          }
          setFocusedOptionIndex(focusedOptionIndex - 1)
        }
        if (e.key === 'Enter') {
          const option = options.find((_, index) => focusedOptionIndex === index)
          if (option) onChange(option.option)
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
          {showOptions && (
            <input
              ref={inputRef}
              className={styles.input}
              {...props}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target
                setInputValue(value)
              }}
            />
          )}

          <label htmlFor={props.id} className={`${styles.input_label}`}>
            {props.label}
          </label>
        </div>
        <div className={styles.input_indicator}>
          <SelectIcon />
        </div>
      </div>

      {showOptions && (
        <ul className={styles.options_container}>
          {options
            .filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
            .map(({ label, option: op, value }, index) => {
              const isSelected = op === option?.value
              const isFocused = index === focusedOptionIndex
              return (
                <li
                  aria-hidden
                  className={`${styles.option_container} ${
                    isSelected ? styles.selected_option_container : ''
                  } ${isFocused ? styles.focused_option_container : ''}`}
                  key={value}
                  onClick={() => {
                    onChange(op)
                  }}
                >
                  {label}
                </li>
              )
            })}
        </ul>
      )}
    </div>
  )
}
