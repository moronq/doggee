import React from 'react'

import {
  checkDateIsEqual,
  checkIsToday,
  createDate,
  createMonth,
  createYear,
  getMonthesNames,
  getMonthNumberOfDays,
  getWeekDaysNames
} from '@utils'

import styles from './Calendar.module.css'

const locale = 'en-US'

export const Calendar = () => {
  const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')
  const [selectedDate, setSelectedDate] = React.useState(createDate())
  const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(selectedDate.monthIndex)
  const [selectedYear, setSelectedYear] = React.useState(selectedDate.year)

  const monthesNames = React.useMemo(() => getMonthesNames(locale, selectedYear), [selectedYear])
  const weekDaysNames = React.useMemo(() => getWeekDaysNames(2, locale), [])

  const month = React.useMemo(
    () => createMonth({ date: new Date(selectedYear, selectedMonthIndex), locale }),
    [selectedMonthIndex, selectedYear]
  )

  const days = React.useMemo(() => month.createMonthDays(), [selectedMonthIndex, selectedYear])

  const moveLeft = () => {
    if (mode === 'days') {
      setSelectedMonthIndex(
        selectedMonthIndex - 1 < 0 ? selectedMonthIndex + 11 : selectedMonthIndex - 1
      )
    }
    if (mode === 'monthes') {
      setSelectedYear(selectedYear - 1)
    }
  }
  const moveRight = () => {
    if (mode === 'days') {
      setSelectedMonthIndex(
        selectedMonthIndex + 1 > 11 ? 11 - selectedMonthIndex : selectedMonthIndex + 1
      )
    }
    if (mode === 'monthes') {
      setSelectedYear(selectedYear + 1)
    }
  }

  const calendarDays = React.useMemo(() => {
    const monthStartInDay = days[0].dayNumberInWeek - 1 > 0 ? days[0].dayNumberInWeek - 1 : 7
    const monthEndsInDay =
      days[days.length - 1].dayNumberInWeek - 1 > 0 ? days[days.length - 1].dayNumberInWeek - 1 : 7

    const prevMonthSlice = createMonth({
      date: new Date(selectedDate.year, selectedMonthIndex - 1),
      locale
    })
      .createMonthDays()
      .reverse()
      .splice(0, monthStartInDay - 1)
      .reverse()
    const nextMonthSlice = createMonth({
      date: new Date(selectedDate.year, selectedMonthIndex + 1),
      locale
    })
      .createMonthDays()
      .splice(0, 7 - monthEndsInDay)

    return [...prevMonthSlice, ...days, ...nextMonthSlice]
  }, [selectedMonthIndex, selectedYear])

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>
        <div aria-hidden className={styles.calendar_header_arrow_left} onClick={moveLeft} />
        {mode === 'days' && (
          <div aria-hidden onClick={() => setMode('monthes')}>
            {month.monthName}
          </div>
        )}
        {mode === 'monthes' && (
          <div aria-hidden onClick={() => setMode('years')}>
            {selectedYear}
          </div>
        )}

        <div aria-hidden className={styles.calendar_header_arrow_right} onClick={moveRight} />
      </div>
      <div className={styles.calendar_picker_container}>
        {mode === 'days' && (
          <>
            <div className={styles.calendar_week_days_container}>
              {weekDaysNames.map((el) => (
                <div key={el.dayShort}>{el.dayShort}</div>
              ))}
            </div>
            <div className={styles.calendar_days_container}>
              {calendarDays.map((el) => (
                <div
                  aria-hidden
                  onClick={() => setSelectedDate(el)}
                  className={`${styles.calendar_day_container} ${
                    el.monthNumber !== selectedMonthIndex + 1 ? styles.calendar_ghost_day : ''
                  } ${
                    checkDateIsEqual(el.date, selectedDate.date) &&
                    styles.calendar_selected_day_container
                  }
              ${checkIsToday(el.date) && styles.calendar_today_container}`}
                  key={el.timestamp}
                >
                  {el.dayNumber}
                </div>
              ))}
            </div>
          </>
        )}
        {mode === 'monthes' && (
          <div className={styles.calendar_monthes_container}>
            {monthesNames.map((month) => (
              <div
                aria-hidden
                onClick={() => {
                  setSelectedMonthIndex(month.monthIndex)
                  setMode('days')
                }}
                className={styles.calendar_month_container}
                key={month.monthIndex}
              >
                {month.monthShort}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
