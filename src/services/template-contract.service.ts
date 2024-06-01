import axiosInstant, { axiosInstanceFormData } from '../config/axiosConfig.ts'
export const createTemplateContract = async (data: any) => {
  try {
    const response = await axiosInstant.post(`contract-templates`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getNewContract = async (page: number, size: number) => {
  try {
    const response = await axiosInstant.get(`contract-templates/${page}/${size}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
