import React from 'react'

import { Calendar } from '@common/Calendar'
import { formatDate, MAX_LENGTH, useOnClickOutside } from '@utils'

import { Input, InputProps } from '../Input/Input'

import styles from './DateInput.module.css'

interface DateInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: Date
  locale?: string
  onChange: (date: Date) => void
}

const getDateStringFormat = (value: string) => {
  const date = value.replaceAll('.', '')
  const day = date.substring(0, 2)
  const month = date.substring(2, 4)
  const year = date.substring(4, 8)
  return { day, month, year }
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  disabled,
  locale = 'en-US',
  ...props
}) => {
  const inputValue = formatDate(value, 'DD.MM.YYYY')
  const calendarContainerRef = React.useRef(null)
  const [calendarActive, setCalendarActive] = React.useState(false)

  useOnClickOutside(calendarContainerRef, () => setCalendarActive(false))

  const CalendarIcon = React.useCallback(
    () => (
      <div
        aria-hidden
        onClick={(e) => {
          e.preventDefault()
          setCalendarActive(!calendarActive)
        }}
      >
        <div className={styles.calendar_icon} />
      </div>
    ),
    [disabled, calendarActive]
  )

  return (
    <div className={styles.date_input_container}>
      <Input
        value={inputValue}
        disabled={disabled}
        availableChars={/^[0-9.]+$/g}
        {...props}
        maxLength={MAX_LENGTH.DATE}
        components={{
          indicator: () => <CalendarIcon />
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const caretStart = event.target.selectionStart
          const isDeletedCharIsDot =
            caretStart &&
            event.target.value.length < inputValue.length &&
            inputValue[caretStart] === '.'

          const isAdditingCharIsDot =
            event.target.value.length > inputValue.length &&
            (event.target.value.replaceAll('.', '').length % 3 === 0 ||
              event.target.value.replaceAll('.', '').length % 5 === 0)

          const { year, month, day } = getDateStringFormat(
            isDeletedCharIsDot
              ? event.target.value.slice(0, caretStart - 1) + event.target.value.slice(caretStart)
              : event.target.value
          )

          props.onChange(new Date(+year, +month - 1, +day))

          const updateCaret = (caretStart: number) =>
            window.requestAnimationFrame(() => {
              event.target.selectionStart = caretStart
              event.target.selectionEnd = caretStart
            })

          if (isAdditingCharIsDot && !!caretStart) {
            return updateCaret(caretStart + 1)
          }

          if (isDeletedCharIsDot && !!caretStart) {
            return updateCaret(caretStart - 1)
          }

          updateCaret(caretStart ?? 0)
        }}
      />
      {calendarActive && (
        <div ref={calendarContainerRef} className={styles.calendar_container}>
          <Calendar locale={locale} selectDate={props.onChange} selectedDate={value} />
        </div>
      )}
    </div>
  )
}
