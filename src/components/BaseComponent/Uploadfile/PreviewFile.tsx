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
import { Controller, useForm } from 'react-hook-form'
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
  const handleOcrFile = async (data: any) => {
    if (listUrl.length > 0) {
      try {
        setIsSubmit(true)

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
        formData.append('contractName', data.contractName)
        formData.append('contractStartDate', moment(data.contractStartDate).format('DD/MM/YYYY'))
        formData.append('contractEndDate', moment(data.contractEndDate).format('DD/MM/YYYY'))
        formData.append('contractSignDate', moment(data.contractSignDate).format('DD/MM/YYYY'))
        listUrl.forEach((e: any) => {
          formData.append('images', e.file)
        })
        const response = await createOldContract(formData)
        if (response.code == '00' && response.object) {
          successNotification('Tải lên hợp đồng cũ thành công')
          handleCloseModal()
        } else errorNotification('Tải lên thất bại')
      } catch (e) {
        errorNotification('Tải lên thất bại')
      } finally {
        setIsSubmit(false)
      }
    } else {
      errorNotification('Hãy tải ảnh hợp đồng')
    }
  }
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => {
    handleOcrFile(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-[80vh] w-full flex flex-col justify-between overflow-auto'>
      <div className='flex flex-wrap gap-4 justify-between '>
        <div className='flex flex-col  w-full md:w-[48%] relative'>
          <label>
            Tên hợp đồng <sup className='text-red-700'>*</sup>
          </label>
          <Controller
            name='contractName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                placeholder='Ngày bắt đầu'
                onChange={(s) => field.onChange(s)}
                disabled={isSubmit}
                className='w-full py-2 px-3 text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            )}
          />
          <div
            className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractName ? 'visible' : 'invisible'}`}
          >
            Tên hợp đồng không được để trống
          </div>
        </div>
        <div className='flex flex-col  w-full md:w-[48%] relative'>
          <label>
            Ngày bắt đầu <sup className='text-red-700'>*</sup>
          </label>
          <Controller
            name='contractStartDate'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                placeholderText='Ngày bắt đầu'
                className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={(date) => field.onChange(date)}
                disabled={isSubmit}
                selected={field.value}
              />
            )}
          />
          <div
            className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractStartDate ? 'visible' : 'invisible'}`}
          >
            Ngày bắt đầu không được để trống
          </div>
        </div>
        <div className='flex flex-col w-full md:w-[48%] relative'>
          <label>
            Ngày kết thúc <sup className='text-red-700'>*</sup>
          </label>
          <Controller
            name='contractEndDate'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                placeholderText='Ngày kết thúc'
                className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={(date) => field.onChange(date)}
                disabled={isSubmit}
                selected={field.value}
              />
            )}
          />
          <div
            className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractEndDate ? 'visible' : 'invisible'}`}
          >
            Ngày kết thúc không được để trống
          </div>
        </div>
        <div className='flex flex-col w-full md:w-[48%] relative'>
          <label>
            Ngày ký <sup className='text-red-700'>*</sup>
          </label>
          <Controller
            name='contractSignDate'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                placeholderText='Ngày ký hợp đồng'
                className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={(date) => field.onChange(date)}
                disabled={isSubmit}
                selected={field.value}
              />
            )}
          />
          <div
            className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractSignDate ? 'visible' : 'invisible'}`}
          >
            Ngày ký không được để trống
          </div>
        </div>
        <div className='w-full my-2'>
          <button
            type='button'
            onClick={() => inputFileRef.current?.click()}
            disabled={isSubmit}
            hidden={isSubmit}
            className='disabled:bg-slate-600 mb-2 disabled:cursor-wait  rounded-md items-center justify-between flex gap-1 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-[#00b63e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
          >
            <ArrowUpOnSquareIcon className='h-5 w-5' /> Tải ảnh
          </button>
          <div className='w-full flex gap-4 px-4 flex-wrap md:justify-normal justify-center'>
            {listUrl?.map((image: Item, i: number) => renderCard(image, i))}
          </div>
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <button
          disabled={isSubmit}
          hidden={isSubmit}
          type='submit'
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
    </form>
  )
}
export default PreviewFile
