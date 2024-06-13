type Iprops = {
  src: any
}
const ViewContract = ({ src }: Iprops) => {
  // console.log('src: ', src)

  return <iframe src={src} width='100%' height='100%' />
}
export default ViewContract
