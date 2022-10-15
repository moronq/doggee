// import React from 'react'

// export const useCalendar = ({ locale = 'default', selectedDate: date }) => {
//   const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days')
//   const [selectedDate, setSelectedDate] = React.useState(createDate())
//   const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(selectedDate.monthIndex)
//   const [selectedYear, setSelectedYear] = React.useState(selectedDate.year)

//   const monthesNames = React.useMemo(() => getMonthesNames(locale), [])
//   const weekDaysNames = React.useMemo(() => getWeekDaysNames(2, locale), [])

//   const month = React.useMemo(
//     () => createMonth({ date: new Date(selectedDate.year, selectedMonthIndex), locale }),
//     [selectedMonthIndex]
//   )
//   const days = React.useMemo(() => month.createMonthDays(), [selectedMonthIndex])

//   const calendarDays = React.useMemo(() => {
//     const monthStartInDay = days[0].dayNumberInWeek - 1 > 0 ? days[0].dayNumberInWeek - 1 : 7
//     const monthEndsInDay =
//       days[days.length - 1].dayNumberInWeek - 1 > 0 ? days[days.length - 1].dayNumberInWeek - 1 : 7

//     const prevMonthSlice = createMonth({
//       date: new Date(selectedDate.year, selectedMonthIndex - 1),
//       locale
//     })
//       .createMonthDays()
//       .reverse()
//       .splice(0, monthStartInDay - 1)
//       .reverse()
//     const nextMonthSlice = createMonth({
//       date: new Date(selectedDate.year, selectedMonthIndex + 1),
//       locale
//     })
//       .createMonthDays()
//       .splice(0, 7 - monthEndsInDay)

//     return [...prevMonthSlice, ...days, ...nextMonthSlice]
//   }, [selectedMonthIndex])
//   return {}
// }
