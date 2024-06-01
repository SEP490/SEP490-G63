import axiosInstant, { axiosInstanceFormData } from '../config/axiosConfig.ts'
export const createOldContract = async (formData: any) => {
  try {
    const response = await axiosInstanceFormData.post(`old-contract`, formData)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getOldContract = async (page: number, size: number) => {
  try {
    const response = await axiosInstant.get(`old-contract?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const deleteOldContract = async (id: string) => {
  try {
    const response = await axiosInstant.delete(`old-contract/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const sendMail = async (formdata: any) => {
  try {
    const response = await axiosInstanceFormData.post(`contract/send-mail`, formdata)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const createNewContract = async (data: any) => {
  try {
    const response = await axiosInstant.post(`contract`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getNewContract = async (page: number, size: number) => {
  try {
    const response = await axiosInstant.get(`contract/${page}/${size}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
