import React from 'react'

import { createMonth, createYear, getMonthesNames, getWeekDaysNames } from '@utils'

import styles from './Calendar.module.css'

const locale = 'en-US'

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const monthesNames = React.useMemo(() => getMonthesNames(), [])
  const year = React.useMemo(
    () =>
      createYear({ monthNumber: selectedDate.getMonth() + 1, year: selectedDate.getFullYear() }),
    []
  )
  const month = React.useMemo(() => createMonth({ date: selectedDate, locale }), [])
  const days = React.useMemo(() => month.createMonthDays(), [])

  const weekDaysNames = React.useMemo(() => getWeekDaysNames(2, locale), [])
  const monthes = React.useMemo(() => year.createYearMonthes(), [year])

  console.log(weekDaysNames)

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>
        <div className={styles.calendar_header_arrow_left} />
        <div>{month.monthName}</div>
        <div className={styles.calendar_header_arrow_right} />
      </div>
      <div className={styles.calendar_picker_container}>
        <div className={styles.calendar_week_days_container}>
          {weekDaysNames.map((el) => (
            <div key={el.dayShort}>{el.dayShort}</div>
          ))}
        </div>
        <div className={styles.calendar_days_container}>
          {days.map((el) => (
            <div className={styles.calendar_day_container} key={el.dayNumber}>
              {el.dayNumber}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
