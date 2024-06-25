import moment from 'moment'

export const formatDate = (date: string) => {
  return date != null ? moment(date).format('DD/MM/YYYY') : ''
}
