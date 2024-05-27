import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpOnSquareIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import update from 'immutability-helper'
import ItemImage from './ItemImage'
import { createWorker } from 'tesseract.js'
import { createOldContract } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
interface Iprops {
  files: any[]
  handleCloseModal: () => void
  inputFileRef: any
}
export interface Item {
  id: number
  file: any
  base64: string
}

const PreviewFile = ({ files, handleCloseModal, inputFileRef }: Iprops) => {
  const [listUrl, setListUrl] = useState<any>()
  const { successNotification, errorNotification } = useToast()
  const [isSubmit, setIsSubmit] = useState(false)
  const contractName = useRef('')
  const contractStartDate = useRef('')
  const contractEndDate = useRef('')
  const contractSignDate = useRef('')
  const getBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (err) => reject(err)
    })

  const submitImages = async () => {
    const images = await Promise.all([...files].map((imageInput) => (imageInput ? getBase64(imageInput) : null)))
    setListUrl(() => [...(files || [])].map((file, index) => ({ id: index, file: file, base64: images[index] })))
  }
  useEffect(() => {
    submitImages()
  }, [files])
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setListUrl((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item]
        ]
      })
    )
  }, [])
  const removeCard = useCallback((index: number) => {
    setListUrl((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [[index, 1]]
      })
    )
  }, [])

  const renderCard = useCallback((image: { id: number; file: any; base64: string }, index: number) => {
    return (
      <ItemImage
        key={image.id}
        index={index}
        id={image.id}
        file={image.file}
        base64={image.base64}
        moveCard={moveCard}
        removeCard={removeCard}
      />
    )
  }, [])
  const handleOcrFile = async () => {
    if (listUrl.length > 0) {
      try {
        setIsSubmit(true)
        document.body.style.cursor = 'wait'
        const doOCR = async (images: any) => {
          const worker = await createWorker('vie', 1)
          const {
            data: { text }
          } = await worker.recognize(images)
          return text
        }
        const dataScrip = await Promise.all(listUrl.map(async (d: any) => doOCR(d.file)))

        const formData = new FormData()
        formData.append(
          'content',
          dataScrip.reduce((re, d) => re + d, '')
        )
        listUrl.forEach((e: any) => {
          formData.append('images', e.file)
        })
        const response = await createOldContract(formData)
        if (response.code == '00' && response.object) {
          successNotification('Tải lên hợp đồng cũ thành công')
          handleCloseModal()
        }
        setIsSubmit(false)
        document.body.style.cursor = 'default'
      } catch (e) {
        console.log(e)
      }
    } else {
      errorNotification('Hãy tải ảnh hợp đồng')
    }
  }
  return (
    <div className='h-full w-full flex flex-col justify-between'>
      <div className='flex gap-3 justify-end mb-4'>
        <button
          onClick={() => inputFileRef.current?.click()}
          disabled={isSubmit}
          hidden={isSubmit}
          className='disabled:bg-slate-600 disabled:cursor-wait  rounded-md items-center justify-between flex gap-1 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-[#00b63e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
        >
          <ArrowUpOnSquareIcon className='h-5 w-5' /> Tải ảnh
        </button>
        <button
          disabled={isSubmit}
          hidden={isSubmit}
          onClick={handleOcrFile}
          className='disabled:bg-red-500 disabled:cursor-wait rounded-md items-center justify-between flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
        >
          {isSubmit ? (
            <>Đang lưu</>
          ) : (
            <>
              <CheckCircleIcon className='h-5 w-5' /> Lưu hợp đồng
            </>
          )}
        </button>
      </div>
      <div></div>
      <div className='flex gap-4 px-4 flex-wrap md:justify-normal justify-center'>
        {listUrl?.map((image: Item, i: number) => renderCard(image, i))}
      </div>
    </div>
  )
}
export default PreviewFile
