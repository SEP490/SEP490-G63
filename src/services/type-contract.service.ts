import axiosInstance from '~/config/axiosConfig'
type RequestQuery = {
  page: number
  size: number
  title: string
}
export const getContractType = async ({ page, size, title }: RequestQuery) => {
  const result = await axiosInstance.get(`contract-type?page=${page}&size=${size}&title=${title}`)
  return result?.data
}
export const getContractTypeById = async (id: string) => {
  const result = await axiosInstance.get(`contract-type/${id}`)
  return result
}
export const createTypeContract = async (data: any) => {
  const result = await axiosInstance.post(`contract-type`, data)
  return result
}
export const updateTypeContract = async ({ id, data }: any) => {
  const result = await axiosInstance.put(`contract-type/${id}`, data)
  return result
}
export const deleteTypeContract = async (id: string) => {
  const result = await axiosInstance.delete(`contract-type/${id}`)
  return result
}
