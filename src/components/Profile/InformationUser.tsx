import { SubmitHandler, useForm } from 'react-hook-form'
import { REGEX_EMAIL } from '~/common/const/regexForm'
import { dataUser } from '~/common/dataConfig'
import avatar from '../../assets/images/avatar.png'
import { useEffect, useMemo, useRef, useState } from 'react'
import moment from 'moment'
import { getUserDetail, updateProfile } from '~/services/user.service'
import { useAuth } from '~/provider/authProvider'
import useToast from '~/hooks/useToast'
import Loading from '~/components/shared/Loading/Loading'
import { log } from 'console'
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
const InformationUser = () => {
  const reader = new FileReader()
  const [data, setData] = useState<any>()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [imgUpload, setImgUpload] = useState<any>(avatar)
  const inputRef = useRef<any>()
  const { successNotification, errorNotification } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<UserData>({
    defaultValues: useMemo(() => {
      return data
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
    async function fetchAPI() {
      try {
        if (user?.id) {
          const response = await getUserDetail(user?.id)
          if (response.object) {
            setData(response.object)

            reset(response.object)
            setImgUpload(response.object?.avatar == null ? avatar : response.object?.avatar)
            setLoading(false)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchAPI()
  }, [])
  if (loading) return <Loading />
  const onSubmit: SubmitHandler<UserData> = async (data: any) => {
    try {
      const formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      formData.append('file', inputRef.current.files[0])
      console.log('file', inputRef.current.files[0])
      console.log('formData', formData)

      if (user?.id) {
        const response = await updateProfile(user?.id, formData)
        if (response.code == '00' && response.object) {
          console.log(response)

          successNotification('Chỉnh sửa thông tin người dùng thành công')
        } else {
          errorNotification('Chỉnh sửa thông tin người dùng không thành công')
        }
      }
    } catch (e) {
      errorNotification('Chỉnh sửa thông tin người dùng không thành cồng')
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[80%]'>
      <div className='flex flex-col items-center mx-3 py-4 px-3 justify-center bg-white rounded-md shadow-md'>
        <div className=' flex w-full px-3 flex-col items-center justify-center '>
          <img src={imgUpload} className='w-[100px] h-[100px] object-cover rounded-[50%]' />
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
        <div className=' w-full px-5  bg-white sm:rounded-md items-center flex flex-wrap justify-between'>
          <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
            <label className='font-semibold text-xs'>
              Tên nhân viên <sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder='Nhập tên nhân viên'
              {...register('name', {
                required: 'This field cannot be left blank'
              })}
            />
            <div className={`text-red-500 absolute text-[12px] ${errors.name ? 'visible' : 'invisible'}`}>
              {errors.name?.message}
            </div>
          </div>
          <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
            <label className='font-semibold text-xs'>Phòng ban</label>
            <input
              className={`block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register('department')}
            />
          </div>
          <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
            <label className='font-semibold text-xs'>Vị trí</label>
            <input
              className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register('position')}
            />
          </div>
          <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
            <label className='font-semibold text-xs'>
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
            <label className='font-semibold text-xs'>CCCD/CMT</label>
            <input
              className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register('identification_number')}
            />
          </div>
          <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
            <label className='font-semibold text-xs'>Số điện thoại</label>
            <input
              className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register('phone')}
            />
          </div>
          <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
            <label className='font-semibold text-xs'>Địa chỉ</label>
            <input
              className={` block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register('address')}
            />
          </div>
          <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
            <label className='font-semibold text-xs'>Ngày sinh</label>
            <input
              type='date'
              className={`text-xs block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register('dob')}
            />
          </div>
          <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
            <label className='font-semibold text-xs'>Giới tính</label>
            <select
              className={`text-xs block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register('gender')}
              defaultValue={data?.gender}
            >
              <option value={0}>Nam</option>
              <option value={1}>Nữ</option>
            </select>
          </div>
          <div className='w-full flex justify-end'>
            <button
              type='submit'
              className='middle my-3 none center mr-4 text-xs rounded-lg bg-[#0070f4] py-2 px-4 font-sans font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              data-ripple-light='true'
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
export default InformationUser
