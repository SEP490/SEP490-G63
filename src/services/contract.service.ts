import { BASE_URL } from '~/common/const/index.ts'
import axiosInstant, { axiosInstanceFormData } from '../config/axiosConfig.ts'
import axios from 'axios'
type SignRequest = {
  contractId: string
  signImage: string
  comment: string
  createdBy: string
  customer: boolean
}
export const createOldContract = async (formData: any) => {
  const response = await axiosInstanceFormData.post(`old-contract`, formData)
  return response.data
}
export const getOldContract = async (page: number, size: number) => {
  const response = await axiosInstant.get(`old-contract?page=${page}&size=${size}`)
  return response.data
}
export const deleteOldContract = async (id: string) => {
  const response = await axiosInstant.delete(`old-contract/${id}`)
  return response.data
}

export const sendMail = async (formData: any) => {
  const response = await axiosInstanceFormData.post(`contract/send-mail`, formData)
  return response.data
}
export const sendMailPublic = async (formData: any) => {
  const response = await axiosInstanceFormData.post(`contract/public/send-mail`, formData)
  return response.data
}

export const createNewContract = async (data: any) => {
  const response = await axiosInstant.post(`contract`, {
    ...data,
    value: data.value.replace(/,/g, '').replace(/\./g, '')
  })
  return response.data
}
export const getNewContract = async (page: number, size: number, statusContract: string) => {
  const response = await axiosInstant.get(`contract/${page}/${size}?status=${statusContract}`)
  return response.data
}
export const getNewContractById = async (id: any) => {
  const response = await axiosInstant.get(`contract/${id}`)
  return response.data
}
export const getNewContractByIdNotToken = async (id: any) => {
  const response = await axios.get(`${BASE_URL}contract/public/sign-contract/${id}`)
  return response.data
}

export const updateNewContract = async (data: any) => {
  const response = await axiosInstant.post(`contract`, {
    ...data,
    value: data.value.replace(/,/g, '').replace(/\./g, '')
  })
  return response.data
}

export const deleteNewContract = async (id: string) => {
  const response = await axiosInstant.delete(`contract/${id}`)
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
  const response = await axios.post(`${BASE_URL}contract/public/sign-contract`, data)
  return response.data
}
export const managerCount = async () => {
  const response = await axiosInstant.get('contract/getNumberContractNoti')
  return response.data
}
