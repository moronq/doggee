import React from 'react'

import { createDate, createMonth, getMonthesNames, getWeekDaysNames } from '@utils'

interface UseCalendarProps {
  locale?: string
}

export const useCalendar = ({ locale = 'default' }: UseCalendarProps) => {
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
  return {
    state: {
      mode,
      weekDaysNames,
      calendarDays,
      decade,
      selectedYear,
      monthesNames,
      month,
      decadeEnds,
      decadeStarts,
      selectedMonthIndex,
      selectedDate
    },
    functions: {
      setMode,
      setSelectedYear,
      setSelectedDate,
      setSelectedMonthIndex,
      switchStep,
      moveLeft,
      moveRight
    }
  }
}
