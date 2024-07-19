import { statusContract } from '~/common/const/status'
import StepProgressBar from '../BaseComponent/StepProgressBar'

const DashboardSale = () => {
  return (
    <div className={`bg-white h-full pt-4`}>
      <StepProgressBar status={statusContract} />
    </div>
  )
}
export default DashboardSale
