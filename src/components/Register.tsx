import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_EMAIL, REGEX_PASSWORD } from '~/common/const/regexForm'
import '../css/login.css'
import { login } from '~/services/user.service'
import { getAccessToken, setAccessToken } from '~/config/accessToken'
import useToast from '~/hooks/useToast'
import logo from '../assets/svg/Tdocman.svg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/provider/authProvider'
type FromType = {
  company: string
  taxCode: string
  firstName: string
  lastName: string
  email: string
  phone: string
}
const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>()
  // const { successNotification, errorNotification } = useToast()

  const onSubmit: SubmitHandler<FromType> = async (data) => {
    try {
      // const response = await register(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center relative h-[100vh]  items-center bg-login-img bg-cover'>
      <div className='absolute inset-0 bg-black opacity-70 z-40'></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex-col items-center w-[90%] md:w-[50%] rounded-lg border max-h-[90vh] overflow-auto  flex px-4 h-fit bg-white z-50 py-4'
        autoComplete='on'
      >
        <div className='font-bold flex items-end justify-center w-[50%] my-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-[150%]'>
          <img src={logo} alt='logo' className='w-[20%]' />
          Docman
        </div>

        <div className='w-full mt-5 relative'>
          <label className='font-bold '>
            Company<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.company ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Enter your company'
            {...register('company', {
              required: 'This field cannot be left blank',
              pattern: {
                value: REGEX_EMAIL,
                message: 'You must enter a valid Gmail format.'
              }
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.company ? 'visible' : 'invisible'}`}>
            {errors.company?.message}
          </div>
        </div>
        <div className='w-full  mt-5 relative'>
          <label className='font-bold '>
            Tax Code<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.taxCode ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Enter your Tax Code'
            {...register('taxCode', {
              required: 'This field cannot be left blank'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.taxCode ? 'visible' : 'invisible'}`}>
            {errors.taxCode?.message}
          </div>
        </div>
        <div className='w-full  mt-5 relative'>
          <label className='font-bold '>
            First name<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.firstName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Enter your Tax Code'
            {...register('firstName', {
              required: 'This field cannot be left blank'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.firstName ? 'visible' : 'invisible'}`}>
            {errors.firstName?.message}
          </div>
        </div>
        <div className='w-full  mt-5 relative'>
          <label className='font-bold '>
            Last Name<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.lastName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Enter your Tax Code'
            {...register('lastName', {
              required: 'This field cannot be left blank'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.lastName ? 'visible' : 'invisible'}`}>
            {errors.lastName?.message}
          </div>
        </div>
        <div className='w-full  mt-5 relative'>
          <label className='font-bold '>
            Email<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Enter your Tax Code'
            {...register('email', {
              required: 'This field cannot be left blank'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.email ? 'visible' : 'invisible'}`}>
            {errors.email?.message}
          </div>
        </div>
        <div className='w-full  mt-5 relative'>
          <label className='font-bold '>
            Phone<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Enter your Tax Code'
            {...register('phone', {
              required: 'This field cannot be left blank'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.phone ? 'visible' : 'invisible'}`}>
            {errors.phone?.message}
          </div>
        </div>
        <button
          type='submit'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Register
        </button>
        <div>
          You have account?
          <span className='cursor-pointer text-blue-600 ' onClick={() => navigate('/login')}>
            Login now
          </span>
        </div>
      </form>
    </div>
  )
}

export default Register
