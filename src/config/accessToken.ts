export const getAccessToken = () => {
  return localStorage.getItem('token')
}
export const removeAccessToken = () => {
  localStorage.removeItem('token')
}
