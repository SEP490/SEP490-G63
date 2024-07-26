import axiosInstance from '~/config/axiosConfig'

export const getPaySlipFormula = async () => {
  const response = await axiosInstance.get(`api/pay-slip-formula/${0}/${20}`)
  return response.data
}
export const getPaySlipFormulaById = async (id: string) => {
  const response = await axiosInstance.get(`api/pay-slip-formula/findById/${id}`)
  return response.data
}
export const updatePaySlipFormula = async ({ id, data }: any) => {
  const response = await axiosInstance.put(`api/pay-slip-formula/${id}`, data)
  return response.data
}
export const deletePaySlipFormula = async (id: string) => {
  const response = await axiosInstance.delete(`api/pay-slip-formula/${id}`)
  return response.data
}
export const createPaySlipFormula = async (data: any) => {
  const response = await axiosInstance.post(`api/pay-slip-formula`, data)
  return response.data
}
