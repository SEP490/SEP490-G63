import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_EMAIL, REGEX_PASSWORD } from '~/common/const/regexForm'
import '../css/login.css'
import { login } from '~/services/user.service'
import { getAccessToken, setAccessToken } from '~/config/accessToken'
import useToast from '~/hooks/useToast'
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
    <div className='flex justify-center'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[50%] flex flex-wrap' autoComplete='on'>
        <div className='w-full mx-5 my-5'>
          <label>Email</label>
          <input
            className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Enter your email'
            {...register('email', {
              required: 'This field cannot be left blank',
              pattern: {
                value: REGEX_EMAIL,
                message: 'You must enter a valid Gmail format.'
              }
            })}
          />
          <div className={`text-red-500 ${errors.email ? 'visible' : 'invisible'}`}>{errors.email?.message}</div>
        </div>
        <div className='w-full mx-5 my-5'>
          <label>Password</label>
          <input
            className={`${errors.password ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='password'
            placeholder='Enter your password'
            {...register('password', {
              required: 'This field cannot be left blank'
              // pattern: {
              //   value: REGEX_PASSWORD,
              //   message:
              //     'Password requires: 1 special character, uppercase & lowercase letters, 1 digit, minimum 8 characters.'
              // }
            })}
          />
          {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
        </div>
        <div className='w-full mx-5 my-5 '>
          <div className='checkbox flex items-center'>
            <input name='checkbox' type='checkbox' />
            <span className='checkmark'></span>
            <div>Make this my default address</div>
          </div>
        </div>

        <button
          type='submit'
          className='middle none center mr-4 rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
