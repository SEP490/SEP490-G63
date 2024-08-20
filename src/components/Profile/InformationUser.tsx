import { SubmitHandler, useForm } from 'react-hook-form'
import avatar from '../../assets/images/avatar1.png'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getUserDetail, updateProfile } from '~/services/user.service'
import { useAuth } from '~/context/authProvider'
import useToast from '~/hooks/useToast'
import Loading from '~/components/shared/Loading/Loading'
import moment from 'moment'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import LoadingIcon from '~/assets/LoadingIcon'
import { IoSaveSharp } from 'react-icons/io5'

export interface UserData {
  id: string
  address: string
  avatar: string
  department: string
  dob: string
  email: string
  gender: boolean
  identificationNumber: string
  name: string
  phone: string
  position: string
}
const InformationUser = () => {
  const reader = new FileReader()
  const { user, setUser } = useAuth()
  const [imgUpload, setImgUpload] = useState<any>(avatar)
  const inputRef = useRef<any>()
  const { successNotification, errorNotification } = useToast()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserData>()

  const { data, isLoading, error } = useQuery(['userDetail', user?.id], () => getUserDetail(user?.id as string), {
    enabled: !!user?.id,
    onSuccess: (response) => {
      if (response.object) {
        reset({
          ...response.object,
          dob:
            response.object?.dob != null || response.object?.dob != 'null'
              ? moment(response.object?.dob).format('YYYY-MM-DD')
              : response.object?.dob,
          address:
            response.object?.address != null || response.object?.address != 'null' ? response.object?.address : '',
          department:
            response.object?.department != null || response.object?.department != 'null'
              ? response.object?.department
              : '',
          identificationNumber:
            response.object?.identificationNumber != null || response.object?.identificationNumber != 'null'
              ? response.object?.identificationNumber
              : '',
          position:
            response.object?.position != null || response.object?.position != 'null' ? response.object?.position : ''
        })
        setImgUpload(response.object?.avatar == null ? avatar : response.object?.avatar)
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    }
  })
  useEffect(() => {
    if (data?.object) {
      reset({
        ...data.object,
        dob: data.object?.dob != null ? moment(data.object?.dob).format('YYYY-MM-DD') : data.object?.dob
      })
      setImgUpload(data.object?.avatar == null ? avatar : data.object?.avatar)
    }
  }, [data, reset])

  const handleChangeImage = (event: any) => {
    const files = event.target.files

    reader.readAsDataURL(files[0])
    reader.addEventListener('load', (event) => {
      setImgUpload(event.target?.result)
    })
  }

  const onSubmit: SubmitHandler<UserData> = async (data: any) => {
    setLoading(true)
    try {
      const dataFormat = { ...data, dob: data.dob ? moment(data.dob).format('DD/MM/YYYY') : data.dob }
      const formData = new FormData()
      for (const key in dataFormat) {
        formData.append(key, dataFormat[key])
      }
      formData.append('file', inputRef.current.files[0])
      // console.log('file: ', inputRef.current.files[0])

      if (user?.id) {
        const response = await updateProfile({ id: user?.id, formData: formData })
        if (response.code == '00' && response.object) {
          setUser(response.object)
          successNotification('Chỉnh sửa thông tin người dùng thành công')
        } else {
          errorNotification('Chỉnh sửa thông tin người dùng không thành công')
        }
      }
    } catch (e) {
      errorNotification('Chỉnh sửa thông tin người dùng không thành cồng')
    } finally {
      setLoading(false)
    }
  }

  if (error) return <div>Lỗi hiển thị thông tin</div>

  return (
    <div className='w-full md:w-[80%] rounded-md shadow-md'>
      <Loading loading={isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center py-4 px-3 justify-center md:min-h-[70vh] bg-white rounded-md shadow-md'>
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
                    required: 'Tên nhân viên không được để trống'
                  })}
                />
                <div className={`text-red-500 absolute text-[12px] ${errors.name ? 'visible' : 'invisible'}`}>
                  {errors.name?.message}
                </div>
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
                <label className='font-semibold text-xs'>
                  CCCD/CMT<sup className='text-red-500'>*</sup>
                </label>
                <input
                  className={`${errors.identificationNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  placeholder='CCCD/CMT'
                  disabled
                  {...register('identificationNumber', {
                    required: 'CCCD/CMT không được để trống'
                  })}
                />
                <div
                  className={`text-red-500 absolute text-[12px] ${errors.identificationNumber ? 'visible' : 'invisible'}`}
                >
                  {errors.identificationNumber?.message}
                </div>
              </div>
              <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
                <label className='font-semibold text-xs'>
                  Số điện thoại<sup className='text-red-500'>*</sup>
                </label>
                <input
                  className={`${errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  placeholder='Số điện thoại'
                  disabled
                  {...register('phone', {
                    required: 'SĐT không được để trống'
                  })}
                />
                <div className={`text-red-500 absolute text-[12px] ${errors.phone ? 'visible' : 'invisible'}`}>
                  {errors.phone?.message}
                </div>
              </div>
              <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
                <label className='font-semibold text-xs'>
                  Địa chỉ<sup className='text-red-500'>*</sup>
                </label>
                <input
                  className={`${errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  placeholder='Địa chỉ'
                  {...register('address', {
                    required: 'Địa chỉ không được để trống'
                  })}
                />
                <div className={`text-red-500 absolute text-[12px] ${errors.address ? 'visible' : 'invisible'}`}>
                  {errors.address?.message}
                </div>
              </div>
              <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
                <label className='font-semibold text-xs'>
                  Ngày sinh<sup className='text-red-500'>*</sup>
                </label>

                <input
                  type='date'
                  className={`${errors.dob ? 'ring-red-600' : ''} text-xs block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  {...register('dob', {
                    required: 'Ngày sinh không được để trống'
                  })}
                />
                <div className={`text-red-500 absolute text-[12px] ${errors.dob ? 'visible' : 'invisible'}`}>
                  {errors.dob?.message}
                </div>
              </div>
              <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
                <label className='font-semibold text-xs'>
                  Giới tính<sup className='text-red-500'>*</sup>
                </label>
                <select
                  className={` text-xs block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  {...register('gender')}
                >
                  <option value={'true'}>Nam</option>
                  <option value={'false'}>Nữ</option>
                </select>
              </div>
              <div className='w-full flex justify-end'>
                <button
                  type='submit'
                  className='middle my-6 none center mr-4 text-xs rounded-lg bg-[#0070f4] py-2 px-4 font-sans font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  data-ripple-light='true'
                >
                  {loading ? (
                    <LoadingIcon />
                  ) : (
                    <div className='flex items-center'>
                      <IoSaveSharp className='mr-1' />
                      Lưu
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Loading>
    </div>
  )
}
export default InformationUser
