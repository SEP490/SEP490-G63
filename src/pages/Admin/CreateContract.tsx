import { useForm } from 'react-hook-form'
import SunEditor from 'suneditor-react'
import '../../styles/suneditor.css'
import { createNewContract, getDataByTaxNumber, sendMailPublic } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
import { useNavigate } from 'react-router-dom'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { useState, Fragment, useEffect, SetStateAction, useRef } from 'react'
import { createTemplateContract, getTemplateContract } from '~/services/template-contract.service'
import { handleSubmitBank, validateEmail, validateEmailDebounced } from '~/common/utils/checkMail'
import { VietQR } from 'vietqr'
import { useMutation, useQueries, useQuery } from 'react-query'
import { debounce } from 'lodash'
import LoadingSvgV2 from '~/assets/svg/loadingsvg'
import { useAuth } from '~/context/authProvider'
import { getContractType } from '~/services/type-contract.service'
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ViewTemplateContract from '~/components/Admin/TemplateContract/ViewTemplateContract'
import { AxiosError } from 'axios'
import LoadingIcon from '~/assets/LoadingIcon'
import dataRegex from '../../regex.json'
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
}
const CreateContract = () => {
  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormType>()
  const formInfoPartA = useForm<CompanyInfo>({ mode: 'onBlur' })
  const formInfoPartB = useForm<CompanyInfo>({ mode: 'onBlur' })
  const { successNotification, errorNotification } = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [selectedView, setSelectedView] = useState<any>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [banks, setBanks] = useState([])
  const { user } = useAuth()
  const clientID = '258d5960-4516-48c5-9316-bb95b978424f'
  const apiKey = '5fe49afb-2e07-4079-baf6-ca58356deadd'
  const [loadingA, setLoadingA] = useState(false)
  const [loadingB, setLoadingB] = useState(false)
  const [loadingBankA, setLoadingBankA] = useState(false)
  const [loadingBankB, setLoadingBankB] = useState(false)
  const disableFormA = useRef(false)
  const disableFormB = useRef(false)
  const resultQuery = useQueries([
    { queryKey: 'template-contract', queryFn: () => getTemplateContract(0, 100, '') },
    { queryKey: 'type-contract', queryFn: () => getContractType({ page: 0, size: 100, title: '' }) }
  ])

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
  const createContractQuery = useMutation(createNewContract, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response) => {
      if (response?.code == '00' && response?.object) {
        successNotification('Tạo hợp đồng thành công')
        // const formData = new FormData()
        // formData.append('to', response?.object?.createdBy)
        // formData.append('subject', statusRequest[10]?.title)
        // formData.append('htmlContent', statusRequest[10]?.description)
        // formData.append('contractId ', response?.object?.id as string)
        // formData.append('status', statusRequest[10]?.status)
        // formData.append('createdBy', response?.object?.createdBy as string)
        // formData.append('description', statusRequest[10]?.description)
        // sendMailQuery.mutate(formData)
        navigate('/contract')
      } else errorNotification('Tạo hợp đồng thất bại')
    }
  })
  const createTemplateContractQuery = useMutation(createTemplateContract, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response) => {
      if (response.success && response.code == '00') {
        successNotification('Tạo mẫu hợp đồng thành công')
        setOpen(false)
      } else errorNotification('Tạo mới mẫu hợp đồng thất bại')
    }
  })
  const onSubmit = async () => {
    const rule: any = document.getElementsByName('rule')[0]
    const term: any = document.getElementsByName('term')[0]
    const bodyData = {
      ...getValues(),
      rule: rule.value,
      term: term.value,
      partyA: formInfoPartA.getValues(),
      partyB: formInfoPartB.getValues()
    }
    createContractQuery.mutate(bodyData)
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
  const handleCheckMailA = async () => {
    try {
      const response = await validateEmail(formInfoPartA.getValues('email'))
      if (!response) {
        errorNotification('Email không hợp lệ')
      }
    } catch (e) {
      errorNotification('Lỗi')
    }
  }
  const handleCheckMailB = async () => {
    try {
      const response = await validateEmail(formInfoPartB.getValues('email'))
      if (!response) {
        errorNotification('Email không hợp lệ')
      }
    } catch (e) {
      errorNotification('Lỗi')
    }
  }
  // const handleCheckBankPartyA = async () => {
  //   setLoadingBankA(true)
  //   try {
  //     const response = await handleSubmitBank(formInfoPartA.getValues('bankName'), formInfoPartA.getValues('bankId'))
  //     if (response.data) {
  //       formInfoPartA.reset({ bankAccOwer: response?.data?.accountName })
  //     } else {
  //       formInfoPartA.reset({ bankAccOwer: '' })
  //       errorNotification('Số tài khoản không hợp lệ')
  //     }
  //   } catch (e) {
  //     errorNotification('Số tài khoản không hợp lệ')
  //   }
  //   setLoadingBankA(false)
  // }
  // const handleCheckBankPartyB = async () => {
  //   setLoadingBankB(true)
  //   try {
  //     const response = await handleSubmitBank(formInfoPartB.getValues('bankName'), formInfoPartB.getValues('bankId'))
  //     if (response.data) {
  //       formInfoPartB.reset({ bankAccOwer: response?.data?.accountName })
  //     } else {
  //       formInfoPartB.reset({ bankAccOwer: '' })
  //       errorNotification('Số tài khoản không hợp lệ')
  //     }
  //   } catch (e) {
  //     errorNotification('Số tài khoản không hợp lệ')
  //   }
  //   setLoadingBankB(false)
  // }

  const handleAutoFillPartyB = async () => {
    const result = await formInfoPartB.trigger('taxNumber')
    if (result) {
      setLoadingB(true)
      try {
        const taxNumber = formInfoPartB.getValues('taxNumber')
        const response = await getDataByTaxNumber(taxNumber)
        if (response.success && response.object) {
          formInfoPartB.reset(response.object)
          disableFormB.current = true
        } else {
          disableFormB.current = false
          formInfoPartB.reset({
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
      setLoadingB(false)
    }
  }
  const handleCreateContractTemplate = async () => {
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
  const handleFillData = async (s: any) => {
    reset({ name: s.nameContract, number: s.numberContract })
    const response = await getDataByTaxNumber(s?.taxNumber as string)
    if (response.success && response.object) {
      formInfoPartA.reset(response.object)
    }
    setSelectedTemplate(s)

    successNotification('Sử dụng hợp đồng mẫu thành công')
  }
  const handleShowDetailTemplate = (e: any, s: any) => {
    e.preventDefault()
    setSelectedView(s)
    setOpenModal(true)
  }
  return (
    <div className='bg-[#e8eaed] h-fit min-h-full flex justify-center py-6'>
      <form
        className='justify-center sm:justify-between w-[90%] md:w-[90%] rounded-md border flex flex-wrap px-4 h-fit bg-white py-4'
        autoComplete='on'
      >
        <div className='w-full mt-5 flex flex-col md:flex-row gap-6 items-center justify-between'>
          <div className='font-bold'>Tạo mới hợp đồng</div>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            {resultQuery[1].isLoading ? (
              <LoadingSvgV2 />
            ) : (
              <Listbox
                // value={size}
                onChange={(s) => {
                  handleFillData(s)
                }}
              >
                <div className='flex flex-col'>
                  <Listbox.Button
                    disabled={resultQuery[0]?.data?.object?.content?.length == 0}
                    className='none center mr-4 rounded-md bg-blue-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#7565b52f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                  >
                    Sử dụng hợp đồng mẫu
                  </Listbox.Button>
                  <div className='relative'>
                    <Transition
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='absolute z-30 w-[90%] max-h-[60vh] overflow-auto none center rounded-md bg-white py-2 px-2 font-sans text-xs text-black shadow-md border shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#7565b52f] focus:shadow-none  active:shadow-none disabled:pointer-events-none  disabled:shadow-none'>
                        {resultQuery[0]?.data?.object?.content?.map((s: any) => (
                          <Listbox.Option
                            key={s.id}
                            className={`cursor-pointer hover:bg-blue-200 rounded-md select-none px-2 py-1 w-full text-gray-900`}
                            value={s}
                          >
                            <div className='flex items-center justify-between'>
                              <div className='w-[80%] truncate ...'>{s.nameContract}</div>
                              <EyeIcon className='w-6 h-6 z-40' onClick={(e: any) => handleShowDetailTemplate(e, s)} />
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </div>
              </Listbox>
            )}
            {resultQuery[1].isLoading ? (
              <LoadingSvgV2 />
            ) : (
              <select
                {...register('contractTypeId')}
                disabled={createContractQuery?.isLoading}
                className={` block w-fit rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              >
                {resultQuery[1]?.data?.content?.map((d: any) => (
                  <option key={d.id} value={d.id} className='w-[300px] truncate ...'>
                    {d.title}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Tên hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Nhập tên hợp đồng'
            disabled={createContractQuery?.isLoading}
            {...register('name', {
              required: 'Tên hợp đồng không được để trống',
              pattern: {
                value: new RegExp(dataRegex.REGEX_TEXT),
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
            disabled={createContractQuery?.isLoading}
            placeholder='Nhập số hợp đồng'
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
            Giá trị(VND)<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.value ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled={createContractQuery?.isLoading}
            placeholder='Giá trị hợp đồng'
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
            disableToolbar={createContractQuery?.isLoading}
            disable={createContractQuery?.isLoading}
            setContents={selectedTemplate?.ruleContract}
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
              disabled={createContractQuery?.isLoading}
              onInput={debounce(handleAutoFillPartyA, 500)}
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
            disabled={createContractQuery?.isLoading || disableFormA.current}
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
          <input
            onInput={debounce(handleCheckMailA, 1000)}
            className={`${formInfoPartA.formState.errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormA.current}
            placeholder='Nhập email công ty'
            {...formInfoPartA.register('email', {
              required: 'Email công ty không được để trống',
              pattern: {
                value: new RegExp(dataRegex.REGEX_EMAIL, 'i'),
                message: 'Email không đúng định dạng'
              }
              // validate: {
              //   checkMail: async (value) => (await validateEmail(value)) || 'Email không tồn tại'
              // }
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
            className={`${formInfoPartA.formState.errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormA.current}
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
            disabled={createContractQuery?.isLoading || disableFormA.current}
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
            disabled={createContractQuery?.isLoading || disableFormA.current}
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
            disabled={createContractQuery?.isLoading || disableFormA.current}
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
          {/* <input
            className={`${formInfoPartA.formState.errors.bankName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên ngân hàng'
            {...formInfoPartA.register('bankName', {
              required: 'Tên ngân hàng không được để trống'
            })}
          /> */}
          <select
            {...formInfoPartA.register('bankName')}
            disabled={createContractQuery?.isLoading || disableFormA.current}
            className='block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200'
          >
            <option key={null} value={'Tên ngân hàng'}>
              Tên ngân hàng
            </option>
            {banks.map(
              (bank: { id: number; code: string; shortName: string; logo: string; bin: string; name: string }) => (
                <option key={bank.id} value={bank.bin}>
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
          <div className='relative'>
            <input
              className={`${formInfoPartA.formState.errors.bankId ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
              type='text'
              disabled={createContractQuery?.isLoading || disableFormA.current}
              placeholder='Nhập STK'
              {...formInfoPartA.register('bankId', {
                required: 'STK không được để trống'
                // validate: {
                //   checkBank: handleCheckBankPartyA
                // }
              })}
            />
            <div className='absolute z-10 right-1 top-0 h-full flex items-center'>
              {loadingBankA && <LoadingSvgV2 />}
            </div>
          </div>

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
            disabled={createContractQuery?.isLoading || disableFormA.current}
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
          {/* <button
            onClick={handleAutoFillPartyB}
            type='button'
            className='none center mr-4 rounded-md bg-blue-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#7565b52f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
          >
            Tự động điền theo mã số thuế
          </button> */}
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Mã số thuế<sup className='text-red-500'>*</sup>
          </label>
          <div className='relative'>
            <input
              className={`${formInfoPartB.formState.errors.taxNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              type='text'
              disabled={createContractQuery?.isLoading}
              onInput={debounce(handleAutoFillPartyB, 500)}
              placeholder='Nhập mã số thuế'
              {...formInfoPartB.register('taxNumber', {
                required: 'Mã số thuế không được để trống'
              })}
            />
            <div className='absolute z-10 right-1 top-0 h-full flex items-center'>{loadingB && <LoadingSvgV2 />}</div>
          </div>
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
            className={`${formInfoPartB.formState.errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormB.current}
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
            Email<sup className='text-red-500'>*</sup>
          </label>
          <input
            onInput={debounce(handleCheckMailB, 1000)}
            className={`${formInfoPartB.formState.errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormB.current}
            placeholder='Nhập email công ty'
            {...formInfoPartB.register('email', {
              required: 'Email công ty không được để trống',
              pattern: {
                value: new RegExp(dataRegex.REGEX_EMAIL, 'i'),
                message: 'Email không đúng định dạng'
              }
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
            className={`${formInfoPartB.formState.errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormB.current}
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
            className={`${formInfoPartB.formState.errors.presenter ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormB.current}
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
            className={`${formInfoPartB.formState.errors.position ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormB.current}
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
            className={`${formInfoPartB.formState.errors.businessNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormB.current}
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
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          {/* <input
            className={`${formInfoPartB.formState.errors.bankName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên ngân hàng'
            {...formInfoPartB.register('bankName', {
              required: 'Tên ngân hàng không được để trống'
            })}
          /> */}
          <select
            disabled={createContractQuery?.isLoading || disableFormB.current}
            {...formInfoPartB.register('bankName')}
            onChange={() => formInfoPartB.reset({ bankId: '' })}
            className='block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200'
          >
            <option key={null} value={'Tên ngân hàng'}>
              Tên ngân hàng
            </option>
            {banks.map(
              (bank: { id: number; code: string; shortName: string; logo: string; bin: string; name: string }) => (
                <option key={bank.id} value={bank.bin}>
                  {bank.shortName} - {bank.name}
                </option>
              )
            )}
          </select>
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.bankName ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.bankName?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative'>
          <label className='font-light '>
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <div className='relative'>
            <input
              className={`${formInfoPartB.formState.errors.bankId ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
              type='text'
              disabled={createContractQuery?.isLoading || disableFormB.current}
              placeholder='Nhập STK'
              {...formInfoPartB.register('bankId', {
                required: 'STK không được để trống'
                // validate: {
                //   checkBank: handleCheckBankPartyB
                // }
              })}
            />
            <div className='absolute z-10 right-1 top-0 h-full flex items-center'>
              {loadingBankB && <LoadingSvgV2 />}
            </div>
          </div>

          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.bankId ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.bankId?.message}
          </div>
        </div>

        <div className='w-full md:w-[30%] mt-5 relative'>
          <label className='font-light '>
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.bankAccOwer ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-slate-200`}
            type='text'
            disabled={createContractQuery?.isLoading || disableFormB.current}
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
            placeholder='Điều khoản'
            height='60vh'
            disableToolbar={createContractQuery?.isLoading}
            disable={createContractQuery?.isLoading}
            setContents={selectedTemplate?.termContract}
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
        <div className='w-full mt-5 relative'>
          <input
            className={`text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 mr-3`}
            placeholder='Nhập tên hợp đồng'
            type='checkbox'
            disabled={createContractQuery?.isLoading}
            {...register('urgent')}
          />
          <label className='font-light '>Tạo hợp đồng với trạng thái khẩn cấp</label>
        </div>
        <div className='w-full flex justify-end'>
          <button
            type='button'
            onClick={async () => {
              const result = await trigger()
              const result2 = await formInfoPartB.trigger()
              const result3 = await formInfoPartA.trigger()

              if (result && result2 && result3) {
                onSubmit()
              }
            }}
            className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
          >
            {createContractQuery?.isLoading ? <LoadingIcon /> : 'Tạo'}
          </button>
        </div>
      </form>
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full  items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-[100vw] md:w-[40vw] md:h-fit transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Thông báo
                  </Dialog.Title>
                  <div>
                    <div>Xác định lưu hợp đồng thành bản mẫu?</div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        onClick={handleCreateContractTemplate}
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                      >
                        {createTemplateContractQuery?.isLoading ? <LoadingIcon /> : 'Xác nhận'}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setOpenModal(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full  items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-[100vw] md:w-[80vw] md:h-fit transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between'>
                    <div className='font-semibold'>Chi tiết hợp đồng mẫu</div>
                    <div className='flex gap-3 items-center'>
                      <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => setOpenModal(false)} />
                    </div>
                  </div>
                  <ViewTemplateContract selectedContract={selectedView} handleCloseModal={() => setOpenModal(false)} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default CreateContract
