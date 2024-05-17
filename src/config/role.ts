import Cookies from 'js-cookie'
export const getRoleW = () => {
  return Cookies.get('role')
}
export const setRoleW = (role: string) => {
  Cookies.set('role', role)
}
export const removeRoleW = () => {
  Cookies.remove('role')
}
export const hasRoleW = () => {
  return !!Cookies.get('role')
}
