export const formatPrice = (number: number) => {
  if (!number) return 0
  return (number + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
