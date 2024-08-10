import { useForm } from 'react-hook-form'
import SunEditor from 'suneditor-react'
import '../../../styles/suneditor.css'
import useToast from '~/hooks/useToast'
import { useNavigate } from 'react-router-dom'
import { SetStateAction, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { updateTemplateContract } from '~/services/template-contract.service'
import { AxiosError } from 'axios'
import { VietQR } from 'vietqr'
import LoadingPage from '~/components/shared/LoadingPage/LoadingPage'
import LoadingIcon from '~/assets/LoadingIcon'
import { getParty } from '~/services/party.service'
import moment from 'moment'
interface FormType {
  nameContract: string
  numberContract: string
  name: string
  address: string
  taxNumber: string
  presenter: string
  position: string
  businessNumber: string
  bankId: string
  bankName: string
  bankAccOwer: string
  email: string
}
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

const EditTemplateContract = ({ selectedContract, handleCloseModal, refetch }: any) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormType>({ defaultValues: selectedContract })
  const formInfoPartA = useForm<CompanyInfo>({ mode: 'onBlur' })
  const { successNotification, errorNotification } = useToast()
  const navigate = useNavigate()
  const updateTemplate = useMutation(updateTemplateContract, {
    onSuccess: () => {
      successNotification('Sửa thành công')
      handleCloseModal()
      setTimeout(() => refetch(), 500)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data.message || '')
    }
  })
  const [banks, setBanks] = useState([])
  const clientID = '258d5960-4516-48c5-9316-bb95b978424f'
  const apiKey = '5fe49afb-2e07-4079-baf6-ca58356deadd'

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
  useQuery('party-data', getParty, {
    onSuccess: (response) => {
      if (response.object) {
        formInfoPartA.reset(response.object)
      }
    }
  })
  const onSubmit = async () => {
    const rule: any = document.getElementsByName('rule')[0]
    const term: any = document.getElementsByName('term')[0]
    const bodyData = {
      ...getValues(),
      ruleContract: rule.value,
      termContract: term.value
    }
    updateTemplate.mutate({ id: selectedContract.id, data: bodyData })
  }
  return (
    <div className='full flex justify-center overflow-auto h-[90%] mb-6'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='justify-center sm:justify-between w-full rounded-md flex h-full flex-wrap my-5 bg-white'
        autoComplete='on'
      >
        <div className='w-full relative'>
          <label className='font-light '>
            Tên hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.nameContract ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Ví dụ: Tên công ty-Đối tác-HDKD'
            disabled={updateTemplate.isLoading}
            {...register('nameContract', {
              required: 'Tên hợp đồng không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px]  ${errors.nameContract ? 'visible' : 'invisible'}`}>
            {errors.nameContract?.message}
          </div>
        </div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Số hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.numberContract ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled={updateTemplate.isLoading}
            placeholder={`Ví dụ: Tên công ty-Đối tác-${moment(new Date()).format('YYYY-MM-DD')}`}
            {...register('numberContract', {
              required: 'Số hợp đồng không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.numberContract ? 'visible' : 'invisible'}`}>
            {errors.numberContract?.message}
          </div>
        </div>
        <div className='w-full mt-5 font-bold'>Điều khoản thông tin các bên</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='rule'
            placeholder='Căn cứ vào điều luật...'
            height='40vh'
            disableToolbar={updateTemplate?.isLoading}
            disable={updateTemplate?.isLoading}
            setContents={selectedContract?.ruleContract}
            setOptions={{
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight']
              ]
            }}
          />
        </div>
        <div className='w-full mt-5 font-bold'>Thông tin bên A</div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Mã số thuế<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.taxNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập mã số thuế'
            disabled
            hidden
            {...formInfoPartA.register('taxNumber', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.taxNumber ? 'visible' : 'invisible'}`}>
            {errors.taxNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên công ty<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên công ty'
            disabled
            hidden
            {...formInfoPartA.register('name', {
              required: 'Tên công ty không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.name ? 'visible' : 'invisible'}`}>
            {errors.name?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Email<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập email công ty'
            disabled
            hidden
            {...formInfoPartA.register('email', {
              required: 'Email công ty không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.email ? 'visible' : 'invisible'}`}>
            {errors.email?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số điện thoại<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 `}
            type='text'
            disabled
            placeholder='Nhập số điện thoại'
            {...formInfoPartA.register('phone', {
              required: 'Số điện thoại không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.phone ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.phone?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Địa chỉ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập địa chỉ công ty'
            disabled
            hidden
            {...formInfoPartA.register('address', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.address ? 'visible' : 'invisible'}`}>
            {errors.address?.message}
          </div>
        </div>

        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Người đại diện<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.presenter ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên người đại diện'
            disabled
            hidden
            {...formInfoPartA.register('presenter', {
              required: 'Người đại diện không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.presenter ? 'visible' : 'invisible'}`}>
            {errors.presenter?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chức vụ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.position ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập vị trí làm việc'
            disabled
            hidden
            {...formInfoPartA.register('position', {
              required: 'Vị trí làm việc không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.position ? 'visible' : 'invisible'}`}>
            {errors.position?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Giấy phép đăng ký kinh doanh<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.businessNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập thông tin'
            disabled
            hidden
            {...formInfoPartA.register('businessNumber', {
              required: 'Giấy phép ĐKKD không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.businessNumber ? 'visible' : 'invisible'}`}>
            {errors.businessNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.bankId ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập STK'
            disabled
            hidden
            {...formInfoPartA.register('bankId', {
              required: 'STK không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.bankId ? 'visible' : 'invisible'}`}>
            {errors.bankId?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <select
            {...formInfoPartA.register('bankName')}
            disabled
            hidden
            className='block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          >
            {banks.map(
              (bank: { id: number; code: string; shortName: string; logo: string; bin: string; name: string }) => (
                <option key={bank.id} value={bank.name}>
                  {bank.shortName} - {bank.name}
                </option>
              )
            )}
          </select>
          <div className={`text-red-500 absolute text-[12px] ${errors.bankName ? 'visible' : 'invisible'}`}>
            {errors.bankName?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.bankAccOwer ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập tên tài khoản ngân hàng'
            {...formInfoPartA.register('bankAccOwer', {
              required: 'Tên tài khoản không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.bankAccOwer ? 'visible' : 'invisible'}`}>
            {errors.bankAccOwer?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%]  '></div>
        <div className='w-full mt-5 font-bold'>Điều khoản hợp đồng</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='term'
            placeholder='Điều khoản'
            height='60vh'
            disableToolbar={updateTemplate?.isLoading}
            disable={updateTemplate?.isLoading}
            setContents={selectedContract?.termContract}
            setOptions={{
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['table', 'link', 'image'],
                ['fullScreen', 'showBlocks', 'codeView'],
                ['preview', 'print']
              ],

              imageUploadUrl: '/upload/image',
              imageUploadSizeLimit: 5 * 1024 * 1024
            }}
          />
        </div>

        <button
          type='submit'
          disabled={updateTemplate.isLoading}
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        >
          {updateTemplate.isLoading ? <LoadingIcon /> : 'Lưu'}
        </button>
      </form>
    </div>
  )
}
export default EditTemplateContract
