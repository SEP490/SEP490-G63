import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getNewContractById } from '~/services/contract.service'

const ViewDetailContract = () => {
  const { id } = useParams()
  const { data, isLoading } = useQuery('get-contract-id', () => getNewContractById(id as string))

  return <></>
}
export default ViewDetailContract
