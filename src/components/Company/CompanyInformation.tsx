import { AxiosError } from 'axios'
import { debounce } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import LoadingIcon from '~/assets/LoadingIcon'
import { useAuth } from '~/context/authProvider'
import useToast from '~/hooks/useToast'
import { VietQR } from 'vietqr'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import { createParty, getParty } from '~/services/party.service'
import { GrUpdate } from 'react-icons/gr'
import { validatePhone } from '~/services/auth-sign-contract.service'
import LoadingSvgV2 from '~/assets/svg/loadingsvg'

interface CompanyInfo {
  name: string
  email: string
  address: string
  taxNumber: string
  presenter: string
  position: string
  businessNumber: string
  bankId: string
  bankName: string
  bankAccOwer: string
  phone: string
}
const CompanyInformation = () => {
  const { successNotification, errorNotification } = useToast()
  const { user } = useAuth()
  const [loadingPhone, setLoadingPhone] = useState(false)
  const { register, reset, getValues, setError, handleSubmit, formState } = useForm<CompanyInfo>({
    defaultValues: { email: user?.email }
  })
  const currentPhone = useRef('')
  const updateNewParty = useMutation(createParty, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response: any) => {
      if (response.code == '00') {
        successNotification('Sửa thành công')
      } else {
        errorNotification('Sửa thất bại')
      }
    }
  })
  const [banks, setBanks] = useState([])
  const clientID = '258d5960-4516-48c5-9316-bb95b978424f'
  const apiKey = '5fe49afb-2e07-4079-baf6-ca58356deadd'
  const onSubmit: SubmitHandler<CompanyInfo> = async (data: CompanyInfo) => {
    updateNewParty.mutate(data)
  }
  useEffect(() => {
    const vietQR = new VietQR({
      clientID,
      apiKey
    })

    vietQR
      .getBanks()
      .then((response: { data: SetStateAction<never[]> }) => {
        setBanks(response.data)
      })
      .catch((err: any) => {
        console.error('Error fetching banks:', err)
      })
  }, [])
  const handleCheckPhone = async () => {
    if (currentPhone.current != getValues('phone').trim()) {
      setLoadingPhone(true)
      try {
        const response = await validatePhone(getValues('phone').trim())
        if (response) {
          errorNotification('Số điện thoại đã tồn tại')
          setError('phone', { message: 'Số điện thoại đã tồn tại' })
        }
      } catch (e) {
        errorNotification('Lỗi')
      }
      setLoadingPhone(false)
    }
  }
  useQuery('party-data', getParty, {
    onSuccess: (response) => {
      if (response.object) {
        currentPhone.current = response.object.phone
        reset(response.object)
      }
    }
  })
  return (
    <div className='bg-[#e8eaed] h-full flex justify-center items-center overflow-auto'>
      <form
        onSubmit={handleSubmit(debounce(onSubmit, 300))}
        className='items-center w-[80%] rounded-lg mt-2 p-4 flex flex-wrap justify-between h-fit bg-white z-10 '
      >
        <div className='w-full'>
          <div className='font-bold'>Thông tin công ty</div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Mã số thuế<sup className='text-red-500'>*</sup>
          </label>
          <div className='relative'>
            <input
              className={`${formState.errors.taxNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
              type='text'
              disabled={updateNewParty?.isLoading}
              placeholder='Nhập mã số thuế'
              {...register('taxNumber', {
                required: 'Mã số thuế không được để trống'
              })}
            />
          </div>

          <div className={`text-red-500 absolute text-[12px] ${formState.errors.taxNumber ? 'visible' : 'invisible'}`}>
            {formState.errors.taxNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên công ty<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formState.errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={updateNewParty?.isLoading}
            placeholder='Nhập tên công ty'
            {...register('name', {
              required: 'Tên công ty không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${formState.errors.name ? 'visible' : 'invisible'}`}>
            {formState.errors.name?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số điện thoại<sup className='text-red-500'>*</sup>
          </label>
          <div className='relative'>
            <input
              className={`${formState.errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
              type='text'
              disabled={updateNewParty?.isLoading}
              placeholder='Nhập số điện thoại'
              {...register('phone', {
                required: 'Số điện thoại không được để trống',
                onBlur: handleCheckPhone
              })}
            />{' '}
            <div className='absolute z-10 right-1 top-0 h-full flex items-center'>
              {loadingPhone && <LoadingSvgV2 />}
            </div>
          </div>
          <div className={`text-red-500 absolute text-[12px] ${formState.errors.phone ? 'visible' : 'invisible'}`}>
            {formState.errors.phone?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Email<sup className='text-red-500'>*</sup>
          </label>
          <div className='relative'>
            <input
              className={`${formState.errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
              type='text'
              disabled
              placeholder='Nhập email công ty'
              {...register('email', {
                required: 'Email công ty không được để trống'
              })}
            />
          </div>

          <div className={`text-red-500 absolute text-[12px] ${formState.errors.email ? 'visible' : 'invisible'}`}>
            {formState.errors.email?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Địa chỉ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formState.errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={updateNewParty?.isLoading}
            placeholder='Nhập địa chỉ công ty'
            {...register('address', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${formState.errors.address ? 'visible' : 'invisible'}`}>
            {formState.errors.address?.message}
          </div>
        </div>

        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Người đại diện<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formState.errors.presenter ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={updateNewParty?.isLoading}
            placeholder='Nhập tên người đại diện'
            {...register('presenter', {
              required: 'Người đại diện không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${formState.errors.presenter ? 'visible' : 'invisible'}`}>
            {formState.errors.presenter?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chức vụ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formState.errors.position ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={updateNewParty?.isLoading}
            placeholder='Nhập vị trí làm việc'
            {...register('position', {
              required: 'Vị trí làm việc không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${formState.errors.position ? 'visible' : 'invisible'}`}>
            {formState.errors.position?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Giấy phép đăng ký kinh doanh<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formState.errors.businessNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={updateNewParty?.isLoading}
            placeholder='Nhập thông tin'
            {...register('businessNumber', {
              required: 'Giấy phép ĐKKD không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formState.errors.businessNumber ? 'visible' : 'invisible'}`}
          >
            {formState.errors.businessNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          {/* <input
            className={`${formState.errors.bankName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên ngân hàng'
            {...register('bankName', {
              required: 'Tên ngân hàng không được để trống'
            })}
          /> */}
          <select
            {...register('bankName', { required: 'Tên ngân hàng không được để trống' })}
            disabled={updateNewParty?.isLoading}
            className='block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200'
          >
            <option key={null} value={'Tên ngân hàng'}>
              Tên ngân hàng
            </option>
            {banks.map(
              (bank: { id: number; code: string; shortName: string; logo: string; bin: string; name: string }) => (
                <option key={bank.id} value={bank.name}>
                  {bank.shortName} - {bank.name}
                </option>
              )
            )}
          </select>
          <div className={`text-red-500 absolute text-[12px] ${formState.errors.bankName ? 'visible' : 'invisible'}`}>
            {formState.errors.bankName?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>

          <input
            className={`${formState.errors.bankId ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={updateNewParty?.isLoading}
            placeholder='Nhập STK'
            {...register('bankId', {
              required: 'STK không được để trống'
              // validate: {
              //   checkBank: handleCheckBankPartyA
              // }
            })}
          />

          <div className={`text-red-500 absolute text-[12px] ${formState.errors.bankId ? 'visible' : 'invisible'}`}>
            {formState.errors.bankId?.message}
          </div>
        </div>

        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formState.errors.bankAccOwer ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={updateNewParty?.isLoading}
            placeholder='Nhập tên tài khoản ngân hàng'
            {...register('bankAccOwer', {
              required: 'Tên tài khoản không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formState.errors.bankAccOwer ? 'visible' : 'invisible'}`}
          >
            {formState.errors.bankAccOwer?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%]'></div>
        <div className='w-full flex justify-end'>
          <button
            type='submit'
            disabled={updateNewParty.isLoading}
            className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
          >
            {updateNewParty.isLoading ? (
              <LoadingIcon />
            ) : (
              <div className='flex items-center'>
                <GrUpdate className='mr-1' /> Sửa
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
export default CompanyInformation
