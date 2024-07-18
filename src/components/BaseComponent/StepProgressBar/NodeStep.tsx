import { useQuery } from 'react-query'
import LoadingIcon from '~/assets/LoadingIcon'
import { getNumberOfStatus } from '~/services/dashboard.service'

type IProps = {
  status: string
  userEmail: string
  title: string
}
const NodeStep = ({ status, userEmail, title }: IProps) => {
  const queryData = useQuery(['query-data-status', status], () => getNumberOfStatus(userEmail, status))
  return (
    <div className='stepper-item completed'>
      <div className='step-counter'>
        {queryData.isLoading ? <LoadingIcon /> : queryData?.data?.object == null ? 0 : queryData?.data?.object}
      </div>
      <div className='step-name'>{title}</div>
    </div>
  )
}
export default NodeStep
