import React from 'react'

import { checkDateIsEqual, checkIsCurrentMonth, checkIsCurrentYear, checkIsToday } from '@utils'

import { useCalendar } from './hooks'

import styles from './Calendar.module.css'

interface CalendarProps {
  locale: string
  selectDate: (date: Date) => void
  selectedDate: Date
}

export const Calendar: React.FC<CalendarProps> = ({ locale, selectDate, selectedDate }) => {
  const { state, functions } = useCalendar({ locale, selectedDate })

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>
        <div
          aria-hidden
          className={styles.calendar_header_arrow_left}
          onClick={functions.moveLeft}
        />
        <div aria-hidden onClick={functions.switchStep}>
          {state.mode === 'days' && state.month.monthName}
          {state.mode === 'monthes' && state.selectedYear}
          {state.mode === 'years' && `${state.decadeStarts} - ${state.decadeEnds}`}
        </div>
        <div
          aria-hidden
          className={styles.calendar_header_arrow_right}
          onClick={functions.moveRight}
        />
      </div>
      <div className={styles.calendar_picker_container}>
        {state.mode === 'days' && (
          <>
            <div className={styles.calendar_week_days_container}>
              {state.weekDaysNames.map((el) => (
                <div key={el.dayShort}>{el.dayShort}</div>
              ))}
            </div>
            <div className={styles.calendar_days_container}>
              {state.calendarDays.map((el) => (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedDate(el)
                    selectDate(el.date)
                  }}
                  className={`${styles.calendar_day_container} ${
                    el.monthNumber !== state.selectedMonthIndex + 1
                      ? styles.calendar_ghost_item
                      : ''
                  } ${
                    checkDateIsEqual(el.date, state.selectedDate.date) &&
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
        {state.mode === 'monthes' && (
          <div className={styles.calendar_monthes_container}>
            {state.monthesNames.map((month) => (
              <div
                aria-hidden
                onClick={() => {
                  functions.setSelectedMonthIndex(month.monthIndex)
                  functions.setMode('days')
                }}
                className={`${styles.calendar_month_container} ${
                  checkIsCurrentMonth(month.monthIndex, state.selectedYear) &&
                  styles.calendar_today_container
                }`}
                key={month.monthIndex}
              >
                {month.monthShort}
              </div>
            ))}
          </div>
        )}
        {state.mode === 'years' && (
          <div className={styles.calendar_years_container}>
            {state.decade.map((year) => (
              <div
                aria-hidden
                onClick={() => {
                  functions.setSelectedYear(year.year)
                  functions.setMode('monthes')
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
