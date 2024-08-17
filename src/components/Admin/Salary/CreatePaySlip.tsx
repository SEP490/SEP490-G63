import { AxiosError } from 'axios'
import { debounce } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import LoadingIcon from '~/assets/LoadingIcon'
import useToast from '~/hooks/useToast'
import { createPaySlipFormula } from '~/services/pay.formula.service'

type FormData = {
  fromValueContract: string
  toValueContract: string
  commissionPercentage: number
  baseSalary: string
  clientDeploymentPercentage: number
  bonusReachesThreshold: string
  foodAllowance: string
  transportationOrPhoneAllowance: string
}
const CreatePaySlip = ({ closeModal, refetch }: any) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<FormData>()
  const { successNotification, errorNotification } = useToast()
  const addNewPaySlipQuery = useMutation(createPaySlipFormula, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Tạo mới thất bại')
    },
    onSuccess: (response) => {
      if (response.code == '00') {
        successNotification('Tạo mới thành công')
        closeModal()
        refetch()
      } else {
        errorNotification('Tạo mới thất bại')
      }
    }
  })
  const handleInputValue = (e: any, field: any) => {
    const isNum = /^[\d,]+$/.test(e.target.value)
    if (isNum) {
      const number = parseFloat(e.target.value.replace(/,/g, ''))
      reset({
        [field]: number.toLocaleString()
      })
    } else
      reset({
        [field]: e.target.value.replace(/[^0-9,]/g, '')
      })
  }
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    addNewPaySlipQuery.mutate({
      ...data,
      fromValueContract: data.fromValueContract.replace(/,/g, '').replace(/\./g, ''),
      toValueContract: data.toValueContract.replace(/,/g, '').replace(/\./g, ''),
      baseSalary: data.baseSalary.replace(/,/g, '').replace(/\./g, ''),
      bonusReachesThreshold: data.bonusReachesThreshold.replace(/,/g, '').replace(/\./g, ''),
      foodAllowance: data.foodAllowance.replace(/,/g, '').replace(/\./g, ''),
      transportationOrPhoneAllowance: data.transportationOrPhoneAllowance.replace(/,/g, '').replace(/\./g, ''),
      type: 'SALE'
    })
  }

  return (
    <form
      onSubmit={handleSubmit(debounce(onSubmit, 300))}
      className='items-center w-full rounded-lg mt-2  flex flex-wrap justify-between h-fit bg-white z-50 '
    >
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-0 relative'>
        <label className=' flex items-center'>
          <div>
            Tổng DS <sup className='text-red-500'>*</sup>
          </div>
          {/* <TooltipComponent
            content='Chỉ chứa kí tự chữ cái,khoảng trống, tối thiểu 8 và tối đa 30 kí tự'
            className='w-4 h-4 cursor-pointer'
            style='dark'
          /> */}
        </label>
        <div className='flex justify-between'>
          <input
            className={`${errors.fromValueContract ? 'ring-red-600' : ''} block w-[48%] rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Từ'
            type='text'
            onInput={(e) => handleInputValue(e, 'fromValueContract')}
            {...register('fromValueContract', {
              required: 'Dữ liệu không được bỏ trống',
              validate: {
                positive: (v, formValues) =>
                  v.replace(/,/g, '').replace(/\./g, '') <
                    formValues.toValueContract.replace(/,/g, '').replace(/\./g, '') || 'Dữ liệu không hợp lệ'
              }
            })}
          />
          <input
            className={`${errors.toValueContract ? 'ring-red-600' : ''} block w-[48%] rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Đến'
            type='text'
            onInput={(e) => handleInputValue(e, 'toValueContract')}
            {...register('toValueContract', {
              required: 'Dữ liệu không được bỏ trống',
              validate: {
                positive: (v, formValues) =>
                  v.replace(/,/g, '').replace(/\./g, '') >
                    formValues.fromValueContract.replace(/,/g, '').replace(/\./g, '') || 'Dữ liệu không hợp lệ'
              }
            })}
          />
        </div>

        <div
          className={`text-red-500 absolute text-[12px] ${errors.fromValueContract || errors.toValueContract ? 'visible' : 'invisible'}`}
        >
          {errors.fromValueContract?.message || errors.toValueContract?.message}
        </div>
      </div>

      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 sm:mt-0 relative'>
        <label className=' flex items-center'>
          <div>
            Lương cơ bản<sup className='text-red-500'>*</sup>
          </div>
        </label>
        <input
          type='text'
          onInput={(e) => handleInputValue(e, 'baseSalary')}
          className={`${errors.baseSalary ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('baseSalary', {
            required: 'Lương cơ bản không được để trống'
            // pattern: {
            //   value: new RegExp(dataRegex.REGEX_TEXT),
            //   message: 'Vị trí không hợp lệ'
            // }
          })}
          placeholder='Lương cơ bản'
        />

        <div className={`text-red-500 absolute text-[12px] ${errors.baseSalary ? 'visible' : 'invisible'}`}>
          {errors.baseSalary?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 md:mt-0 relative'>
        <label className=' flex items-center'>
          <div>
            % DS<sup className='text-red-500'>*</sup>
          </div>
        </label>
        <input
          type='number'
          min={0}
          max={100}
          step={0.1}
          className={`${errors.commissionPercentage ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('commissionPercentage', {
            required: '% DS không được để trống'
            // pattern: {
            //   value: new RegExp(dataRegex.REGEX_TEXT),
            //   message: 'Vị trí không hợp lệ'
            // }
          })}
          placeholder='% DS'
        />

        <div className={`text-red-500 absolute text-[12px] ${errors.commissionPercentage ? 'visible' : 'invisible'}`}>
          {errors.commissionPercentage?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className=' flex items-center'>
          <div>
            % triển khai KH<sup className='text-red-500'>*</sup>
          </div>
        </label>
        <input
          type='number'
          min={0}
          max={100}
          step={0.1}
          className={`${errors.commissionPercentage ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('clientDeploymentPercentage', {
            required: '% triển khai khách hàng không được để trống'
            // pattern: {
            //   value: new RegExp(dataRegex.REGEX_TEXT),
            //   message: 'Vị trí không hợp lệ'
            // }
          })}
          placeholder='% triển khai khách hàng'
        />
        <div
          className={`text-red-500 absolute text-[12px] ${errors.clientDeploymentPercentage ? 'visible' : 'invisible'}`}
        >
          {errors.clientDeploymentPercentage?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className=' flex items-center'>
          <div>
            Thưởng đạt ngưỡng<sup className='text-red-500'>*</sup>
          </div>
        </label>
        <input
          type='text'
          onInput={(e) => handleInputValue(e, 'bonusReachesThreshold')}
          className={`${errors.bonusReachesThreshold ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('bonusReachesThreshold', {
            required: 'Thưởng đạt ngưỡng không được để trống'
            // pattern: {
            //   value: new RegExp(dataRegex.REGEX_TEXT),
            //   message: 'Vị trí không hợp lệ'
            // }
          })}
          placeholder='Thưởng đạt ngưỡng'
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.bonusReachesThreshold ? 'visible' : 'invisible'}`}>
          {errors.bonusReachesThreshold?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className=' flex items-center'>
          <div>
            Trợ cấp ăn<sup className='text-red-500'>*</sup>
          </div>
        </label>
        <input
          type='text'
          onInput={(e) => handleInputValue(e, 'foodAllowance')}
          className={`${errors.foodAllowance ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('foodAllowance', {
            required: 'Dữ liệu không được để trống'
            // pattern: {
            //   value: new RegExp(dataRegex.REGEX_TEXT),
            //   message: 'Vị trí không hợp lệ'
            // }
          })}
          placeholder='Trợ cấp ăn'
        />

        <div className={`text-red-500 absolute text-[12px] ${errors.foodAllowance ? 'visible' : 'invisible'}`}>
          {errors.foodAllowance?.message}
        </div>
      </div>
      <div className='w-[100%] sm:w-[48%] md:w-[29%] mt-5 relative'>
        <label className=' flex items-center'>
          <div>
            Phụ cấp xăng xe,ĐT<sup className='text-red-500'>*</sup>
          </div>
        </label>
        <input
          type='text'
          onInput={(e) => handleInputValue(e, 'transportationOrPhoneAllowance')}
          className={`${errors.transportationOrPhoneAllowance ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          {...register('transportationOrPhoneAllowance', {
            required: 'Dữ liệu không được để trống'
            // pattern: {
            //   value: new RegExp(dataRegex.REGEX_TEXT),
            //   message: 'Vị trí không hợp lệ'
            // }
          })}
          placeholder='Phụ cấp xăng,xe'
        />

        <div
          className={`text-red-500 absolute text-[12px] ${errors.transportationOrPhoneAllowance ? 'visible' : 'invisible'}`}
        >
          {errors.transportationOrPhoneAllowance?.message}
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <button
          type='submit'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          {addNewPaySlipQuery.isLoading ? <LoadingIcon /> : 'Thêm'}
        </button>
      </div>
    </form>
  )
}
export default CreatePaySlip
