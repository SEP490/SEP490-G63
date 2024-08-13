import { SubmitHandler, useForm } from 'react-hook-form'
import permissionsList from '~/common/const/permissions'
import useToast from '~/hooks/useToast'
import { createEmployee } from '~/services/employee.service'
import debounce from 'lodash/debounce'
import TooltipComponent from '~/components/BaseComponent/TooltipComponent'
import { currentDate } from '~/common/utils/formatDate'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import LoadingIcon from '~/assets/LoadingIcon'
import moment from 'moment'
import dataRegex from '../../../regex.json'
import { createDepartment } from '~/services/department.service'
import { createReason } from '~/services/reason.service'
type FromType = {
  title: string
  description: string
}

interface IProp {
  closeModal: () => void
  refetch: any
}
const AddReason = ({ closeModal, refetch }: IProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>()
  const { successNotification, errorNotification } = useToast()
  const addNewReasonQuery = useMutation(createReason, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response) => {
      if (response) {
        successNotification('Tạo mới thành công')
        closeModal()
        refetch()
      } else {
        errorNotification('Lỗi hệ thống')
      }
    }
  })

  const onSubmit: SubmitHandler<FromType> = async (data) => {
    addNewReasonQuery.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(debounce(onSubmit, 300))}
      className='items-center w-full rounded-lg mt-2  flex flex-wrap justify-between h-fit bg-white z-50 '
    >
      <div className='w-[100%] mt-0 relative'>
        <label className=' flex items-center'>
          <div>
            Tên phòng ban <sup className='text-red-500'>*</sup>
          </div>
          <TooltipComponent
            content='Chỉ chứa kí tự chữ cái,khoảng trống, tối thiểu 8 và tối đa 30 kí tự'
            className='w-4 h-4 cursor-pointer'
            style='dark'
          />
        </label>
        <input
          className={`${errors.title ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Nguyên nhân'
          {...register('title', {
            required: 'Nguyên nhân không được bỏ trống',
            pattern: {
              value: new RegExp(dataRegex.REGEX_NAME),
              message: 'Nguyên nhân không hợp lệ'
            }
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.title ? 'visible' : 'invisible'}`}>
          {errors.title?.message}
        </div>
      </div>
      <div className='w-[100%] mt-5 relative'>
        <label className=' flex items-center'>
          <div>
            Mô tả<sup className='text-red-500'>*</sup>
          </div>
        </label>
        <textarea
          className={`${errors.description ? 'ring-red-600' : ''}  block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('description', {
            required: 'Mô tả không được bỏ trống'
          })}
          rows={4}
          placeholder='Mô tả...'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.description ? 'visible' : 'invisible'}`}>
          {errors.description?.message}
        </div>
      </div>

      <div className='w-full flex justify-end'>
        <button
          type='submit'
          className='middle my-3 none center  rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          {addNewReasonQuery.isLoading ? <LoadingIcon /> : 'Thêm'}
        </button>
      </div>
    </form>
  )
}
export default AddReason
