import axiosInstant, { axiosInstanceFormData } from '../config/axiosConfig.ts'
export const createTemplateContract = async (data: any) => {
  const response = await axiosInstant.post(`contract-templates`, data)
  return response.data
}
export const updateTemplateContract = async ({ id, data }: any) => {
  const response = await axiosInstant.put(`contract-templates/${id}`, data)
  return response.data
}
export const getTemplateContract = async (page: number, size: number, contractName: string) => {
  const response = await axiosInstant.get(`contract-templates/${page}/${size}?contractName=${contractName}`)
  return response.data
}
export const deleteTemplateContract = async (id: string) => {
  const response = await axiosInstant.delete(`contract-templates/${id}`)
  return response.data
}
