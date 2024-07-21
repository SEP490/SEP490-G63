import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import permissionsList from '~/common/const/permissions'
import { REGEX_ADDRESS, REGEX_CCCD, REGEX_EMAIL, REGEX_NAME, REGEX_PHONE, REGEX_TEXT } from '~/common/const/regexForm'
import useToast from '~/hooks/useToast'
import { createEmployee } from '~/services/employee.service'
import debounce from 'lodash/debounce'
import { Button, Tooltip } from 'flowbite-react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import TooltipComponent from '~/components/BaseComponent/TooltipComponent'
import { currentDate } from '~/common/utils/formatDate'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import LoadingIcon from '~/assets/LoadingIcon'
import moment from 'moment'
type FromType = {
  password: string
  address: string
  department: string
  dob: string
  email: string
  gender: number
  identificationNumber: string
  name: string
  phone: string
  position: string
  permissions: string
}

interface IProp {
  closeModal: () => void
  refetch: any
}
const AddNewEmployee = ({ closeModal, refetch }: IProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>()
  const { successNotification, errorNotification } = useToast()
  const addNewEmployeeQuery = useMutation(createEmployee, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response) => {
      if (response.code == '00') {
        successNotification('Tạo nhân viên mới thành công')
        closeModal()
        refetch()
      } else {
        errorNotification('Số điện thoại hoặc email đã được sử dụng')
      }
    }
  })
  const onSubmit: SubmitHandler<FromType> = async (data) => {
    addNewEmployeeQuery.mutate({
      ...data,
      dob: data.dob ? moment(data.dob).format('DD/MM/YYYY') : data.dob,
      permissions: [data.permissions]
    })
  }

  return (
    <form
      onSubmit={handleSubmit(debounce(onSubmit, 300))}
      className='items-center w-full rounded-lg mt-2  flex flex-wrap justify-between h-fit bg-white z-50 '
    >
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-0 relative'>
        <label className=' flex items-center'>
          <div>
            Tên nhân viên <sup className='text-red-500'>*</sup>
          </div>
          <TooltipComponent
            content='Chỉ chứa kí tự chữ cái,khoảng trống, tối thiểu 8 và tối đa 30 kí tự'
            className='w-4 h-4 cursor-pointer'
            style='dark'
          />
        </label>
        <input
          className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Nhập tên nhân viên'
          {...register('name', {
            required: 'Tên không được bỏ trống',
            pattern: {
              value: REGEX_NAME,
              message: 'Tên nhân viên không hợp lệ'
            }
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.name ? 'visible' : 'invisible'}`}>
          {errors.name?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 sm:mt-0 relative'>
        <label className=' flex items-center'>
          <div>
            Phòng ban<sup className='text-red-500'>*</sup>
          </div>
          <TooltipComponent
            content='Chỉ chứa kí tự chữ cái,khoảng trống, tối thiểu 2 và tối đa 30 kí tự'
            className='w-4 h-4 cursor-pointer'
            style='dark'
          />
        </label>
        <input
          className={`${errors.department ? 'ring-red-600' : ''}  block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('department', {
            required: 'Phòng ban không được bỏ trống',
            pattern: {
              value: REGEX_TEXT,
              message: 'Phòng ban không hợp lệ'
            }
          })}
          placeholder='Phòng ban nhân viên'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.department ? 'visible' : 'invisible'}`}>
          {errors.department?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 md:mt-0     relative'>
        <label className=' flex items-center'>
          <div>
            Vị trí <sup className='text-red-500'>*</sup>
          </div>
          <TooltipComponent
            content='Chỉ chứa kí tự chữ cái,khoảng trống, tối thiểu 2 và tối đa 30 kí tự'
            className='w-4 h-4 cursor-pointer'
            style='dark'
          />
        </label>
        <input
          className={`${errors.position ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('position', {
            required: 'Vị trí không được bỏ trống',
            pattern: {
              value: REGEX_TEXT,
              message: 'Vị trí không hợp lệ'
            }
          })}
          placeholder='Nhập vị trí nhân viên'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.position ? 'visible' : 'invisible'}`}>
          {errors.position?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label>
          Email<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('email', {
            required: 'Email không được bỏ trống',
            pattern: {
              value: REGEX_EMAIL,
              message: 'Email không hợp lệ'
            }
          })}
          placeholder='abc@gmail.com'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.email ? 'visible' : 'invisible'}`}>
          {errors.email?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className=' flex items-center'>
          <div>
            CCCD/CMT <sup className='text-red-500'>*</sup>
          </div>
          <TooltipComponent
            content='Chỉ chứa số và có độ dài 12 ký tự'
            className='w-4 h-4 cursor-pointer'
            style='dark'
          />
        </label>
        <input
          className={`${errors.identificationNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('identificationNumber', {
            required: 'CCCD/CMT không được bỏ trống',
            pattern: {
              value: REGEX_CCCD,
              message: 'Số CCCD/CMT không hợp lệ'
            }
          })}
          placeholder='Nhập CCCD/CMT nhân viên'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.identificationNumber ? 'visible' : 'invisible'}`}>
          {errors.identificationNumber?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className=' flex items-center'>
          <div>
            Số điện thoại <sup className='text-red-500'>*</sup>
          </div>
          <TooltipComponent
            content='Bắt đầu bằng 03|05|07|08|09 và có 10 kí tự'
            className='w-4 h-4 cursor-pointer'
            style='dark'
          />
        </label>
        <input
          className={`${errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('phone', {
            required: 'Số điện thoại không được bỏ trống',
            pattern: {
              value: REGEX_PHONE,
              message: 'Số điện thoại không hợp lệ'
            }
          })}
          placeholder='Nhập số điện thoại nhân viên'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.phone ? 'visible' : 'invisible'}`}>
          {errors.phone?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className=' flex items-center'>
          <div>
            Địa chỉ <sup className='text-red-500'>*</sup>
          </div>
          <TooltipComponent
            content='Chứa ký tự chữ,số và có độ dài 2-80 ký tự'
            className='w-4 h-4 cursor-pointer'
            style='dark'
          />
        </label>
        <input
          className={`${errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('address', {
            required: 'Địa chỉ không được bỏ trống',
            pattern: {
              value: REGEX_ADDRESS,
              message: 'Địa chỉ không hợp lệ'
            }
          })}
          placeholder='Nhập địa chỉ nhân viên'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.address ? 'visible' : 'invisible'}`}>
          {errors.address?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label>
          Ngày sinh<sup className='text-red-500'>*</sup>
        </label>
        <input
          type='date'
          className={`${errors.dob ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('dob', {
            required: 'Ngày sinh không được bỏ trống',
            max: {
              value: currentDate(),
              message: 'Ngày sinh không hợp lệ'
            }
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.dob ? 'visible' : 'invisible'}`}>
          {errors.dob?.message}
        </div>
      </div>

      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label>Giới tính</label>
        <select
          className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('gender')}
        >
          <option value={0}>Nam</option>
          <option value={1}>Nữ</option>
        </select>
      </div>
      <div className='w-[100%] mt-5 relative'>
        <label>
          Quyền<sup className='text-red-500'>*</sup>
        </label>
        <div className='flex flex-wrap w-[70%] justify-between'>
          {permissionsList?.map((e) => (
            <div className='relative flex w-[100%] md:w-[48%] gap-4 items-center' key={e.id}>
              <input
                type='radio'
                {...register('permissions')}
                className='rounded-lg'
                value={e.value}
                defaultChecked={e.value == 'SALE'}
              />
              <label className='flex items-center gap-1'>
                {e.title}
                <TooltipComponent content={<div>{e.tooltip}</div>} className='w-4 h-4 cursor-pointer' style='dark' />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <button
          type='submit'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          {addNewEmployeeQuery.isLoading ? <LoadingIcon /> : 'Thêm'}
        </button>
      </div>
    </form>
  )
}
export default AddNewEmployee
