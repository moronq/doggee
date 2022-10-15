import { createDate } from './createDate'

export const getMonthesNames = (
  locale: string = 'defalut',
  year: number = new Date().getFullYear()
) => {
  const monthesNames: {
    month: ReturnType<typeof createDate>['month']
    monthShort: ReturnType<typeof createDate>['monthShort']
    monthIndex: ReturnType<typeof createDate>['monthIndex']
    date: ReturnType<typeof createDate>['date']
  }[] = Array.from({ length: 12 })

  const d = new Date(year, 0)

  monthesNames.forEach((_, i) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(d.getFullYear(), d.getMonth() + i, 1)
    })

    monthesNames[monthIndex] = { month, monthIndex, monthShort, date }
  })

  return monthesNames
}
