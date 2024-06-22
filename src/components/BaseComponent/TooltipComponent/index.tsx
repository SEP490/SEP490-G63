import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from 'flowbite-react'
type IProps = {
  content: any
  style?: 'auto' | 'dark' | 'light'
  className?: string
  color?: string
}
const TooltipComponent = ({ content, style = 'auto', color = 'red', className }: IProps) => {
  return (
    <Tooltip content={content} style={style}>
      <div className={className}>
        <QuestionMarkCircleIcon color={color} />
      </div>
    </Tooltip>
  )
}
export default TooltipComponent
