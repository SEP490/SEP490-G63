import axiosInstance from '~/config/axiosConfig'

export const getSalaryAll = async ({ page, size, month, year, type }: any) => {
  const response = await axiosInstance.get(
    `api/pay-slip?page=${page}&size=${size}${month != 0 ? `&month=${month}` : ''}&year=${year}&type=${type}`
  )
  return response.data
}
export const getSalaryByMail = async ({ page, size, month, year }: any) => {
  const response = await axiosInstance.get(
    `api/pay-slip/findByMail?page=${page}&size=${size}${month != 0 ? `&month=${month}` : ''}&year=${year}`
  )
  return response.data
}
