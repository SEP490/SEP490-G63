import { useQuery } from 'react-query'
import { useAuth } from '~/provider/authProvider'
import { getContractAdmin } from '~/services/admin.contract.service'

const ContractInformation = () => {
  const { user } = useAuth()
  console.log(user)
  const { data } = useQuery('get-contract-admin', () => getContractAdmin(user?.email))
  console.log(data)

  return (
    <div className='w-full md:w-[80%]  flex flex-col items-center mx-3 py-4 px-3 justify-center bg-white rounded-md shadow-md'>
      Thông tin hợp đồng
    </div>
  )
}
export default ContractInformation
