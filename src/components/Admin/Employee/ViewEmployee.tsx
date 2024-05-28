import { ChangeEventHandler, EventHandler, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import permissionsList from '~/common/const/permissions'
import { REGEX_EMAIL } from '~/common/const/regexForm'
import useToast from '~/hooks/useToast'
import { DataEmployee } from '~/pages/Admin/Employee'
import { createEmployee } from '~/services/employee.service'
type FromType = {
  password: string
  address: string
  department: string
  dob: string
  email: string
  gender: number
  identification_number: string
  name: string
  phone: string
  position: string
}
interface CheckBoxValue {
  [value: string]: boolean
}
interface IProp {
  data: DataEmployee | undefined
  onClose: () => void
}
const ViewEmployee = ({ data, onClose }: IProp) => {
  const {
    register,
    formState: { errors }
  } = useForm<FromType>({ defaultValues: data })
  const [permissions, setPermissions] = useState(
    permissionsList.reduce((acc: CheckBoxValue, permission) => {
      acc[permission.value] =
        data?.permissions
          ?.slice(1, -1)
          .split(',')
          .find((d) => d == permission.value) != undefined
      return acc
    }, {})
  )

  return (
    <form className='items-center w-full rounded-lg  flex flex-wrap justify-between h-fit bg-white z-50 '>
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
          disabled
          hidden
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
          disabled
          hidden
        />
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>Vị trí</label>
        <input
          className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('position')}
          placeholder='Nhập vị trí nhân viên'
          disabled
          hidden
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
          disabled
          hidden
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.email ? 'visible' : 'invisible'}`}>
          {errors.email?.message}
        </div>
      </div>

      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>
          CCCD/CMT <sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.identification_number ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('identification_number', {
            required: 'CCCD/CMT không được bỏ trống'
          })}
          placeholder='Nhập CCCD/CMT nhân viên'
          disabled
          hidden
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.identification_number ? 'visible' : 'invisible'}`}>
          {errors.identification_number?.message}
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
          disabled
          hidden
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
          disabled
          hidden
        />
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>Ngày sinh</label>
        <input
          type='date'
          className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('dob')}
          disabled
          hidden
        />
      </div>

      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className='font-bold '>Giới tính</label>
        <select
          className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('gender')}
          disabled
          hidden
        >
          <option value={0}>Nam</option>
          <option value={1}>Nữ</option>
        </select>
      </div>
      <div className='w-[100%] mt-5 relative'>
        <label className='font-bold '>
          Quyền<sup className='text-red-500'>*</sup>
        </label>
        <div className='flex flex-wrap justify-between'>
          {permissionsList?.map((e) => (
            <div className='flex w-[100%] md:w-[48%] gap-4 items-center' key={e.id}>
              <input type='checkbox' name={e.value} className='rounded-sm' checked={permissions[e.value]} disabled />
              <label>{e.title}</label>
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}
export default ViewEmployee
