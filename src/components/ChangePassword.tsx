import { useForm } from 'react-hook-form'
import dataRegex from '../regex.json'
import { useMutation } from 'react-query'
import { changePassword } from '~/services/user.service'
import { useAuth } from '~/context/authProvider'
import { AxiosError } from 'axios'
import useToast from '~/hooks/useToast'
import { useNavigate } from 'react-router-dom'
type FormType = {
  email: string
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}
const ChangePassword = () => {
  const { user } = useAuth()
  const { successNotification, errorNotification } = useToast()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: { email: user?.email ? user.email : '', oldPassword: '', newPassword: '', confirmNewPassword: '' }
  })
  const navigate = useNavigate()
  const changePasswordQuery = useMutation(changePassword, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || error.message || 'Hệ thống lỗi')
    },
    onSuccess: (response) => {
      if (response.code == '03') {
        errorNotification('Không tìm thấy người dùng')
      } else {
        successNotification('Thay đổi mật khẩu thành công')
      }
    }
  })
  const onSubmit = async (data: any) => {
    changePasswordQuery.mutate(data)
  }
  return (
    <div className='bg-[#e8eaed] h-full flex justify-center items-center'>
      <div className='w-[90%] sm:w-[80%] min-h-[90%] bg-white rounded-md flex justify-around flex-wrap items-center'>
        <div className='font-bold text-[32px] w-full text-center'>Đổi mật khẩu</div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] md:w-[50%] flex justify-center flex-wrap'>
          <div className='w-full relative'>
            <label className='font-light '>
              Email<sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder='abc@gmail.com'
              disabled={user?.email != undefined}
              {...register('email', {
                required: 'Email không được để trống',
                pattern: {
                  value: user?.email == undefined ? new RegExp(dataRegex.REGEX_EMAIL, 'i') : new RegExp(''),
                  message: 'Email không đúng định dạng'
                }
              })}
            />
            <div className={`text-red-500 absolute text-[12px]  ${errors.email ? 'visible' : 'invisible'}`}>
              {errors.email?.message}
            </div>
          </div>
          <div className='w-full mt-5 relative'>
            <label className='font-light '>
              Mật khẩu cũ<sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.oldPassword ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder='************'
              type='password'
              {...register('oldPassword', {
                required: 'Mật khẩu cũ không được để trống'
              })}
            />
            <div className={`text-red-500 absolute text-[12px]  ${errors.oldPassword ? 'visible' : 'invisible'}`}>
              {errors.oldPassword?.message}
            </div>
          </div>
          <div className='w-full mt-5 relative'>
            <label className='font-light '>
              Mật khẩu mới<sup className='text-red-500'>*</sup>
            </label>
            <div className='flex justify-between'>
              <input
                className={`${errors.newPassword ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                placeholder='************'
                type='password'
                {...register('newPassword', {
                  required: 'Mật khẩu mới không được để trống',
                  pattern: {
                    value: new RegExp(dataRegex.REGEX_PASSWORD),
                    message: 'Mật khẩu không đúng định dạng'
                  }
                })}
              />
            </div>
            <div className={`text-gray-300 text-[12px]`}>
              <span
                className={`${watch('newPassword')?.length >= 8 && watch('newPassword').length <= 16 ? 'text-green-500' : ''}`}
              >
                8-16 ký tự
              </span>
              ,
              <span className={`${new RegExp(dataRegex.SPEC_CHAR).test(watch('newPassword')) ? 'text-green-500' : ''}`}>
                chứa 1 kí tự đặc biệt
              </span>
              ,
              <span className={`${new RegExp(dataRegex.CHAR2).test(watch('newPassword')) ? 'text-green-500' : ''}`}>
                1 chữ hoa
              </span>
              ,
              <span className={`${new RegExp(dataRegex.CHAR1).test(watch('newPassword')) ? 'text-green-500' : ''}`}>
                1 chữ thường
              </span>
              ,
              <span className={`${new RegExp(dataRegex.NUMBER).test(watch('newPassword')) ? 'text-green-500' : ''}`}>
                1 kí tự số
              </span>
            </div>
            <div className={`text-red-500 absolute text-[12px]  ${errors.newPassword ? 'visible' : 'invisible'}`}>
              {errors.newPassword?.message}
            </div>
          </div>
          <div className='w-full mt-5 relative'>
            <label className='font-light '>
              Xác nhận mật khẩu mới<sup className='text-red-500'>*</sup>
            </label>
            <div className='flex justify-between'>
              <input
                className={`${errors.confirmNewPassword ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                placeholder='************'
                type='password'
                {...register('confirmNewPassword', {
                  required: 'Xác nhận mật khẩu mới không được để trống',
                  validate: {
                    positive: (v, formValues) => v == formValues.newPassword || 'Xác thực mật khẩu không đúng'
                  }
                })}
              />
            </div>

            <div
              className={`text-red-500 absolute text-[12px]  ${errors.confirmNewPassword ? 'visible' : 'invisible'}`}
            >
              {errors.confirmNewPassword?.message}
            </div>
          </div>
          <div className='w-full mt-5'>
            <button
              type='submit'
              className='text-center w-full my-3 none center mr-4  bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              data-ripple-light='true'
            >
              Xác nhận
            </button>
          </div>
          <div className='w-full  flex justify-center'>
            <div
              onClick={() => {
                navigate('/')
              }}
              className='cursor-pointer text-blue-500 hover:underline w-fit'
            >
              Đăng nhập
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default ChangePassword
