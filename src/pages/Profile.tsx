import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_EMAIL } from '~/common/const/regexForm'
import { dataUser } from '~/common/dataConfig'
import avatar from '../assets/images/avatar1.png'
import { useEffect, useMemo, useRef, useState } from 'react'
import moment from 'moment'
import { updateProfile } from '~/services/user.service'
export interface UserData {
  id: string
  address: string
  avatar: string
  department: string
  dob: string
  email: string
  gender: number
  identification_number: string
  name: string
  phone: string
  position: string
}
const Profile = () => {
  const reader = new FileReader()
  const [data, setData] = useState<any>(dataUser)
  const [imgUpload, setImgUpload] = useState<any>(
    useMemo(() => {
      if (data) return data?.avatar
      return avatar
    }, [data])
  )
  const inputRef = useRef<any>()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<UserData>({
    defaultValues: useMemo(() => {
      return { ...data, dob: moment(data.dob).format('YYYY-MM-DD') }
    }, [data])
  })
  const handleChangeImage = (event: any) => {
    const files = event.target.files

    reader.readAsDataURL(files[0])
    reader.addEventListener('load', (event) => {
      setImgUpload(event.target?.result)
    })
  }
  useEffect(() => {
    setData(dataUser)
  }, [])
  const onSubmit: SubmitHandler<UserData> = async (data: UserData) => {
    try {
      const formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      formData.append('file', inputRef.current.files[0].toString())
      console.log(inputRef.current.files)
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      const response = await updateProfile('34d43a12-e45f-49ce-a72f-80db9e4051f3', formData)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <p className='font-bold text-[28px] my-4 mx-4'>Thông tin tài khoản</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-wrap py-4 px-3 justify-center'>
          <div className=' flex md:w-[20%] px-3 flex-col items-center justify-center '>
            <img src={imgUpload} className='w-[200px] h-[200px] object-cover rounded-[50%]' />
            <input type='file' ref={inputRef} accept='.jpg, .png' onChange={handleChangeImage} className='hidden' />
            <div className='flex justify-center gap-1 '>
              {imgUpload == avatar ? (
                <button
                  type='button'
                  onClick={() => inputRef.current?.click()}
                  className=' my-3 none center mr-4 rounded-lg bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                >
                  Tải ảnh
                </button>
              ) : (
                <>
                  <button
                    type='button'
                    onClick={() => inputRef.current?.click()}
                    className=' my-3 none center mr-4 rounded-lg bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  >
                    Thay ảnh
                  </button>
                  <button
                    type='button'
                    onClick={() => setImgUpload(avatar)}
                    className='middle my-3 none center mr-4 rounded-lg bg-[#49484d] py-2 px-4 font-sans text-xs font-bold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  >
                    Xóa ảnh
                  </button>
                </>
              )}
            </div>
          </div>
          <div className=' w-full px-5 md:w-[80%] shadow-md bg-white sm:rounded-md items-center flex flex-wrap justify-between'>
            <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
              <label className='font-bold '>
                Tên nhân viên <sup className='text-red-500'>*</sup>
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
            <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
              <label className='font-bold '>Phòng ban</label>
              <input
                className={`block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                {...register('department')}
              />
            </div>
            <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
              <label className='font-bold '>Vị trí</label>
              <input
                className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                {...register('position')}
              />
            </div>
            <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
              <label className='font-bold '>
                Email<sup className='text-red-500'>*</sup>
              </label>
              <input
                className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                {...register('email')}
                disabled
                hidden
              />
            </div>
            <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
              <label className='font-bold '>CCCD/CMT</label>
              <input
                className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                {...register('identification_number')}
              />
            </div>
            <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
              <label className='font-bold '>Số điện thoại</label>
              <input
                className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                {...register('phone')}
              />
            </div>
            <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
              <label className='font-bold '>Địa chỉ</label>
              <input
                className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                {...register('address')}
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
            <div className='w-full flex justify-end'>
              <button
                type='submit'
                className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                data-ripple-light='true'
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Profile
