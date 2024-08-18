import axiosInstance from '~/config/axiosConfig'

export const getNumberOfStatus = async (userEmail: string, status: string) => {
  const response = await axiosInstance.get(`dashboard/sale?userEmail=${userEmail}&status=${status}`)
  return response.data
}
export const numberContractSuccess = async () => {
  const response = await axiosInstance.get(`dashboard/contract-success`)
  return response.data
}
export const totalRejectAndUser = async () => {
  const response = await axiosInstance.get(`dashboard/total-contract-rejected-and-user`)
  return response.data
}
export const getTotalReject = async () => {
  const response = await axiosInstance.get(`dashboard/count-reason/1/10`)
  return response.data
}
