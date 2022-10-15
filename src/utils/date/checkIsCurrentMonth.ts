export const checkIsCurrentMonth = (month: number, year: number) => {
  const date = new Date()
  const currentMonthIndex = date.getMonth()
  const currentYear = date.getFullYear()
  return currentMonthIndex === month && currentYear === year
}
