import axiosInstance from '~/config/axiosConfig'

export const getNumberOfStatus = async (userEmail: string, status: string) => {
  const response = await axiosInstance.get(`dashboard/sale?userEmail=${userEmail}&status=${status}`)
  return response.data
}
