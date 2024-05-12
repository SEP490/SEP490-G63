import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_EMAIL, REGEX_PASSWORD } from '~/common/const/regexForm'
import './index.css'
type FromType = {
  email: string
  password: string
}
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>()

  const onSubmit: SubmitHandler<FromType> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap'>
      <div className='w-[50%] mx-5 my-5'>
        <label>Email</label>
        <input
          className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Enter your email'
          {...register('email', {
            required: 'Trường này không để trống nhé baby',
            pattern: {
              value: REGEX_EMAIL,
              message: 'Email sai định dạng nhé baby'
            }
          })}
        />
        {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
      </div>
      <div className='w-[50%] mx-5 my-5'>
        <label>Password</label>
        <input
          className={`${errors.password ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          type='password'
          placeholder='Enter your password'
          {...register('password', {
            required: 'Trường này không để trống nhé baby',
            pattern: {
              value: REGEX_PASSWORD,
              message: 'Password cần ít nhất 1 ký tự hoa, thường và số'
            }
          })}
        />
        {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
      </div>
      <div className='w-[50%] mx-5 my-5 '>
        <div className='checkbox flex items-center'>
          <input name='checkbox' type='checkbox' />
          <span className='checkmark'></span>
          <div>Make this my default address</div>
        </div>
      </div>
      <div className='w-full'>
        <button
          type='submit'
          className='middle none center mr-4 rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Submit
        </button>
        <button
          className='middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Button
        </button>
        <button
          className='middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Button
        </button>
        <button
          className='middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Button
        </button>
        <button
          className='middle none center rounded-lg bg-orange-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Button
        </button>
      </div>
    </form>
  )
}

export default Form
