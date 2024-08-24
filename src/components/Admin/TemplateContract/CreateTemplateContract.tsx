import { useForm } from 'react-hook-form'
import SunEditor from 'suneditor-react'
import '../../../styles/suneditor.css'
import { getDataByTaxNumber } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
import { useNavigate } from 'react-router-dom'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { useState, Fragment, useEffect, SetStateAction, useRef } from 'react'
import { createTemplateContract } from '~/services/template-contract.service'
import { validateEmail } from '~/common/utils/checkMail'
import { VietQR } from 'vietqr'
import { useMutation, useQuery } from 'react-query'
import { debounce } from 'lodash'
import LoadingSvgV2 from '~/assets/svg/loadingsvg'
import { AxiosError } from 'axios'
import LoadingIcon from '~/assets/LoadingIcon'
import dataRegex from '../../../regex.json'
import { getParty } from '~/services/party.service'
import moment from 'moment'
interface FormType {
  name: string
  number: string
  urgent: boolean
  value: number
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
const CreateTemplateContract = () => {
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormType>()
  const formInfoPartA = useForm<CompanyInfo>({ mode: 'onBlur' })
  const { successNotification, errorNotification } = useToast()
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [banks, setBanks] = useState([])
  const clientID = '258d5960-4516-48c5-9316-bb95b978424f'
  const apiKey = '5fe49afb-2e07-4079-baf6-ca58356deadd'
  const [loadingA, setLoadingA] = useState(false)
  const [loadingMailA, setLoadingMailA] = useState(false)
  const disableFormA = useRef(false)
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

  // const sendMailQuery = useMutation(sendMailPublic)

  const createTemplateContractQuery = useMutation(createTemplateContract, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response) => {
      if (response.success && response.code == '00') {
        successNotification('Tạo mẫu hợp đồng thành công')
        navigate('/template-contract')
      } else errorNotification('Tạo mới mẫu hợp đồng thất bại')
    }
  })
  const onSubmit = async () => {
    const rule: any = document.getElementsByName('rule')[0]
    const term: any = document.getElementsByName('term')[0]
    const dataTemplate = {
      nameContract: getValues().name,
      numberContract: getValues().number,
      ruleContract: rule.value,
      termContract: term.value,
      ...formInfoPartA.getValues()
    }
    createTemplateContractQuery.mutate(dataTemplate)
  }

  const handleAutoFillPartyA = async () => {
    const result = await formInfoPartA.trigger('taxNumber')
    if (result) {
      setLoadingA(true)
      try {
        const taxNumber = formInfoPartA.getValues('taxNumber')
        const response = await getDataByTaxNumber(taxNumber)
        if (response.success && response.object) {
          formInfoPartA.reset(response.object)
          disableFormA.current = true
        } else {
          disableFormA.current = false
          formInfoPartA.reset({
            name: '',
            email: '',
            address: '',
            presenter: '',
            position: '',
            businessNumber: '',
            bankId: '',
            bankName: '',
            bankAccOwer: ''
          })
        }
      } catch (e) {
        errorNotification('Lỗi hệ thống')
      }
      setLoadingA(false)
    }
  }

  useQuery('party-data', getParty, {
    onSuccess: (response) => {
      if (response.object) {
        formInfoPartA.reset(response.object)
      }
    }
  })
  return (
    <div className='bg-[#e8eaed] h-fit min-h-full flex justify-center py-6'>
      <form
        className='justify-center sm:justify-between w-[90%] md:w-[90%] rounded-md border flex flex-wrap px-4 h-fit bg-white py-4'
        autoComplete='on'
      >
        <div className='w-full mt-5 flex flex-col md:flex-row gap-6 items-center justify-between'>
          <div className='font-bold'>Tạo mới mẫu hợp đồng</div>
        </div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Tên hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Ví dụ: Tên công ty-Đối tác-HDKD'
            disabled={createTemplateContractQuery?.isLoading}
            {...register('name', {
              required: 'Tên hợp đồng không được để trống',
              pattern: {
                value: new RegExp(dataRegex.REGEX_CONTRACT_NAME),
                message: 'Tên hợp đồng không hợp lệ'
              }
            })}
          />
          <div className={`text-red-500 absolute text-[12px]  ${errors.name ? 'visible' : 'invisible'}`}>
            {errors.name?.message}
          </div>
        </div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Số hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.number ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled={createTemplateContractQuery?.isLoading}
            placeholder={`Ví dụ: Tên công ty-Đối tác-${moment(new Date()).format('YYYY-MM-DD')}`}
            {...register('number', {
              required: 'Số hợp đồng không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.number ? 'visible' : 'invisible'}`}>
            {errors.number?.message}
          </div>
        </div>

        <div className='w-full mt-5 font-bold'>Điều khoản thông tin các bên</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='rule'
            placeholder='Căn cứ vào điều luật...'
            height='60vh'
            disableToolbar={createTemplateContractQuery?.isLoading}
            disable={createTemplateContractQuery?.isLoading}
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
          <div className='relative'>
            <input
              className={`${formInfoPartA.formState.errors.taxNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
              type='text'
              disabled
              placeholder='Nhập mã số thuế'
              {...formInfoPartA.register('taxNumber', {
                required: 'Mã số thuế không được để trống'
              })}
            />
            <div className='absolute z-10 right-1 top-0 h-full flex items-center'>{loadingA && <LoadingSvgV2 />}</div>
          </div>

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
            className={`${formInfoPartA.formState.errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled
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
            Email<sup className='text-red-500'>*</sup>
          </label>
          <div className='relative'>
            <input
              className={`${formInfoPartA.formState.errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
              type='text'
              disabled
              placeholder='Nhập email công ty'
              {...formInfoPartA.register('email', {
                required: 'Email công ty không được để trống',
                pattern: {
                  value: new RegExp(dataRegex.REGEX_EMAIL, 'i'),
                  message: 'Email không đúng định dạng'
                }
              })}
            />
            <div className='absolute z-10 right-1 top-0 h-full flex items-center'>
              {loadingMailA && <LoadingSvgV2 />}
            </div>
          </div>

          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.email ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.email?.message}
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
            Địa chỉ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled
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
            className={`${formInfoPartA.formState.errors.presenter ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled
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
            className={`${formInfoPartA.formState.errors.position ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled
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
            className={`${formInfoPartA.formState.errors.businessNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled
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
            Tên ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <select
            {...formInfoPartA.register('bankName')}
            disabled
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
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.bankName ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.bankName?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>

          <input
            className={`${formInfoPartA.formState.errors.bankId ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled
            placeholder='Nhập STK'
            {...formInfoPartA.register('bankId', {
              required: 'STK không được để trống'
              // validate: {
              //   checkBank: handleCheckBankPartyA
              // }
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
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.bankAccOwer ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled
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
        <div className='w-full md:w-[30%]'></div>
        <div className='w-full mt-5 font-bold'>Điều khoản hợp đồng</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='term'
            placeholder='Điều khoản'
            height='60vh'
            disableToolbar={createTemplateContractQuery?.isLoading}
            disable={createTemplateContractQuery?.isLoading}
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

        <div className='w-full flex justify-end'>
          <button
            type='button'
            disabled={createTemplateContractQuery?.isLoading}
            onClick={async () => {
              const result = await trigger()

              if (result) {
                onSubmit()
              }
            }}
            className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
          >
            {createTemplateContractQuery?.isLoading ? <LoadingIcon /> : 'Tạo'}
          </button>
        </div>
      </form>
    </div>
  )
}
export default CreateTemplateContract
