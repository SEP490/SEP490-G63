import Cookies from 'js-cookie'
export const getAccessToken = () => {
  return Cookies.get('token')
}
export const setAccessToken = (token: string) => {
  Cookies.set('token', token)
}
export const removeAccessToken = () => {
  Cookies.remove('token')
}
export const hasAccessToken = () => {
  return !!Cookies.get('token')
}
