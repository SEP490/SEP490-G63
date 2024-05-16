import { provinceInstance } from '~/config/axiosConfig'

export const getProvince = async () => {
  try {
    const response = provinceInstance.get('/api/province/')
    return response
  } catch (error) {
    console.log(error)
  }
}
export const getDistrict = async (province_id: string) => {
  try {
    const response = provinceInstance.get(`/api/province/district/${province_id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const getWard = async (district_id: string) => {
  try {
    const response = provinceInstance.get(`/api/province/ward/${district_id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}
