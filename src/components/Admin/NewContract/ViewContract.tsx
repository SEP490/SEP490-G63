type Iprops = {
  src: string
}
const ViewContract = ({ src }: Iprops) => {
  return <iframe src={src} width='100%' height='100%' />
}
export default ViewContract
