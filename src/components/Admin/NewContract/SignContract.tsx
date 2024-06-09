import React from 'react'
import { Stage, Layer, Line } from 'react-konva'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
const SignContract = () => {
  const [tool, setTool] = React.useState('pen')
  const [lines, setLines] = React.useState<any>([])
  const isDrawing = React.useRef(false)

  const handleMouseDown = (e: any) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool, points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    const lastLine = lines[lines.length - 1]
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <div className='shadow-lg' style={{ width: 300, border: '1px solid black', margin: 1 }}>
      <div>
        <Stage
          width={300}
          height={300}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer
            style={{
              backgroundColor: 'white'
            }}
          >
            {lines.map((line: any, i: number) => (
              <Line
                key={i}
                points={line.points}
                stroke='black'
                strokeWidth={5}
                tension={0.5}
                lineCap='round'
                lineJoin='round'
                globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div className='w-full' style={{ borderTop: '1px solid black' }}>
        <ArrowPathIcon className='h-5 w-5 cursor-pointer' title='Xóa' onClick={() => setLines([])} />
      </div>
    </div>
  )
}
export default SignContract
