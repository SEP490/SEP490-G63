import { useRef, useState } from 'react'
import PreviewFile from './PreviewFile'
type Iprops = {
  handleCloseModal: () => void
}
const UploadFile = ({ handleCloseModal }: Iprops) => {
  const inputFileRef = useRef<any>(null)
  const [files, setFiles] = useState<any>([])
  const handUploadFile = (event: any) => {
    const files = event.target.files
    setFiles(files)
  }

  return (
    <div className='w-full'>
      <input
        type='file'
        ref={inputFileRef}
        accept='.png, .jpg, .jpeg'
        onChange={handUploadFile}
        multiple
        className='hidden'
      />
      <PreviewFile files={files} handleCloseModal={handleCloseModal} inputFileRef={inputFileRef} />
    </div>
  )
}
export default UploadFile
