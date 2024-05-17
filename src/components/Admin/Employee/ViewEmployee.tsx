import { ChangeEventHandler, EventHandler, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import permissionsList from '~/common/const/permissions'
import { REGEX_EMAIL } from '~/common/const/regexForm'
import useToast from '~/hooks/useToast'
import { DataEmployee } from '~/pages/Admin/Employee'
import { createEmployee } from '~/services/employee.service'
type FromType = {
  name: string
  department: string
  position: string
  phone: string
  email: string
  password: string
  address: string
  identificationNumber: string
}
interface CheckBoxValue {
  [value: string]: boolean
}
interface IProp {
  data: DataEmployee | undefined
  closeModal: () => void
}
const ViewEmployee = ({ data, closeModal }: IProp) => {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm<FromType>({ defaultValues: data })
  const { successNotification } = useToast()
  const [permissions, setPermissions] = useState(
    permissionsList.reduce((acc: CheckBoxValue, permission) => {
      acc[permission.value] = false
      return acc
    }, {})
  )
  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked
    }))
  }
  const getCheckedPermissions = () => {
    return Object.keys(permissions).filter((permission) => permissions[permission])
  }
  const onSubmit: SubmitHandler<FromType> = async (data) => {
    try {
      const response = await createEmployee({ ...data, permissions: getCheckedPermissions() })

      if (response) {
        successNotification('OK')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='items-center w-full rounded-lg  flex flex-wrap justify-between h-fit bg-white z-50 '
    >
      <div className='w-[100%] md:w-[48%] mt-5 relative'>
        <label className='font-bold '>
          Name<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Enter your name'
          {...register('name', {
            required: 'This field cannot be left blank'
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.name ? 'visible' : 'invisible'}`}>
          {errors.name?.message}
        </div>
      </div>
      <div className='w-[100%] md:w-[48%] mt-5 relative'>
        <label className='font-bold '>
          Email<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Enter your email'
          {...register('email', {
            required: 'This field cannot be left blank',
            pattern: {
              value: REGEX_EMAIL,
              message: 'You must enter a valid Gmail format.'
            }
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.email ? 'visible' : 'invisible'}`}>
          {errors.email?.message}
        </div>
      </div>
      <div className='w-[100%] md:w-[48%] mt-5 relative'>
        <label className='font-bold '>
          Department<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.department ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Enter your department'
          {...register('department', {
            required: 'This field cannot be left blank'
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.department ? 'visible' : 'invisible'}`}>
          {errors.department?.message}
        </div>
      </div>
      <div className='w-[100%] md:w-[48%] mt-5 relative'>
        <label className='font-bold '>
          Position<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.position ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Enter your position'
          {...register('position', {
            required: 'This field cannot be left blank'
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.position ? 'visible' : 'invisible'}`}>
          {errors.position?.message}
        </div>
      </div>
      <div className='w-[100%] md:w-[48%] mt-5 relative'>
        <label className='font-bold '>
          Address<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          type='text'
          placeholder='Enter your address'
          {...register('address', {
            required: 'This field cannot be left blank'
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.address ? 'visible' : 'invisible'}`}>
          {errors.address?.message}
        </div>
      </div>
      <div className='w-[100%] md:w-[48%] mt-5 relative'>
        <label className='font-bold '>
          Password<sup className='text-red-500'>*</sup>
        </label>
        <input
          className={`${errors.password ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          type='password'
          placeholder='Enter your password'
          {...register('password', {
            required: 'This field cannot be left blank'
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.password ? 'visible' : 'invisible'}`}>
          {errors.password?.message}
        </div>
      </div>
      <div className='w-[100%] mt-5 relative'>
        <label className='font-bold '>
          Permissions<sup className='text-red-500'>*</sup>
        </label>
        <div className='flex flex-wrap justify-between'>
          {permissionsList?.map((e) => (
            <div className='flex w-[100%] md:w-[48%] gap-4 items-center' key={e.id}>
              <input
                type='checkbox'
                name={e.value}
                className='rounded-sm'
                checked={permissions[e.value]}
                onChange={handleCheckboxChange}
              />
              <label>{e.title}</label>
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
          Add
        </button>
        <button
          type='button'
          className='middle my-3 none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d]  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
export default ViewEmployee
