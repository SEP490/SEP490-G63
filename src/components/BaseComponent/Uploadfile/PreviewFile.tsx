import { Fragment, LegacyRef, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpOnSquareIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import update from 'immutability-helper'
import ItemImage from './ItemImage'
import { createWorker } from 'tesseract.js'
import { createOldContract } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
interface Iprops {
  files: any[]
  handleCloseModal: () => void
  inputFileRef: any
  inputPdfRef: any
  fileType: any
  setFiles: any
}
export interface Item {
  id: number
  file: any
  base64: string
}

const PreviewFile = ({ files, handleCloseModal, inputFileRef, inputPdfRef, fileType, setFiles }: Iprops) => {
  const [listUrl, setListUrl] = useState<any>()
  const [pdfUrl, setPdfUrl] = useState<any>()
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
  const getUrlPdf = () => {
    const file = files[0]
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file)
      setPdfUrl(url)
    }
  }
  useEffect(() => {
    fileType?.current == 'img' && submitImages()
    fileType?.current == 'pdf' && getUrlPdf()
  }, [files, fileType])
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
    if (listUrl?.length > 0) {
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
      errorNotification('Hãy tải thông tin hợp đồng')
    }
  }
  const [open, setOpen] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => {
    handleOcrFile(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='px-2 h-[80vh] w-full flex flex-col justify-between overflow-auto'
    >
      <div className='flex flex-wrap gap-4 justify-between '>
        <div className='flex flex-col w-full md:w-[48%] relative'>
          <label>
            Tên hợp đồng <sup className='text-red-700'>*</sup>
          </label>
          <Controller
            name='contractName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                placeholder='Tên hợp đồng'
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
        <div className='w-full my-2 flex gap-5'>
          <button
            type='button'
            onClick={() => inputFileRef.current?.click()}
            disabled={isSubmit || (files.length != 0 && fileType?.current == 'pdf')}
            hidden={isSubmit}
            className='w-[120px] disabled:bg-slate-600 mb-2  rounded-md items-center justify-between flex gap-1 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-[#00b63e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
          >
            <ArrowUpOnSquareIcon className='h-5 w-5' /> Tải ảnh
          </button>
          <button
            type='button'
            onClick={() => inputPdfRef.current?.click()}
            disabled={isSubmit || (files.length != 0 && fileType?.current == 'img')}
            hidden={isSubmit}
            className='w-[160px] disabled:bg-slate-600 mb-2  rounded-md items-center justify-between flex gap-1 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-[#5174e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
          >
            <ArrowUpOnSquareIcon className='h-5 w-5' /> Tải file mềm
          </button>
          <button
            type='button'
            onClick={() => {
              setFiles([])
              setListUrl([])
              fileType.current = 'none'
            }}
            disabled={isSubmit || files.length == 0}
            hidden={isSubmit}
            className=' disabled:bg-slate-600 mb-2  rounded-md items-center justify-between flex gap-1 bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-[#c9437d] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
          >
            <XMarkIcon className='h-5 w-5' /> Hủy
          </button>
        </div>
        {fileType?.current == 'img' ? (
          <div className='w-full flex gap-4 px-4 flex-wrap md:justify-normal justify-center'>
            {listUrl?.map((image: Item, i: number) => renderCard(image, i))}
          </div>
        ) : fileType?.current == 'pdf' ? (
          <div className='w-full flex gap-4 px-4 flex-wrap md:justify-normal justify-center'>
            <div className='text-red-500'>{files[0]?.name} </div>
            <div className='text-blue-500 underline cursor-pointer' onClick={() => setOpen(true)}>
              Xem chi tiết
            </div>
          </div>
        ) : (
          <></>
        )}
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
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full  items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-[90vw] md:w-[90vw] h-[96vh] transform overflow-hidden rounded-md bg-white p-5 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between'>
                    <div></div>
                    <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={() => setOpen(false)} />
                  </div>
                  <iframe src={pdfUrl} width='100%' height='100%' />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </form>
  )
}
export default PreviewFile
