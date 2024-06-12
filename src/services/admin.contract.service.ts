import { adminInstance } from '~/config/axiosConfig'

export const getContractAdmin = async (email: string | undefined) => {
  const mail = 'phantutunao@gmail.com'
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
