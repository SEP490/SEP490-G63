import { useQuery, useMutation } from 'react-query'
import { useAuth } from '~/context/authProvider'
import { banContract, getContract, getContractAdmin } from '~/services/admin.contract.service'
import Loading from '../shared/Loading/Loading'
import { Fragment, useState } from 'react'
import moment from 'moment'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  LockOpenIcon,
  NoSymbolIcon,
  PaperAirplaneIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker'
import useToast from '~/hooks/useToast'
import Expried from './Expried'
import ViewContract from '../Admin/NewContract/ViewContract'

const ContractInformation = () => {
  const { user } = useAuth()
  const [code, setCode] = useState('')
  const [isSend, setIsSend] = useState(false)
  const [data1, setData1] = useState<any>([])
  const [isOpen, setIsOpen] = useState(false)
  const [extendModal, setExtendModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const { successNotification, errorNotification } = useToast()
  const [selectedModal, setSelectedModal] = useState(null)
  const [bankModal, setBankModal] = useState(false)
  const [bankImage, setBankImage] = useState(null)
  const [shouldFetch, setShouldFetch] = useState(false) // State mới để kiểm soát khi nào chạy truy vấn

  const handleCodeChange = (e: any) => {
    setCode(e.target.value)
  }

  const { data, isError, isLoading } = useQuery('get-contract-admin', () => getContractAdmin(user?.email), {
    enabled: shouldFetch && !!user?.email,
    onSuccess: () => {
      console.log('1')

      setShouldFetch(false)
    }
  })

  const getContractMutation = useMutation(
    (emailAndCode: { email: string; code: string }) => getContract(emailAndCode.email, emailAndCode.code),
    {
      onSuccess: (response) => {
        setIsSend(true)
        setData1(response.object)
        successNotification('Xác minh thành công')
      },
      onError: () => {
        errorNotification('Xác minh thất bại')
      }
    }
  )

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (user?.email) {
      getContractMutation.mutate({ email: user?.email, code })
    }
  }

  const handleFetchContract = () => {
    setShouldFetch(true)
  }

  const banContractMutation = useMutation((id: string) => banContract(id), {
    onSuccess: () => {
      successNotification('Hủy dịch vụ thành công')
      closeModal()
    }
  })

  const handleBanCompany = () => {
    if (data1?.id) {
      banContractMutation.mutate(data1.id)
    }
  }

  function closeModal() {
    setDeleteModal(false)
    setExtendModal(false)
    setSelectedModal(null)
    setIsOpen(false)
    setBankModal(false)
    setBankImage(null)
  }

  return (
    <>
      {!isSend ? (
        <div className='w-full md:w-[80%] flex flex-col items-center justify-center bg-white rounded-md shadow-md'>
          <button
            onClick={handleFetchContract}
            className='mt-4 px-4 py-2 mb-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'
          >
            Nhận mã
          </button>
          <h2 className='text-xl font-bold mb-4'>Nhập mã xác minh</h2>
          <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
            <input
              type='number'
              value={code}
              onChange={handleCodeChange}
              placeholder='Nhập mã xác minh'
              maxLength={6}
              className='w-full md:w-[50%] p-2 border border-gray-300 rounded-md mb-4'
            />
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
            >
              Xác minh
            </button>
          </form>
        </div>
      ) : (
        <div className='flex flex-wrap py-4 flex-grow'>
          <div className=' w-full px-5  md:w-[100%]'>
            <form className='mt-4'>
              <div className='flex gap-3 justify-start w-full items-start flex-wrap md:flex-nowrap'>
                <div className='relative w-full '>
                  <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
                    <svg
                      className='w-5 h-5 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                  </div>
                  <input
                    type='text'
                    id='table-search'
                    className='block p-2 ps-10 w-full text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Tìm kiếm tên hợp đồng'
                  />
                </div>
                <div className='w-[40%] h-full '>
                  <DatePicker
                    onChange={() => console.log('a')}
                    className='text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    // selected={startDate}
                    placeholderText='Ngày bắt đầu'
                    // onChange={(date) => setStartDate(date)}
                  />
                </div>

                <div className='w-[40%] h-full'>
                  <DatePicker
                    onChange={() => console.log('a')}
                    className='text-xs text-gray-900 border border-gray-300 rounded-md  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    // selected={endDate}
                    // minDate={startDate}
                    placeholderText='Ngày kết thúc'
                    // onChange={(date) => setEndDate(date)}
                  />
                </div>
                <button
                  type='submit'
                  className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                >
                  Tìm
                </button>
              </div>
            </form>
            <div className='overflow-x-auto  my-3 z-0 h-[70vh]'>
              <table className='w-full text-sm text-left shadow-md sm:rounded-lg rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto z-0'>
                <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    {/* <th scope='col' className='px-2 py-3 text-center'>
                      STT
                    </th> */}
                    <th scope='col' className='px-2 py-3 text-center'>
                      Tên hợp đồng
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Ngày bắt đầu
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Ngày kết thúc
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Ngày đăng ký
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Mã số thuế
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Trạng thái
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Thành tiền(VND)
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='w-full'>
                  {/* {data1?.map((d: any, index: number) => ( */}
                  <tr className=' w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    {/* <td className='px-2 py-2 text-center'>{data1?.id}</td> */}
                    <td className='px-2 py-2 text-center'>{data1?.companyName || '___'}</td>
                    <td className='px-2 py-2 text-center'>
                      {data1?.startDateUseService
                        ? moment(data1?.startDateUseService).format('DD-MM-YYYY')
                        : data1?.startDateUseService || '___'}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      {data1?.endDateUseService
                        ? moment(data1?.endDateUseService).format('DD-MM-YYYY')
                        : data1?.endDateUseService || '___'}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      {data1?.registerDate
                        ? moment(data1?.registerDate).format('DD-MM-YYYY')
                        : data1?.registerDate || '___'}
                    </td>
                    <td className='px-2 py-2 text-center'>{data1?.taxCode || '___'}</td>
                    <td className={`px-2 py-2 text-center`}>{data1?.status || '___'}</td>
                    <td className='px-2 py-2 text-center'>
                      {data1?.price == null ? 0 : (data1?.price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '___'}
                    </td>
                    <td className='px-2 py-2 text-center'>
                      <Menu as='div' className='relative inline-block text-left '>
                        <Menu.Button>
                          <button className='flex justify-center items-center gap-3 cursor-pointer hover:text-blue-500'>
                            <EllipsisVerticalIcon className='h-7 w-7' title='Hành động' />
                          </button>
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
                          <Menu.Items className='absolute right-8 top-[-100%] z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                            {data1?.status == 'INUSE' ? (
                              <>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => setIsOpen(true)}
                                      title='Xem'
                                      className={`${
                                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                                    >
                                      <EyeIcon className='h-5' /> Xem
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      title='Gia hạn'
                                      onClick={() => {
                                        setSelectedModal(data?.id)
                                        setExtendModal(true)
                                      }}
                                      className={`${
                                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                    >
                                      <ArrowPathIcon className='h-5' /> Gia hạn
                                    </button>
                                  )}
                                </Menu.Item>

                                {data1?.status != 'LOCKED' && data1?.status != 'EXPIRED' && (
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        title='Chặn'
                                        onClick={() => {
                                          // setSelectedCustomer(d)
                                          // setBanModal(true)
                                        }}
                                        className={`${
                                          active ? 'bg-green-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                      >
                                        <NoSymbolIcon className='h-5' /> Hủy
                                      </button>
                                    )}
                                  </Menu.Item>
                                )}
                              </>
                            ) : (
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    title='Xác nhận'
                                    onClick={() => {
                                      // setSelectedCustomer(d)
                                      // setApproveModal(true)
                                    }}
                                    className={`${
                                      active ? 'bg-green-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                                  >
                                    <LockOpenIcon className='h-5' /> Kích hoạt
                                  </button>
                                )}
                              </Menu.Item>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
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
                <Dialog.Panel className='w-full max-h-[70vh] max-w-2xl transform overflow-y-auto rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 mb-4'>
                    <div className='flex justify-between'>
                      <p>Thông tin hợp đồng</p>
                      <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={closeModal} />
                    </div>
                  </Dialog.Title>
                  <div className='mt-2'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Tên công ty:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{data1?.companyName || '___'}</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Mã số thuế:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{data1?.taxCode || '___'}</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Người đại diện:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{data1?.presenter || '___'}</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Điện thoại:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{data1?.phone || '___'}</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Email:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{data1?.email || '___'}</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Trạng thái:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{data1?.status || '___'}</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Ngày tạo:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {data1?.createdDate ? moment(data1?.createdDate).format('DD-MM-YYYY') : '___'}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Ngày cập nhật:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {data1?.updatedDate ? moment(data1?.updatedDate).format('DD-MM-YYYY') : '___'}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Ngày bắt đầu sử dụng dịch vụ:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {data1?.startDateUseService
                              ? moment(data1?.startDateUseService).format('DD-MM-YYYY')
                              : '___'}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Ngày kết thúc sử dụng dịch vụ:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {data1?.endDateUseService ? moment(data1?.endDateUseService).format('DD-MM-YYYY') : '___'}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Ngày đăng ký:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {data1?.registerDate ? moment(data1?.registerDate).format('DD-MM-YYYY') : '___'}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Thành tiền (VND):</td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            {data1?.price ? data1?.price.toLocaleString('en-US') : '___'}
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Gói giá ID:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{data1?.pricePlanId || '___'}</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>Tên gói giá:</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{data1?.pricePlanName || '___'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={closeModal}>
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
                <Dialog.Panel className='w-[100vw] md:w-[40vw]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Hủy dịch vụ
                  </Dialog.Title>
                  <div>
                    <div>
                      Gói dịch vụ sẽ được hủy với công ty {data1?.companyName || '___'}. Bạn có chắc chắn với quyết định
                      của mình?
                    </div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={handleBanCompany}
                      >
                        Chấp nhận
                      </button>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d]  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={closeModal}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={extendModal} as={Fragment}>
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={closeModal}>
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
                <Dialog.Panel className='w-[100vw] md:w-[40vw]  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Gia hạn dịch vụ
                  </Dialog.Title>
                  <Expried
                    closeModal={closeModal}
                    selectedCustomer={data1}
                    bankModal={bankModal}
                    setBankModal={setBankModal}
                    bankImage={bankImage}
                    setBankImage={setBankImage}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={bankModal} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
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
                <Dialog.Panel className='w-full h-[500px]  max-w-2xl transform overflow-y-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 mb-4'>
                    <div className='flex justify-between'>
                      <p>Quét mã để thanh toán</p>
                      <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={closeModal} />
                    </div>
                  </Dialog.Title>
                  <div className='mt-2 h-full'>
                    <ViewContract src={bankImage} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ContractInformation
