import SignContract from '~/components/Admin/NewContract/SignContract'
import ViewContract from '~/components/Admin/NewContract/ViewContract'

const ViewSignContract = () => {
  return (
    <div className='w-[100vw] h-[100vh]'>
      <ViewContract
        src={
          'https://res.cloudinary.com/dphakhyuz/image/upload/v1716909266/PDF_d0bdc551-535f-4086-8b53-15eb2fe7fe58.pdf'
        }
      />
      <SignContract />
    </div>
  )
}
export default ViewSignContract
