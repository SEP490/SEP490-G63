import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_EMAIL, REGEX_PASSWORD } from '~/common/const/regexForm'
import '../css/login.css'
import { login } from '~/services/user.service'
import { getAccessToken, setAccessToken } from '~/config/accessToken'
import useToast from '~/hooks/useToast'
import logo from '../assets/svg/Tdocman.svg'
type FromType = {
  email: string
  password: string
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>()
  const { successNotification, errorNotification } = useToast()

  const onSubmit: SubmitHandler<FromType> = async (data) => {
    try {
      const response = await login(data)
      if (response) {
        setAccessToken(response?.access_token)
        successNotification('Login OK nhé')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center relative h-[100vh] items-center bg-login-img bg-cover'>
      <div className='absolute inset-0 bg-black opacity-70 z-40'></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex-col items-center w-[90%] md:w-[30%] rounded-lg border flex flex-wrap px-4 h-fit bg-white z-50 py-4'
        autoComplete='on'
      >
        <div className='font-bold flex items-end justify-center w-[50%] my-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-[150%]'>
          <img src={logo} alt='logo' className='w-[20%]' />
          Docman
        </div>

        <div className='w-full mt-5 relative'>
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
          <div className={`text-red-500 absolute ${errors.email ? 'visible' : 'invisible'}`}>
            {errors.email?.message}
          </div>
        </div>
        <div className='w-full  mt-5 relative'>
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
          <div className={`text-red-500 absolute ${errors.password ? 'visible' : 'invisible'}`}>
            {errors.password?.message}
          </div>
        </div>
        <div className='w-full'>
          <div className='cursor-pointer text-blue-600 text-[14px]'>Forgot password?</div>
        </div>
        <button
          type='submit'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Login
        </button>
        <div>
          Don't have a company yet?
          <span className='cursor-pointer text-blue-600 '> Register now</span>
        </div>
      </form>
    </div>
  )
}

export default Login
