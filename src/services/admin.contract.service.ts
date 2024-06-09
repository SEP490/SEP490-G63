import { adminInstance } from '~/config/axiosConfig'

export const getContractAdmin = async (email: string | undefined) => {
  const response = await adminInstance.get(`manager/company/${email}`)
  return response.data
}
