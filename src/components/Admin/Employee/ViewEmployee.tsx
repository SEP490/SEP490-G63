import { SubmitHandler, useForm } from 'react-hook-form'
import permissions from '~/common/const/permissions'
import { REGEX_EMAIL } from '~/common/const/regexForm'
type FromType = {
  name: string
  department: string
  position: string
  phone: string
  email: string
  password: string
}
const ViewEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>()
  const onSubmit: SubmitHandler<FromType> = (data) => {
    console.log(data)
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
          {permissions?.map((e) => (
            <div className='flex w-[100%] md:w-[48%] gap-4 items-center' key={e.id}>
              <input type='checkbox' className='rounded-sm' />
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
