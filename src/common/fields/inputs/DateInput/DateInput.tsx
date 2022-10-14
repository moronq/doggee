import React from 'react'

import { Calendar } from '@common/Calendar'

import { Input, InputProps } from '../Input/Input'

import styles from './DateInput.module.css'

interface DateInputProps extends Omit<InputProps, 'value'> {
  value: string
}

export const DateInput: React.FC<DateInputProps> = ({ value, disabled, ...props }) => {
  const calendarContainerRef = React.useRef(null)

  const CalendarIcon = React.useCallback(
    () => (
      <button onClick={(e) => e.preventDefault()}>
        <div className={styles.calendar_icon} />
      </button>
    ),
    [disabled]
  )

  return (
    <div className={styles.date_input_container}>
      <Input
        disabled={disabled}
        availableChars={/^[0-9]+$/g}
        {...props}
        components={{
          indicator: () => <CalendarIcon />
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const birthDate = e.target.value
          const day = birthDate.substring(0, 2)
          const month = birthDate.substring(2, 4)
          const year = birthDate.substring(4, 8)
          console.log(day, month, year)
          // setFieldValues('birthDate', birthDate)
        }}
      />
      <div ref={calendarContainerRef} className={styles.calendar_container}>
        <Calendar />
      </div>
    </div>
  )
}
