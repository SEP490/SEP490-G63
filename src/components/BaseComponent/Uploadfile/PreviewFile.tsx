import { LegacyRef, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpOnSquareIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import update from 'immutability-helper'
import ItemImage from './ItemImage'
import { createWorker } from 'tesseract.js'
import { createOldContract } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
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
  const contractName = useRef<any>(null)
  const [contractStartDate, setContractStartDate] = useState<Date | null>()
  const [contractEndDate, setContractEndDate] = useState<Date | null>()
  const [contractSignDate, setContractSignDate] = useState<Date | null>()

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
        formData.append('contractName', contractName?.current.value)
        formData.append('contractStartDate', moment(contractStartDate).format('DD/MM/YYYY'))
        formData.append('contractEndDate', moment(contractEndDate).format('DD/MM/YYYY'))
        formData.append('contractSignDate', moment(contractSignDate).format('DD/MM/YYYY'))
        listUrl.forEach((e: any) => {
          formData.append('images', e.file)
          console.log('e.file', e.file)
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
      <div className='flex gap-3 justify-between my-4 items-center'>
        <div className='items-center flex gap-1 w-[60%]'>
          Tên hợp đồng:
          <input
            ref={contractName}
            className='w-[80%] py-2 px-3 text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='flex gap-3 '>
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
      </div>
      <div className='flex justify-between flex-wrap gap-1 my-4'>
        <div className='w-full md:w-[30%] flex gap-1 items-center'>
          Ngày bắt đầu:
          <DatePicker
            disabled={isSubmit}
            closeOnScroll={true}
            className='text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            selected={contractStartDate}
            placeholderText='Ngày bắt đầu'
            onChange={(date) => setContractStartDate(date)}
          />
        </div>
        <div className='w-full md:w-[30%] flex gap-1 items-center'>
          Ngày kết thúc:
          <DatePicker
            disabled={isSubmit}
            closeOnScroll={true}
            className='text-xs text-gray-900 border flex justify-end border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            selected={contractEndDate}
            placeholderText='Ngày kết thúc'
            onChange={(date) => setContractEndDate(date)}
          />
        </div>
        <div className='w-full md:w-[30%] flex gap-1 items-center'>
          Ngày ký:
          <DatePicker
            disabled={isSubmit}
            closeOnScroll={true}
            className='text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            selected={contractSignDate}
            placeholderText='Ngày ký'
            onChange={(date) => setContractSignDate(date)}
          />
        </div>
      </div>
      <div className='flex gap-4 px-4 flex-wrap md:justify-normal justify-center'>
        {listUrl?.map((image: Item, i: number) => renderCard(image, i))}
      </div>
    </div>
  )
}
export default PreviewFile
