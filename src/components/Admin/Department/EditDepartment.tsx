import LoadingIcon from '~/assets/LoadingIcon'
import dataRegex from '../../../regex.json'
import { SubmitHandler, useForm } from 'react-hook-form'
import useToast from '~/hooks/useToast'
import { useMutation } from 'react-query'
import { updateDepartment } from '~/services/department.service'
import { AxiosError } from 'axios'
import { debounce } from 'lodash'
import TooltipComponent from '~/components/BaseComponent/TooltipComponent'
type FromType = {
  title: string
  description: string
}
const EditDepartment = ({ data, closeModal, refetch }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>({ defaultValues: data })
  const { successNotification, errorNotification } = useToast()
  const editDepartmentQuery = useMutation(updateDepartment, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response) => {
      if (response.code == '00') {
        successNotification('Tạo nhân viên mới thành công')
        closeModal()
        refetch()
      } else {
        errorNotification('Số điện thoại hoặc email hoặc CCCD/CMT đã được sử dụng')
      }
    }
  })

  const onSubmit: SubmitHandler<FromType> = async (data) => {
    editDepartmentQuery.mutate(data)
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
          placeholder='Phòng ban...'
          {...register('title', {
            required: 'Tên không được bỏ trống',
            pattern: {
              value: new RegExp(dataRegex.REGEX_NAME),
              message: 'Tên phòng ban không hợp lệ'
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
          {editDepartmentQuery.isLoading ? <LoadingIcon /> : 'Sửa'}
        </button>
      </div>
    </form>
  )
}
export default EditDepartment
