import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_EMAIL, REGEX_NAME, REGEX_PASSWORD, REGEX_PHONE, REGEX_TAX_NUMBER } from '~/common/const/regexForm'
import '../styles/login.css'
import { registerUser } from '~/services/user.service'
import useToast from '~/hooks/useToast'
import logo from '../assets/svg/Tdocman.svg'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getPrice } from '~/services/admin.contract.service'
import { useState } from 'react'
import LoadingPage from './shared/LoadingPage/LoadingPage'
type FromType = {
  company: string
  taxCode: string
  presenter: string
  email: string
  phone: string
  planpriceId: string
}
const Register = () => {
  const navigate = useNavigate()
  const [selectedPrice, setSelectedPrice] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { successNotification, errorNotification } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FromType>()
  // const { successNotification, errorNotification } = useToast()

  const onSubmit: SubmitHandler<FromType> = async (data) => {
    try {
      setLoading(true)
      const response = await registerUser(data)
      if (response) {
        successNotification('Đăng ký sử dụng dịch vụ Tdocman thành công')
      } else errorNotification('Đăng ký thất bại')
    } catch (error) {
      errorNotification('Lỗi hệ thống')
    } finally {
      setLoading(false)
    }
  }
  const { data: dataPrice, isLoading } = useQuery('data-price', getPrice, {
    onSuccess: (d) => {
      setSelectedPrice(d?.[0])
    }
  })
  const handleChangeOption = (e: any) => {
    setSelectedPrice(dataPrice?.find((d: any) => d.id == e.target.value))
  }
  if (isLoading || loading) return <LoadingPage />
  return (
    <div className='flex justify-center relative h-[100vh]  items-center bg-login-img bg-cover'>
      <div className='absolute inset-0 bg-black opacity-70 z-40'></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex-col items-center w-[90%] md:w-[50%] rounded-lg border max-h-[90vh] overflow-auto  flex px-4 h-fit bg-white z-50 py-4'
      >
        <div className='font-bold flex items-end justify-center w-[50%] my-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-[150%]'>
          <img src={logo} alt='logo' className='w-[20%]' />
          Docman
        </div>
        <div className='w-full flex flex-wrap md:justify-between'>
          {' '}
          <div className='w-full md:w-[48%] mt-5 relative'>
            <label className='font-bold '>
              Tên công ty<sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.company ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder='Công ty CP...'
              {...register('company', {
                required: 'Tên công ty không được để trống'
              })}
            />
            <div className={`text-red-500 absolute text-[12px] ${errors.company ? 'visible' : 'invisible'}`}>
              {errors.company?.message}
            </div>
          </div>
          <div className='w-full md:w-[48%] mt-5 relative'>
            <label className='font-bold '>
              Mã số thuế<sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.taxCode ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              type='text'
              placeholder='Nhập mã số thuế'
              {...register('taxCode', {
                required: 'Mã số thuế không được để trống',
                pattern: {
                  value: REGEX_TAX_NUMBER,
                  message: 'Mã số thuế không hợp lệ'
                }
              })}
            />
            <div className={`text-red-500 absolute text-[12px] ${errors.taxCode ? 'visible' : 'invisible'}`}>
              {errors.taxCode?.message}
            </div>
          </div>
          <div className='w-full  mt-5 relative'>
            <label className='font-bold '>
              Người đại diện<sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.presenter ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              type='text'
              placeholder='Tên người đại diện'
              {...register('presenter', {
                required: 'Tên người đại diện không được bỏ trống',
                pattern: {
                  value: REGEX_NAME,
                  message: 'Tên người đại diện không hợp lệ'
                }
              })}
            />
            <div className={`text-red-500 absolute text-[12px] ${errors.presenter ? 'visible' : 'invisible'}`}>
              {errors.presenter?.message}
            </div>
          </div>
          <div className='w-full  mt-5 relative'>
            <label className='font-bold '>
              Email<sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              type='text'
              placeholder='email@gmail.com'
              {...register('email', {
                required: 'Email không được bỏ trống',
                pattern: {
                  value: REGEX_EMAIL,
                  message: 'Email không hợp lệ'
                }
              })}
            />
            <div className={`text-red-500 absolute text-[12px] ${errors.email ? 'visible' : 'invisible'}`}>
              {errors.email?.message}
            </div>
          </div>
          <div className='w-full md:w-[48%] mt-5 relative'>
            <label className='font-bold '>
              Số điện thoại<sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              type='text'
              placeholder='Nhập số điện thoại'
              {...register('phone', {
                required: 'Số điện thoại không được bỏ trống',
                pattern: {
                  value: REGEX_PHONE,
                  message: 'Số điện thoại không hợp lệ'
                }
              })}
            />
            <div className={`text-red-500 absolute text-[12px] ${errors.phone ? 'visible' : 'invisible'}`}>
              {errors.phone?.message}
            </div>
          </div>
          <div className='w-full md:w-[48%] mt-5 relative'>
            <label className='font-bold '>
              Loại dịch vụ<sup className='text-red-500'>*</sup>
            </label>
            <select
              className={`${errors.planpriceId ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register('planpriceId', {
                required: 'Loại dịch vụ không được để trống'
              })}
              onChange={handleChangeOption}
            >
              {dataPrice?.map((d: any) => <option value={d.id}>{d.name}</option>)}
            </select>

            <div className={`text-red-500 absolute text-[12px] ${errors.planpriceId ? 'visible' : 'invisible'}`}>
              {errors.planpriceId?.message}
            </div>
          </div>
          <div className='w-full md:w-[48%] mt-5 relative'>
            <label className='font-bold '>Năm sử dụng</label>
            <input
              className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              disabled
              value={selectedPrice?.timeWithYears}
              hidden
            />
          </div>
          <div className='w-full md:w-[48%] mt-5 relative'>
            <label className='font-bold '>Giá tiền</label>
            <input
              className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              disabled
              value={selectedPrice?.price}
              hidden
            />
          </div>
        </div>

        <button
          type='submit'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Đăng ký
        </button>
        <div>
          Bạn đã có tài khoản?
          <span className='cursor-pointer text-blue-600 ' onClick={() => navigate('/login')}>
            Đăng nhập ngay
          </span>
        </div>
      </form>
    </div>
  )
}

export default Register
