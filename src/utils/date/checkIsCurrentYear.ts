export const checkIsCurrentYear = (year: number) => {
  const currentYear = new Date().getFullYear()
  return currentYear === year
}
