import { useRef, useState } from 'react'
import PreviewFile from './PreviewFile'
type IProps = {
  handleCloseModal: () => void
  refetch: any
}
const UploadFile = ({ handleCloseModal, refetch }: IProps) => {
  const inputFileRef = useRef<any>(null)
  const inputPdfRef = useRef<any>(null)
  const [files, setFiles] = useState<any>([])
  const fileType = useRef<any>('none')
  const handUploadFile = (event: any) => {
    const files = event.target.files
    if (files.length != 0) fileType.current = 'img'
    else fileType.current = 'none'
    setFiles(files)
  }
  const handUploadPdf = (event: any) => {
    const files = event.target.files
    if (files.length != 0) fileType.current = 'pdf'
    else fileType.current = 'none'
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
      <input type='file' ref={inputPdfRef} accept='.pdf' onChange={handUploadPdf} className='hidden' />
      <PreviewFile
        files={files}
        refetch={refetch}
        setFiles={setFiles}
        handleCloseModal={handleCloseModal}
        inputFileRef={inputFileRef}
        inputPdfRef={inputPdfRef}
        fileType={fileType}
      />
    </div>
  )
}
export default UploadFile
