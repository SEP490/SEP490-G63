import { adminInstance } from '~/config/axiosConfig'

export const getContractAdmin = async (email: string | undefined) => {
  try {
    const response = await adminInstance.get(`/public/getContract/${email}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getContract = async (email: string | undefined, code: string) => {
  try {
    const response = await adminInstance.post(`/public/getContract/get-contract`, { email: email, code: code })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const extendService = async (data: any) => {
  try {
    const response = await adminInstance.post(`manager/queueExtend`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getPrice = async () => {
  try {
    const response = await adminInstance.get('manager/pricePlan')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const banContract = async (id: string) => {
  try {
    const response = await adminInstance.delete(`/public/getContract/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const handleBankTransaction = async (data: any) => {
  try {
    const response = await adminInstance.post(`payment/generateQR`, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
