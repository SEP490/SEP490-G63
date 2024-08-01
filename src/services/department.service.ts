import axiosInstance from '~/config/axiosConfig'

export const getListDepartment = async (page: number, size: number) => {
  const response = await axiosInstance.get(`department/${page}/${size}`)
  return response.data
}
export const createDepartment = async (data: any) => {
  const response = await axiosInstance.post(`department`, data)
  return response.data
}
export const updateDepartment = async (data: any) => {
  const response = await axiosInstance.put(`department`, data)
  return response.data
}
export const deleteDepartment = async (id: string) => {
  const response = await axiosInstance.delete(`department/${id}`)
  return response.data
}
