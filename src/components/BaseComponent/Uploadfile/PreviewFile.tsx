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
import { useMutation, useQuery } from 'react-query'
import { getContractType } from '~/services/type-contract.service'
import LoadingPage from '~/components/shared/LoadingPage/LoadingPage'

import { REGEX_TEXT } from '~/common/const/regexForm'
import { AxiosError } from 'axios'
import LoadingIcon from '~/assets/LoadingIcon'
import TooltipComponent from '../TooltipComponent'
interface Iprops {
  files: any[]
  handleCloseModal: () => void
  inputFileRef: any
  inputPdfRef: any
  fileType: any
  setFiles: any
  refetch: any
}
export interface Item {
  id: number
  file: any
  base64: string
}

const PreviewFile = ({ files, handleCloseModal, inputFileRef, inputPdfRef, fileType, setFiles, refetch }: Iprops) => {
  const [listUrl, setListUrl] = useState<any>()
  const [pdfUrl, setPdfUrl] = useState<any>()
  const { successNotification, errorNotification } = useToast()
  const { data: typeContract, isLoading: loadingTypeContract } = useQuery('type-contract', () =>
    getContractType({ page: 0, size: 100 })
  )
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
  console.log('URL:', listUrl)
  console.log('files:', files)

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
    setFiles((preFiles: any) =>
      update([...preFiles], {
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
    if (files?.length > 0) {
      try {
        const formData = new FormData()
        if (fileType == 'img') {
          const doOCR = async (images: any) => {
            const worker = await createWorker('vie', 1)
            const {
              data: { text }
            } = await worker.recognize(images)
            return text
          }
          const dataScrip = await Promise.all(listUrl.map(async (d: any) => doOCR(d.file)))

          formData.append(
            'content',
            dataScrip.reduce((re, d) => re + ' ' + d, '')
          )
        }

        formData.append('contractName', data.contractName)
        formData.append('contractTypeId', data.contractTypeId)
        formData.append('contractStartDate', moment(data.contractStartDate).format('DD/MM/YYYY'))
        formData.append('contractEndDate', moment(data.contractEndDate).format('DD/MM/YYYY'))
        formData.append('contractSignDate', moment(data.contractSignDate).format('DD/MM/YYYY'))
        if (fileType == 'img')
          listUrl?.forEach((e: any) => {
            formData.append('images', e.file)
          })
        else {
          formData.append('images', files[0])
        }
        const response = await createOldContract(formData)
        if (response.code == '00' && response.object) {
          successNotification('Tải lên hợp đồng cũ thành công')
          handleCloseModal()
          refetch()
        } else errorNotification('Tải lên thất bại')
      } catch (e) {
        errorNotification('Tải lên thất bại')
      }
    } else {
      errorNotification('Hãy tải thông tin hợp đồng')
    }
  }
  const submitOldContract = useMutation(handleOcrFile, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    }
  })
  const [open, setOpen] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => {
    submitOldContract.mutate(data)
  }
  if (loadingTypeContract) return <LoadingPage />
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-between overflow-auto'>
      <div className='flex gap-4 justify-between'>
        <div className='flex flex-wrap gap-4 w-full md:w-[40%]'>
          <div className='flex flex-col w-full relative'>
            <label className='flex items-center'>
              <div>
                Tên hợp đồng<sup className='text-red-700'>*</sup>
              </div>
              <TooltipComponent content='Độ dài từ 2-30 ký tự ' className='w-4 h-4 cursor-pointer' style='dark' />
            </label>
            <Controller
              name='contractName'
              control={control}
              rules={{
                required: 'Tên hợp đồng không được để trống',
                pattern: {
                  value: REGEX_TEXT,
                  message: 'Tên hợp đồng không hợp lệ'
                }
              }}
              render={({ field }) => (
                <input
                  placeholder='Tên hợp đồng'
                  onChange={(s) => field.onChange(s)}
                  disabled={submitOldContract?.isLoading}
                  className='w-full py-2 px-3 text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              )}
            />
            <div
              className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractName ? 'visible' : 'invisible'}`}
            >
              {errors.contractName?.message}
            </div>
          </div>
          <div className='flex flex-col w-full  relative'>
            <label>
              Loại hợp đồng<sup className='text-red-700'>*</sup>
            </label>

            <select
              {...register('contractTypeId', { required: true })}
              disabled={submitOldContract?.isLoading}
              className='w-full py-2 px-3 text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              {typeContract?.content.map((d: any) => <option value={d.id}>{d.title}</option>)}
            </select>

            <div
              className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractTypeId ? 'visible' : 'invisible'}`}
            >
              Loại hợp đồng không được để trống
            </div>
          </div>
          <div className='flex flex-col  w-full  relative'>
            <label className='flex items-center'>
              <div>
                Ngày bắt đầu<sup className='text-red-700'>*</sup>
              </div>
              <TooltipComponent
                content='Không được phép sau ngày kết thúc'
                className='w-4 h-4 cursor-pointer'
                style='dark'
              />
            </label>
            <Controller
              name='contractStartDate'
              control={control}
              rules={{
                required: 'Ngày bắt đầu không được để trống',
                max: {
                  value: getValues('contractEndDate'),
                  message: 'Ngày bắt đầu phải trước ngày kết thúc'
                }
              }}
              render={({ field }) => (
                <DatePicker
                  placeholderText='mm/dd/yyyy'
                  className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(date) => field.onChange(date)}
                  disabled={submitOldContract?.isLoading}
                  selected={field.value}
                />
              )}
            />
            <div
              className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractStartDate ? 'visible' : 'invisible'}`}
            >
              {errors.contractEndDate?.message}
            </div>
          </div>
          <div className='flex flex-col w-full  relative'>
            <label className='flex items-center'>
              <div>
                Ngày kết thúc<sup className='text-red-700'>*</sup>
              </div>
              <TooltipComponent
                content='Không được phép trước ngày bắt đầu'
                className='w-4 h-4 cursor-pointer'
                style='dark'
              />
            </label>
            <Controller
              name='contractEndDate'
              control={control}
              rules={{
                required: ' Ngày kết thúc không được để trống',
                min: {
                  value: getValues('contractStartDate'),
                  message: 'Ngày kết thúc phải sau ngày bắt đầu'
                }
              }}
              render={({ field }) => (
                <DatePicker
                  placeholderText='mm/dd/yyyy'
                  className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(date) => field.onChange(date)}
                  disabled={submitOldContract?.isLoading}
                  selected={field.value}
                />
              )}
            />
            <div
              className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractEndDate ? 'visible' : 'invisible'}`}
            >
              {errors.contractEndDate?.message}
            </div>
          </div>
          <div className='flex flex-col w-full  relative'>
            <label className='flex items-center'>
              <div>
                Ngày ký<sup className='text-red-700'>*</sup>
              </div>
              <TooltipComponent
                content='Không được phép sau ngày hiện tại'
                className='w-4 h-4 cursor-pointer'
                style='dark'
              />
            </label>
            <Controller
              name='contractSignDate'
              control={control}
              rules={{
                required: ' Ngày ký không được để trống',
                max: {
                  value: new Date(),
                  message: 'Ngày ký không được quá ngày hiện tại'
                }
              }}
              render={({ field }) => (
                <DatePicker
                  placeholderText='mm/dd/yyyy'
                  className='w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={(date) => field.onChange(date)}
                  disabled={submitOldContract?.isLoading}
                  maxDate={new Date()}
                  selected={field.value}
                />
              )}
            />
            <div
              className={`text-red-500 absolute text-[12px] bottom-0 translate-y-full ${errors.contractSignDate ? 'visible' : 'invisible'}`}
            >
              {errors.contractSignDate?.message}
            </div>
          </div>
          <div className='w-full my-2 flex gap-3 flex-wrap justify-center'>
            <button
              type='button'
              onClick={() => inputFileRef.current?.click()}
              disabled={submitOldContract?.isLoading || (files.length != 0 && fileType?.current == 'pdf')}
              hidden={submitOldContract?.isLoading}
              className='w-[100px] disabled:bg-slate-600 mb-2  rounded-md items-center justify-center flex gap-1 bg-green-500 p-2 text-xs sm:text-sm font-medium text-white hover:bg-[#00b63e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <ArrowUpOnSquareIcon className='h-5 w-5' /> Tải ảnh
            </button>
            <button
              type='button'
              onClick={() => inputPdfRef.current?.click()}
              disabled={submitOldContract?.isLoading || (files.length != 0 && fileType?.current == 'img')}
              hidden={submitOldContract?.isLoading}
              className='w-[100px] disabled:bg-slate-600 mb-2  rounded-md items-center justify-center flex gap-1 bg-green-500 p-2 text-xs sm:text-sm font-medium text-white hover:bg-[#00b63e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <ArrowUpOnSquareIcon className='h-5 w-5' /> Tải file
            </button>
            <button
              type='button'
              onClick={() => {
                setFiles([])
                setListUrl([])
                fileType.current = 'none'
              }}
              disabled={submitOldContract?.isLoading || files.length == 0}
              hidden={submitOldContract?.isLoading}
              className='w-[100px] disabled:bg-slate-600 mb-2  rounded-md items-center justify-center flex gap-1 bg-red-500 p-2 text-xs sm:text-sm font-medium text-white hover:bg-[#c9437d] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <XMarkIcon className='h-5 w-5' /> Hủy
            </button>
            <button
              disabled={submitOldContract?.isLoading}
              hidden={submitOldContract?.isLoading}
              type='submit'
              className='w-[100px] disabled:bg-slate-600 mb-2 hover:bg-hover-main rounded-md items-center justify-center flex gap-1 bg-main-color p-2 text-xs sm:text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              {submitOldContract?.isLoading ? (
                <LoadingIcon />
              ) : (
                <>
                  <CheckCircleIcon className='h-5 w-5' /> Lưu
                </>
              )}
            </button>
          </div>
        </div>
        <div className='w-[60%] h-fit pl-5'>
          <div>
            Tài liệu<sup className='text-red-700'>*</sup>
          </div>
          <div className={`h-[480px] ${fileType?.current == 'none' ? 'border' : ''} rounded-md overflow-auto`}>
            {fileType?.current == 'img' ? (
              <div className='w-full flex gap-4 flex-wrap '>
                {listUrl?.map((image: Item, i: number) => renderCard(image, i))}
              </div>
            ) : fileType?.current == 'pdf' ? (
              <div className='w-full flex gap-4 flex-wrap justify-center sm:justify-start'>
                <div className='text-red-500'>{files[0]?.name} </div>
                <div className='text-blue-500 underline cursor-pointer' onClick={() => setOpen(true)}>
                  Xem chi tiết
                </div>
              </div>
            ) : (
              <div className='h-full flex justify-center items-center'>Chưa có tệp đính kèm</div>
            )}
          </div>
        </div>
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
