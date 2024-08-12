import { useForm } from 'react-hook-form'
import SunEditor from 'suneditor-react'
import '../../../styles/suneditor.css'
import { getDataByTaxNumber, getNewContractById } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, SetStateAction } from 'react'
import { VietQR } from 'vietqr'
import { useMutation, useQuery } from 'react-query'
import LoadingPage from '~/components/shared/LoadingPage/LoadingPage'
import { statusRequest } from '~/common/const/status'
import LoadingIcon from '~/assets/LoadingIcon'
import { createAppendices, sendMailPublicApp } from '~/services/contract.appendices.service'
import moment from 'moment'
interface FormType {
  name: string
  number: string
  value: string
  urgent: boolean
  contractTypeId: string
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
const CreateAppendices = () => {
  const {
    register,
    getValues,
    trigger,
    formState: { errors }
  } = useForm<FormType>()
  const formInfoPartA = useForm<CompanyInfo>()
  const formInfoPartB = useForm<CompanyInfo>()
  const { successNotification, errorNotification } = useToast()
  const navigate = useNavigate()
  const [banks, setBanks] = useState([])
  const clientID = '258d5960-4516-48c5-9316-bb95b978424f'
  const apiKey = '5fe49afb-2e07-4079-baf6-ca58356deadd'
  const { id } = useParams()

  const handleFillData = async (s: any) => {
    try {
      const result = await Promise.all([
        getDataByTaxNumber(s?.partyA?.taxNumber as string),
        getDataByTaxNumber(s?.partyB?.taxNumber as string)
      ])
      formInfoPartA.reset(result?.[0]?.object)
      formInfoPartB.reset(result?.[1]?.object)
    } catch (e) {
      errorNotification('Thông tin hợp đồng lỗi')
    }
  }
  const { data, isLoading } = useQuery('get-contract-detail', () => getNewContractById(id as string), {
    onSuccess: (data) => {
      handleFillData(data?.object)
    }
  })

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

  const createAppendicesQuery = useMutation(createAppendices, {
    onSuccess: async (response) => {
      try {
        if (response?.code == '00' && response.object && response.success) {
          successNotification('Tạo phụ lục thành công!')
          navigate(`/appendices/${id}`)
        }
      } catch (e) {
        console.log(e)
        errorNotification('Tạo phụ lúc thất bại')
      }
    }
  })
  const onSubmit = async () => {
    const rule: any = document.getElementsByName('rule')[0]
    const term: any = document.getElementsByName('term')[0]
    const bodyData = {
      ...getValues(),
      rule: rule.value,
      term: term.value,
      contractId: id as string
    }
    createAppendicesQuery.mutate(bodyData)
  }

  if (isLoading) return <LoadingPage />
  return (
    <div className='bg-[#e8eaed] h-fit min-h-full flex justify-center py-6'>
      <form
        className='justify-center sm:justify-between w-[90%] md:w-[90%] rounded-md border flex flex-wrap px-4 h-fit bg-white py-4'
        autoComplete='on'
      >
        <div className='w-full mt-3 flex gap-6 items-center justify-between'>
          <div className='test-[23px]'>
            Tạo phụ lúc hợp đồng cho hợp đồng: <span className='font-bold'>{data?.object?.name}</span> số:{' '}
            <span className='font-bold'>{data?.object?.number}</span>
          </div>
          <div>
            <button
              className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              type='button'
              onClick={() => {
                navigate(-1)
              }}
            >
              Trở lại
            </button>
          </div>
        </div>
        <div className='w-full mt-3 relative'>
          <label className='font-light '>
            Tên phụ lục hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Ví dụ: Tên công ty-Đối tác-PLHD'
            {...register('name', {
              required: 'Tên hợp đồng không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px]  ${errors.name ? 'visible' : 'invisible'}`}>
            {errors.name?.message}
          </div>
        </div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Số phụ lục hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.number ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder={`Ví dụ: Tên công ty-Đối tác-${moment(new Date()).format('YYYY-MM-DD')}`}
            {...register('number', {
              required: 'Số hợp đồng không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.number ? 'visible' : 'invisible'}`}>
            {errors.number?.message}
          </div>
        </div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Giá trị hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.value ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Giá trị'
            {...register('value', {
              required: 'Giá trị không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.value ? 'visible' : 'invisible'}`}>
            {errors.value?.message}
          </div>
        </div>
        <div className='w-full mt-5 font-bold'>Điều khoản thông tin các bên</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='rule'
            placeholder='Căn cứ vào điều luật...'
            height='60vh'
            setContents={data?.object?.rule}
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
        <div className='w-full mt-5 flex gap-6 items-center'>
          <div className='font-bold'>Thông tin bên A</div>
        </div>

        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Mã số thuế<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.taxNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200`}
            type='text'
            placeholder='Nhập mã số thuế'
            {...formInfoPartA.register('taxNumber', {
              required: 'Mã số thuế không được để trống'
            })}
            disabled
            hidden
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.taxNumber ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.taxNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên công ty<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.name ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập tên công ty'
            {...formInfoPartA.register('name', {
              required: 'Tên công ty không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.name ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.name?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số điện thoại<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
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
            Email<sup className='text-red-500'>*</sup>
          </label>
          <input
            // onInput={(event) => validateEmailDebounced((event.target as HTMLInputElement).value)}
            className={`${formInfoPartA.formState.errors.email ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập email công ty'
            {...formInfoPartA.register('email', {
              required: 'Email công ty không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.email ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.email?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Địa chỉ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.address ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập địa chỉ công ty'
            {...formInfoPartA.register('address', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.address ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.address?.message}
          </div>
        </div>

        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Người đại diện<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.presenter ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập tên người đại diện'
            {...formInfoPartA.register('presenter', {
              required: 'Người đại diện không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.presenter ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.presenter?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chức vụ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.position ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập vị trí làm việc'
            {...formInfoPartA.register('position', {
              required: 'Vị trí làm việc không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.position ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.position?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Giấy phép đăng ký kinh doanh<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.businessNumber ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập thông tin'
            {...formInfoPartA.register('businessNumber', {
              required: 'Giấy phép ĐKKD không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.businessNumber ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.businessNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.bankId ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập STK'
            {...formInfoPartA.register('bankId', {
              required: 'STK không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.bankId ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.bankId?.message}
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
            className='block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          >
            <option key={null} value={'Tên ngân hàng'}>
              Tên ngân hàng
            </option>
            {banks.map((bank: { id: number; code: string; shortName: string; logo: string; bin: string }) => (
              <option key={bank.id} value={bank.shortName}>
                {bank.shortName}
              </option>
            ))}
          </select>
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.bankName ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.bankName?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.bankAccOwer ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập tên tài khoản ngân hàng'
            {...formInfoPartA.register('bankAccOwer', {
              required: 'Tên tài khoản không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.bankAccOwer ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.bankAccOwer?.message}
          </div>
        </div>
        {/* Thông tin công ty B */}
        <div className='w-full mt-5 flex gap-6 items-center'>
          <div className='font-bold'>Thông tin bên B</div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Mã số thuế<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.taxNumber ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập mã số thuế'
            {...formInfoPartB.register('taxNumber', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.taxNumber ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.taxNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên công ty<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.name ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập tên công ty'
            {...formInfoPartB.register('name', {
              required: 'Tên công ty không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.name ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.name?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số điện thoại<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.phone ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled
            placeholder='Nhập số điện thoại'
            {...formInfoPartB.register('phone', {
              required: 'Số điện thoại không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.phone ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.phone?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Email<sup className='text-red-500'>*</sup>
          </label>
          <input
            // onInput={(event) => validateEmailDebounced((event.target as HTMLInputElement).value)}
            className={`${formInfoPartB.formState.errors.email ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập email công ty'
            {...formInfoPartB.register('email', {
              required: 'Email công ty không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.email ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.email?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Địa chỉ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.address ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập địa chỉ công ty'
            {...formInfoPartB.register('address', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.address ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.address?.message}
          </div>
        </div>

        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Người đại diện<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.presenter ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập tên người đại diện'
            {...formInfoPartB.register('presenter', {
              required: 'Người đại diện không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.presenter ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.presenter?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chức vụ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.position ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập vị trí làm việc'
            {...formInfoPartB.register('position', {
              required: 'Vị trí làm việc không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.position ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.position?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Giấy phép đăng ký kinh doanh<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.businessNumber ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập thông tin'
            {...formInfoPartB.register('businessNumber', {
              required: 'Giấy phép ĐKKD không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.businessNumber ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.businessNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative'>
          <label className='font-light '>
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.bankId ? 'ring-red-600' : ''} block w-full disabled:bg-gray-200 rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập STK'
            {...formInfoPartB.register('bankId', {
              required: 'STK không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.bankId ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.bankId?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <select
            {...formInfoPartB.register('bankName')}
            disabled
            hidden
            className='block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          >
            <option key={null} value={'Tên ngân hàng'}>
              Tên ngân hàng
            </option>
            {banks.map((bank: { id: number; code: string; shortName: string; logo: string; bin: string }) => (
              <option key={bank.id} value={bank.shortName}>
                {bank.shortName}
              </option>
            ))}
          </select>
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.bankName ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.bankName?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative'>
          <label className='font-light '>
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.bankAccOwer ? 'ring-red-600' : ''} block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            hidden
            placeholder='Nhập tên tài khoản ngân hàng'
            {...formInfoPartB.register('bankAccOwer', {
              required: 'Tên tài khoản không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.bankAccOwer ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.bankAccOwer?.message}
          </div>
        </div>
        <div className='w-full mt-5 font-bold'>Điều khoản hợp đồng</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='term'
            placeholder='Điều khoản bổ sung'
            height='60vh'
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
        {/* <div className='w-full mt-5 relative'>
          <input
            className={`text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 mr-3`}
            placeholder='Nhập tên hợp đồng'
            type='checkbox'
            {...register('urgent')}
          />
          <label className='font-light '>Tạo hợp đồng với trạng thái khẩn cấp</label>
        </div> */}
        <div className='w-full flex justify-end'>
          <button
            type='button'
            disabled={createAppendicesQuery?.isLoading}
            onClick={async () => {
              const result = await trigger()
              if (result) {
                onSubmit()
              }
            }}
            className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
          >
            {createAppendicesQuery?.isLoading ? <LoadingIcon /> : 'Tạo'}
          </button>
        </div>
      </form>
    </div>
  )
}
export default CreateAppendices
