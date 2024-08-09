import axiosInstant, { axiosInstanceFormData } from '../config/axiosConfig.ts'
type SignRequest = {
  contractId: string
  signImage: string
  comment: string
  createdBy: string
  customer: boolean
}
export const getAppendicesContactAll = async (id: string, page: number, size: number, status: string) => {
  const response = await axiosInstant.get(`api/contract-appendices/${page}/${size}?contractId=${id}&status=${status}`)
  return response.data
}

export const sendMailApp = async (formData: any) => {
  const response = await axiosInstanceFormData.post(`api/contract-appendices/send-mail`, formData)
  return response.data
}
export const sendMailPublicApp = async (formData: any) => {
  const response = await axiosInstanceFormData.post(`api/contract-appendices/public/send-mail`, formData)
  return response.data
}

export const createAppendices = async (data: any) => {
  const response = await axiosInstant.post(`api/contract-appendices`, data)
  return response.data
}
export const getNewContract = async (page: number, size: number, statusContract: string) => {
  const response = await axiosInstant.get(`contract/${page}/${size}?status=${statusContract}`)
  return response.data
}
export const getNewContractById = async (id: any) => {
  const response = await axiosInstant.get(`api/contract-appendices/${id}`)
  return response.data
}
export const getNewContractByIdNotToken = async (id: any) => {
  const response = await axiosInstant.get(`api/contract-appendices/public/sign-contract-appendices/${id}`)
  return response.data
}

export const updateNewContract = async (data: any) => {
  const response = await axiosInstant.post(`contract`, data)
  return response.data
}

export const deleteAppendices = async (id: string) => {
  const response = await axiosInstant.delete(`api/contract-appendices/${id}`)
  return response.data
}

export const getContractHistory = async (contract: string) => {
  const response = await axiosInstant.get(`contract-history?contract=${contract}`)
  return response.data
}
export const getDataByTaxNumber = async (id: string) => {
  const response = await axiosInstant.get(`contract/party/${id}`)
  return response.data
}
export const getSearchContract = async ({ fieldSearch, data }: any) => {
  const response = await axiosInstant.post(`${fieldSearch}/search`, data)
  return response.data
}
export const signContract = async (data: SignRequest) => {
  const response = await axiosInstant.post(`api/contract-appendices/public/sign-contract-appendices`, data)
  return response.data
}
