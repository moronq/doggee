import { checkIsLeapYear } from './checkIsLeapYear'

export const getMonthNumberOfDays = (
  monthIndex: number,
  year: number = new Date().getFullYear()
): number => {
  const monthSizes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const isFebruary = monthIndex === 1
  return isFebruary && checkIsLeapYear(year) ? monthSizes[monthIndex] + 1 : monthSizes[monthIndex]
}
