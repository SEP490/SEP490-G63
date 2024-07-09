import moment from 'moment'

export const formatDate = (date: string) => {
  return date != null ? moment(date).format('DD/MM/YYYY') : ''
}
export const currentDate = () => {
  const dt = new Date()
  dt.setHours(dt.getHours() + 7)
  return dt.toISOString().split('T')[0]
}
