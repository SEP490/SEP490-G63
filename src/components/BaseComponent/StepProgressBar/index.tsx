import { useAuth } from '~/context/authProvider'
import './index.css'
import NodeStep from './NodeStep'
type IProps = {
  status: any[]
}
const StepProgressBar = ({ status }: IProps) => {
  const { user } = useAuth()
  return (
    <div className='stepper-wrapper'>
      {status?.map((s) => (
        <div className='stepper-item completed' key={s.status}>
          <NodeStep status={s.status} userEmail={user?.email as string} title={s.title} />
        </div>
      ))}
    </div>
  )
}
export default StepProgressBar
