import { Fragment, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getContractType } from '~/services/type-contract.service'
import { VietQR } from 'vietqr'
import useToast from '~/hooks/useToast'
import SunEditor from 'suneditor-react'
import moment from 'moment'
import ContractHistory from '~/pages/Admin/ContractHistory'
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react'
import {
  ArrowUpOnSquareIcon,
  ArrowUturnLeftIcon,
  Cog6ToothIcon,
  DocumentPlusIcon,
  NoSymbolIcon,
  PaperAirplaneIcon,
  PencilIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { statusObject, statusRequest } from '~/common/const/status'
import { useAuth } from '~/context/authProvider'
import { ADMIN } from '~/common/const/role'
import { permissionObject } from '~/common/const/permissions'
import { AxiosError } from 'axios'
import LoadingIcon from '~/assets/LoadingIcon'
import ViewContract from '../NewContract/ViewContract'
import { deleteAppendices, getAppendicesContractById } from '~/services/contract.appendices.service'
import EditAppendicesContract from './EditAppendicesContract'
import SendMailUpdateStatus from './SendMailUpdateStatus'
import { getNewContractByIdNotToken } from '~/services/contract.service'

interface FormType {
  name: string
  number: string
  urgent: boolean
  value: string
  contractTypeId: string
}
type STATUS = 'ADMIN' | 'OFFICE_ADMIN' | 'SALE' | 'OFFICE_STAFF'
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
type ActionType = {
  id: number
  title: string | ReactNode
  color?: string
  disable?: any
  callback: any
}
const ViewAppendicesContract = () => {
  const { id, idDetail } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState<number>(0)
  const [changeStatus, setChangeStatus] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const { successNotification, errorNotification } = useToast()
  const [deleteModal, setDeleteModal] = useState(false)
  const formInfoPartA = useForm<CompanyInfo>()
  const formInfoPartB = useForm<CompanyInfo>()
  const [open, setOpen] = useState(false)
  const [detailContract, setDetailContract] = useState<any>()
  const [detailContractAppendices, setDetailContractAppendices] = useState<any>()
  const [refetch, setRefetch] = useState(false)
  const actionSale: ActionType[] = [
    {
      id: 1,
      title: (
        <>
          <ArrowUpOnSquareIcon className='h-5' /> Trình duyệt
        </>
      ),
      color: 'text-blue-700',
      disable: (d: any) => !d?.canSend || d?.status == 'SUCCESS' || d?.currentStatus == 'SUCCESS',
      callback: (d: any) => {
        setStatus(1)
        setChangeStatus(true)
      }
    },
    {
      id: 2,
      title: (
        <>
          <PaperAirplaneIcon className='h-5' /> Gửi khách hàng
        </>
      ),
      color: 'text-teal-700',
      disable: (d: any) => !d?.canSendForCustomer || d?.status == 'SUCCESS' || d?.currentStatus == 'SUCCESS',
      callback: (d: any) => {
        setStatus(7)
        setChangeStatus(true)
      }
    },
    {
      id: 4,
      title: (
        <>
          <Cog6ToothIcon className='h-5' /> Sửa
        </>
      ),
      color: 'text-violet-700',
      disable: (d: any) => !d?.canUpdate,
      callback: (d: any) => {
        setEditModal(true)
      }
    },
    {
      id: 5,
      title: (
        <>
          <NoSymbolIcon className='h-5' /> Xóa
        </>
      ),
      color: 'text-red-700',
      disable: (d: any) => !d?.canDelete,
      callback: (d: any) => {
        setDeleteModal(true)
      }
    }
  ]
  const actionOfficeAdmin: ActionType[] = [
    {
      id: 1,
      title: (
        <>
          <ArrowUpOnSquareIcon className='h-5' /> Trình ký
        </>
      ),
      color: 'text-blue-950',
      disable: (d: any) => !d?.canSendForMng,
      callback: (d: any) => {
        setStatus(4)
        setChangeStatus(true)
      }
    },
    {
      id: 2,
      title: (
        <>
          <ArrowUturnLeftIcon className='h-5' /> Xác nhận duyệt
        </>
      ),
      color: 'text-green-700',
      disable: (d: any) => !d?.canApprove,
      callback: (d: any) => {
        setStatus(2)
        setChangeStatus(true)
      }
    },

    {
      id: 4,
      title: (
        <>
          <ArrowUturnLeftIcon className='h-5' /> Từ chối duyệt
        </>
      ),
      color: 'text-orange-700',
      disable: (d: any) => !d?.canApprove,
      callback: (d: any) => {
        setStatus(3)
        setChangeStatus(true)
      }
    },
    {
      id: 7,
      title: (
        <>
          <PaperAirplaneIcon className='h-5' /> Gửi khách hàng
        </>
      ),
      color: 'text-teal-700',
      disable: (d: any) => !d?.canSendForCustomer,
      callback: (d: any) => {
        setStatus(7)
        setChangeStatus(true)
      }
    },
    {
      id: 5,
      title: (
        <>
          <Cog6ToothIcon className='h-5' /> Sửa
        </>
      ),
      color: 'text-violet-700',
      disable: (d: any) => !d?.canUpdate,
      callback: (d: any) => {
        setEditModal(true)
      }
    },
    {
      id: 6,
      title: (
        <>
          <NoSymbolIcon className='h-5' /> Xóa
        </>
      ),
      color: 'text-red-700',
      disable: (d: any) => !d?.canDelete,
      callback: (d: any) => {
        setDeleteModal(true)
      }
    }
  ]
  const actionAdmin: ActionType[] = [
    {
      id: 1,
      title: (
        <>
          <PencilIcon className='h-5' /> Ký hợp đồng
        </>
      ),
      color: 'text-green-700',
      disable: (d: any) => {
        const statusPL = user?.email == d?.createdBy ? ['NEW'] : ['WAIT_SIGN_A']
        return !statusPL.includes(d?.currentStatus)
      },
      callback: (d: any) => {
        navigate(`/view/${d?.id}/sign-appendices/1`)
      }
    },
    {
      id: 2,
      title: (
        <>
          <ArrowUturnLeftIcon className='h-5' /> Từ chối ký
        </>
      ),
      color: 'text-orange-700',
      disable: (d: any) => {
        const statusPL = user?.email == d?.createdBy ? [] : ['WAIT_SIGN_A']
        return !statusPL.includes(d?.currentStatus)
      },
      callback: (d: any) => {
        setStatus(6)
        setChangeStatus(true)
      }
    },
    {
      id: 6,
      title: (
        <>
          <PaperAirplaneIcon className='h-5' /> Gửi khách hàng
        </>
      ),
      color: 'text-teal-700',
      disable: (d: any) => {
        const statusPL = user?.email == d?.createdBy ? ['SIGN_A_OK'] : ['']
        return !statusPL.includes(d?.currentStatus)
      },
      callback: (d: any) => {
        setStatus(7)
        setChangeStatus(true)
      }
    },
    {
      id: 4,
      title: (
        <>
          <Cog6ToothIcon className='h-5' /> Sửa
        </>
      ),
      color: 'text-violet-700',
      disable: (d: any) => {
        const statusPL = user?.email == d?.createdBy ? ['NEW', 'SIGN_B_FAIL'] : ['SIGN_A_FAIL']
        return !statusPL.includes(d?.currentStatus)
      },
      callback: (d: any) => {
        setEditModal(true)
      }
    },
    {
      id: 5,
      title: (
        <>
          <NoSymbolIcon className='h-5' /> Xóa
        </>
      ),
      color: 'text-red-700',
      disable: (d: any) => {
        const statusPL = user?.email == d?.createdBy ? ['NEW', 'SIGN_B_FAIL'] : ['SIGN_A_FAIL']
        return !statusPL.includes(d?.currentStatus)
      },
      callback: (d: any) => {
        setDeleteModal(true)
      }
    }
  ]
  const actionTable = {
    ADMIN: actionAdmin,
    SALE: actionSale,
    OFFICE_ADMIN: actionOfficeAdmin,
    OFFICE_STAFF: []
  }
  const permissionUser: any = useMemo(() => {
    if (user?.role == ADMIN || user?.permissions.includes(permissionObject.MANAGER)) return ADMIN
    else if (user?.permissions.includes(permissionObject.OFFICE_ADMIN)) return 'OFFICE_ADMIN'
    else if (user?.permissions.includes(permissionObject.SALE)) return 'SALE'
    else return 'OFFICE_STAFF'
  }, [user])
  const {
    register,
    reset,
    formState: { errors }
  } = useForm<FormType>()
  const deleteTemplate = useMutation(deleteAppendices, {
    onSuccess: () => {
      successNotification('Xóa thành công!')
      navigate(`/appendices/${id}`)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    }
  })
  const handleDelete = () => {
    deleteTemplate.mutate(idDetail as string)
  }
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
  useEffect(() => {
    async function fetchAPI() {
      try {
        if (idDetail) {
          const response = await getAppendicesContractById(idDetail)
          const response2 = await getNewContractByIdNotToken(id)
          if (response.object && response2) {
            setDetailContractAppendices(response.object)
            setDetailContract(response2.object)
            reset({ ...response.object, value: response.object.value.toLocaleString() })
            if (response.object.partyA) {
              formInfoPartA.reset(response.object.partyA)
            }
            if (response.object.partyB) {
              formInfoPartB.reset(response.object.partyB)
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchAPI()
  }, [formInfoPartA, formInfoPartB, reset, id, idDetail, refetch])

  return (
    <div className='w-full h-full flex justify-center py-2 bg-[#e8eaed] '>
      <form
        className='justify-center sm:justify-between w-[80%] rounded-md flex flex-wrap px-4 py-2 h-full bg-white overflow-auto'
        autoComplete='on'
      >
        <div className='w-full flex items-center justify-between'>
          <div className='w-[50%] flex flex-wrap'>
            <div className='font-bold w-full'>Thông tin cơ bản</div>
            <div className='w-full'>Người tạo: {detailContractAppendices?.createdBy}</div>
            <div className='w-full'>Người duyệt: {detailContractAppendices?.approvedBy}</div>
            <div className='w-full'>
              Trạng thái:
              <span className={`pl-1 font-semibold ${statusObject[detailContractAppendices?.currentStatus]?.color}`}>
                {detailContractAppendices?.currentStatus
                  ? statusObject[detailContractAppendices?.currentStatus]?.title?.[permissionUser]
                  : ''}
              </span>
            </div>
          </div>
          <div className='w-[50%] flex gap-3 items-center justify-end'>
            <button
              type='button'
              onClick={() => navigate(`/appendices/${id}`)}
              className='flex justify-center items-center gap-3 cursor-pointer bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-md'
            >
              Trở lại
            </button>
            <Menu as='div' className='relative inline-block text-left '>
              <Menu.Button className='flex justify-center items-center gap-3 cursor-pointer bg-main-color hover:bg-hover-main text-white px-3 py-2 rounded-md'>
                Cài đặt
              </Menu.Button>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-24 -top-10 z-50 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                  {actionTable[permissionUser]?.map((action: ActionType) => (
                    <Menu.Item key={action.id} disabled={action.disable(detailContractAppendices)}>
                      {({ active }) => (
                        <button
                          onClick={() => action.callback(detailContractAppendices)}
                          type='button'
                          className={`group flex w-full items-center ${action.disable(detailContractAppendices) ? 'text-gray-300' : active ? 'bg-blue-500 text-white' : action?.color} gap-3 rounded-md px-2 py-1 text-sm `}
                        >
                          {action.title}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <div className='w-full flex gap-6 items-center justify-between'>
          <div className='font-bold'>Thông tin hợp đồng</div>
          <div className='flex items-center gap-4'>
            <Listbox>
              <div className='relative'>
                <Listbox.Button className='px-4 py-2 cursor-pointer rounded-md bg-blue-500 text-white flex justify-center text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                  Lịch sử hợp đồng
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute z-40 mt-1 w-[60vw] md:w-[60vw] right-0 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                    <Listbox.Option
                      key='history'
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-4 pr-4 ${
                          active ? 'text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value='history'
                    >
                      {() => <ContractHistory selectedContract={idDetail} />}
                    </Listbox.Option>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='px-4 py-2 cursor-pointer rounded-md bg-blue-500 text-white flex justify-center text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'
            >
              Xem file
            </button>
          </div>
        </div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Tên hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Ví dụ: Tên công ty-Đối tác-HDKD'
            disabled
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
            Số hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.number ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            Giá trị(VND)<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.value ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            disable
            setContents={detailContractAppendices?.rule}
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
            className={`${formInfoPartA.formState.errors.taxNumber ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            placeholder='Nhập mã số thuế'
            {...formInfoPartA.register('taxNumber', {
              required: 'Mã số thuế không được để trống'
            })}
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
            className={`${formInfoPartA.formState.errors.email ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            className={`${formInfoPartA.formState.errors.address ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
            className={`${formInfoPartA.formState.errors.presenter ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
            className={`${formInfoPartA.formState.errors.position ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
            className={`${formInfoPartA.formState.errors.businessNumber ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.bankId ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
          {/* <input
            className={`${formInfoPartA.formState.errors.bankName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên ngân hàng'
            {...formInfoPartA.register('bankName', {
              required: 'Tên ngân hàng không được để trống'
            })}
          /> */}
          <select
            {...formInfoPartA.register('bankName', { required: 'Tên ngân hàng không được để trống.' })}
            disabled
            className='block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          >
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
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.bankAccOwer ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
        <div className='w-full md:w-[30%] '></div>
        {/* Thông tin công ty B */}
        <div className='w-full mt-5 font-bold'>Thông tin bên B</div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Mã số thuế<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.taxNumber ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            className={`${formInfoPartB.formState.errors.name ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            className={`${formInfoPartB.formState.errors.email ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            className={`${formInfoPartB.formState.errors.address ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            className={`${formInfoPartB.formState.errors.presenter ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            className={`${formInfoPartB.formState.errors.position ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
            className={`${formInfoPartB.formState.errors.businessNumber ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
            placeholder='Nhập thông tin'
            {...formInfoPartB.register('businessNumber')}
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
            className={`${formInfoPartB.formState.errors.bankId ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
          {/* <input
            className={`${formInfoPartB.formState.errors.bankName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên ngân hàng'
            {...formInfoPartB.register('bankName', {
              required: 'Tên ngân hàng không được để trống'
            })}
          /> */}
          <select
            {...formInfoPartB.register('bankName', { required: 'Tên ngân hàng không được để trống.' })}
            disabled
            className='block disabled:bg-gray-200 w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          >
            {banks.map(
              (bank: { id: number; code: string; shortName: string; logo: string; bin: string; name: string }) => (
                <option key={bank.id} value={bank.name}>
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
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.bankAccOwer ? 'ring-red-600' : ''} disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            disabled
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
        <div className='w-full md:w-[30%] '></div>
        <div className='w-full md:w-[30%]'></div>
        <div className='w-full mt-5 font-bold'>Điều khoản hợp đồng</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='term'
            placeholder='Điều khoản'
            height='60vh'
            disable={true}
            setContents={detailContractAppendices?.term}
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
            disabled
            {...register('urgent')}
          />
          <label className='font-light '>Tạo hợp đồng với trạng thái khẩn cấp</label>
        </div> */}
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
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-[100vw] md:w-[90vw] md:h-[94vh] transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between mb-2'>
                    <div className='font-semibold'>Xem hợp đồng</div>
                    <div className='flex gap-3 items-center'>
                      <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => setOpen(false)} />
                    </div>
                  </div>

                  <ViewContract src={detailContract?.file} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setDeleteModal(false)}>
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
                <Dialog.Panel className='w-[100vw] md:w-[40vw] md:h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Xóa hợp đồng
                  </Dialog.Title>
                  <div>
                    <div>Bạn có chắc chắn với quyết định của mình?</div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        disabled={deleteTemplate?.isLoading}
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={() => handleDelete()}
                      >
                        {deleteTemplate?.isLoading ? <LoadingIcon /> : 'Xác nhận'}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={editModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setEditModal(false)}>
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
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-[100vw] md:w-[90vw] md:h-[94vh] transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between mb-2'>
                    <div className='font-semibold'>Chỉnh sửa</div>
                    <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={() => setEditModal(false)} />
                  </div>
                  <EditAppendicesContract
                    selectedContract={detailContract}
                    handleCloseModal={() => setEditModal(false)}
                    refetch={() => {
                      setRefetch(!refetch)
                    }}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={changeStatus} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setChangeStatus(false)}>
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
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-[100vw] md:w-[60vw] md:h-[94vh] transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between mb-2'>
                    <div className='font-semibold'>{statusRequest[status]?.title}</div>
                    <div className='flex gap-3 items-center'>
                      <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => setChangeStatus(false)} />
                    </div>
                  </div>
                  <SendMailUpdateStatus
                    id={idDetail}
                    status={status}
                    closeModal={() => setChangeStatus(false)}
                    refetch={() => {
                      setRefetch(!refetch)
                    }}
                    dataC={detailContract}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default ViewAppendicesContract
