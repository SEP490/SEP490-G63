import moment from 'moment'
import { months } from '../const'

export const formatDate = (date: string) => {
  return date != null ? moment(date).format('DD/MM/YYYY') : ''
}
export const currentDate = () => {
  const dt = new Date()
  dt.setHours(dt.getHours() + 7)
  return dt.toISOString().split('T')[0]
}
export const listYear = () => {
  const result = []
  let startYear = 2000
  const current = new Date().getFullYear()
  while (startYear <= current) {
    result.push(startYear)
    startYear++
  }
  return result
}
export const listMonth = (year: number) => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  if (year == currentYear) return months.filter((m) => m <= currentMonth)
    return months
}
