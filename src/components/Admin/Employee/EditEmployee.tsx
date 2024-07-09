import { ChangeEventHandler, EventHandler, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import permissionsList from '~/common/const/permissions'
import { REGEX_EMAIL } from '~/common/const/regexForm'
import useToast from '~/hooks/useToast'
import { DataEmployee } from '~/pages/Admin/Employee'
import { createEmployee } from '~/services/employee.service'
import { updateProfile } from '~/services/user.service'
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
  data: DataEmployee | undefined
  closeModal: () => void
  refetch: any
}
const EditEmployee = ({ data, closeModal, refetch }: IProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>({ defaultValues: { ...data, permissions: data?.permissions?.slice(1, -1) } })
  const { successNotification, errorNotification } = useToast()
  const onSubmit: SubmitHandler<FromType> = async (dataForm) => {
    try {
      const response = await updateProfile(data?.id as string, { ...dataForm, permissions: [dataForm.permissions] })
      if (response.code == '00' && response.object) {
        successNotification('Chỉnh sửa thông tin người dùng thành công')
        closeModal()
        refetch()
      } else errorNotification('Chỉnh sửa thông tin người dùng thất bại')
    } catch (error) {
      console.log(error)
      errorNotification('Lỗi hệ thống')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='items-center w-full rounded-lg  flex flex-wrap  justify-between h-fit bg-white z-50 '
    >
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>
          Tên nhân viên <sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Nhập tên nhân viên'
          {...register('name', {
            required: 'Tên không được bỏ trống'
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.name ? 'visible' : 'invisible'}`}>
          {errors.name?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>Phòng ban</label>
        <input
          className={`block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('department')}
          placeholder='Nhập phòng ban nhân viên'
        />
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>Vị trí</label>
        <input
          className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('position')}
          placeholder='Nhập vị trí nhân viên'
        />
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>
          Email<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('email', {
            required: 'Email không được bỏ trống'
          })}
          placeholder='Nhập email của nhân viên'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.email ? 'visible' : 'invisible'}`}>
          {errors.email?.message}
        </div>
      </div>

      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>CCCD/CMT</label>
        <input
          className={`${errors.identificationNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('identificationNumber')}
          placeholder='Nhập CCCD/CMT nhân viên'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.identificationNumber ? 'visible' : 'invisible'}`}>
          {errors.identificationNumber?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>
          Số điện thoại <sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('phone', {
            required: 'Số điện thoại không được bỏ trống'
          })}
          placeholder='Nhập số điện thoại nhân viên'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.phone ? 'visible' : 'invisible'}`}>
          {errors.phone?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>Địa chỉ</label>
        <input
          className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('address')}
          placeholder='Nhập địa chỉ nhân viên'
        />
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>Ngày sinh</label>
        <input
          type='date'
          className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('dob')}
        />
      </div>

      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>Giới tính</label>
        <select
          className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('gender')}
        >
          <option value={0}>Nam</option>
          <option value={1}>Nữ</option>
        </select>
      </div>
      <div className='w-[100%] mt-5 relative'>
        <label className='font-bold '>
          Quyền<sup className='text-red-500'>*</sup>
        </label>
        <div className='flex flex-wrap w-[70%] justify-between'>
          {permissionsList?.map((e) => (
            <div className='flex w-[100%] md:w-[48%] gap-4 items-center' key={e.id}>
              <input
                type='radio'
                className='rounded-lg'
                {...register('permissions', {
                  required: true
                })}
                value={e.value}
              />
              <label>{e.title}</label>
            </div>
          ))}
        </div>
        <div className={`text-red-500 absolute text-[12px] ${errors.permissions ? 'visible' : 'invisible'}`}>
          Hãy chọn quyền cho nhân viên
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <button
          type='submit'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Sửa
        </button>
      </div>
    </form>
  )
}
export default EditEmployee
