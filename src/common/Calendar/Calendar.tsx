import React from 'react'

import {
  checkDateIsEqual,
  checkIsCurrentMonth,
  checkIsCurrentYear,
  checkIsToday,
  createDate,
  createMonth,
  createYear,
  getMonthesNames,
  getMonthNumberOfDays,
  getWeekDaysNames
} from '@utils'

import styles from './Calendar.module.css'

interface CalendarProps {
  locale: string
  selectDate: (date: Date) => void
}

export const Calendar: React.FC<CalendarProps> = ({ locale, selectDate }) => {
  const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')
  const [selectedDate, setSelectedDate] = React.useState(createDate())
  const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(selectedDate.monthIndex)
  const [selectedYear, setSelectedYear] = React.useState(selectedDate.year)

  const decadeStarts = Math.floor(selectedYear / 10) * 10
  const decadeEnds = decadeStarts + 9

  const monthesNames = React.useMemo(() => getMonthesNames(locale, selectedYear), [selectedYear])
  const weekDaysNames = React.useMemo(() => getWeekDaysNames(2, locale), [])
  const decade = React.useMemo(() => {
    const decadesYears = new Array(10).fill(0).map((_, index) => ({
      year: decadeStarts + index,
      ghost: false
    }))
    return [
      { year: decadesYears[0].year - 1, ghost: true },
      ...decadesYears,
      { year: decadesYears[decadesYears.length - 1].year + 1, ghost: true }
    ]
  }, [decadeStarts])

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
    if (mode === 'years') {
      setSelectedYear(selectedYear - 10)
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
    if (mode === 'years') {
      setSelectedYear(selectedYear + 10)
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

  const switchStep = () => {
    if (mode === 'days') {
      setMode('monthes')
    }
    if (mode === 'monthes') {
      setMode('years')
    }
    if (mode === 'years') {
      setMode('days')
    }
  }

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>
        <div aria-hidden className={styles.calendar_header_arrow_left} onClick={moveLeft} />
        <div aria-hidden onClick={switchStep}>
          {mode === 'days' && month.monthName}
          {mode === 'monthes' && selectedYear}
          {mode === 'years' && `${decadeStarts} - ${decadeEnds}`}
        </div>
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
                  onClick={() => {
                    setSelectedDate(el)
                    selectDate(el.date)
                  }}
                  className={`${styles.calendar_day_container} ${
                    el.monthNumber !== selectedMonthIndex + 1 ? styles.calendar_ghost_item : ''
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
                className={`${styles.calendar_month_container} ${
                  checkIsCurrentMonth(month.monthIndex, selectedYear) &&
                  styles.calendar_today_container
                }`}
                key={month.monthIndex}
              >
                {month.monthShort}
              </div>
            ))}
          </div>
        )}
        {mode === 'years' && (
          <div className={styles.calendar_years_container}>
            {decade.map((year) => (
              <div
                aria-hidden
                onClick={() => {
                  setSelectedYear(year.year)
                  setMode('monthes')
                }}
                key={year.year}
                className={`${styles.calendar_year_container} ${
                  year.ghost && styles.calendar_ghost_item
                } ${checkIsCurrentYear(year.year) && styles.calendar_today_container}`}
              >
                {year.year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
