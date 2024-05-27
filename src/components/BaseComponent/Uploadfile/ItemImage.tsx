import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import { XCircleIcon } from '@heroicons/react/24/outline'
interface DragItem {
  index: number
  id: string
  type: string
}
interface Iprops {
  index: number
  id: number
  file: any
  base64: string
  moveCard: (dragIndex: number, hoverIndex: number) => void
  removeCard: any
}
const ItemImage = ({ index, id, file, base64, moveCard, removeCard }: Iprops) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'imageCard',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging left
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging right
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'imageCard',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className='relative group border cursor-move'>
      <img src={base64} className='w-[160px] h-[200px]' />
      <XCircleIcon
        className='absolute cursor-pointer group-hover:scale-110 h-5 w-5 group-hover:bg-red-500 group-hover:text-white text-black rounded-[50%] top-1 right-1'
        onClick={() => removeCard(index)}
      />
    </div>
  )
}
export default ItemImage
