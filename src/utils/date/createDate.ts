import { getWeekNumber } from './getWeekNumber'

interface CreateDateParams {
  date?: Date
  locale?: string
}

export const createDate = (params?: CreateDateParams) => {
  const locale = params?.locale ?? 'default'

  const d = params?.date ?? new Date()
  const dayNumber = d.getDate() // day of month
  const day = d.toLocaleString(locale, { weekday: 'long' }) // day of a week. example: "Friday"
  const dayNumberInWeek = d.getDay() + 1 // number of the day in a week
  const dayShort = d.toLocaleString(locale, { weekday: 'short' }) // day of a week. example: "Fr"
  const year = d.getFullYear() // 2022
  const yearShort = d.toLocaleString(locale, { year: '2-digit' }) // 22
  const month = d.toLocaleString(locale, { month: 'long' }) // October
  const monthShort = d.toLocaleString(locale, { month: 'short' }) // Oct
  const monthNumber = d.getMonth() + 1 // 10
  const monthIndex = d.getMonth() // 9
  const timestamp = d.getTime() // 1665697321423
  const week = getWeekNumber(d)

  return {
    date: d,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week
  }
}
