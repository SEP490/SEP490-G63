import { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'

const Example = () => {
  const [file, setFile] = useState<any>()
  const doOCR = async (images: any) => {
    const worker = await createWorker('vie', 1, { logger: (m) => console.log(m) })

    const {
      data: { text }
    } = await Promise.all([images.map((f) => worker.recognize(f))])
    setOcr(text)
    console.log('End:' + new Date())
  }
  const [ocr, setOcr] = useState('Recognizing...')
  useEffect(() => {
    file ? doOCR(file) : console.log('no file selected yet!')
  }, [file])
  const handleFileSelected = (e: any) => {
    console.log('start:' + new Date())

    const files = Array.from(e.target.files)
    setFile(files)
  }
  return (
    <>
      <input type='file' onChange={handleFileSelected} multiple />
      <p>{ocr}</p>
    </>
  )
}

export default Example
