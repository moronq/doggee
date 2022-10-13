export const getWeekNumber = (date: Date) => {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1) // obj [1 jan 2022]
  const pastDaysOfYear = (date.getTime() - firstDayOfTheYear.getTime()) / 86400000 // current number of day of the year

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7) // number of the week
}
