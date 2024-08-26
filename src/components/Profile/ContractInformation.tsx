import { useQuery, useMutation } from 'react-query'
import { useAuth } from '~/context/authProvider'
import { banContract, getCompanyContract, getContract, getContractAdmin } from '~/services/admin.contract.service'
import Loading from '../shared/Loading/Loading'
import { Fragment, SetStateAction, useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ArrowPathIcon, EyeIcon, LockOpenIcon, NoSymbolIcon, XMarkIcon } from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker'
import useToast from '~/hooks/useToast'
import Expried from './Expried'
import ViewContract from '../Admin/NewContract/ViewContract'
import LoadingIcon from '~/assets/LoadingIcon'
import { FaArrowsUpDownLeftRight, FaCircleCheck, FaEnvelopeCircleCheck } from 'react-icons/fa6'
import { RxDotsVertical } from 'react-icons/rx'
import Pagination from '../BaseComponent/Pagination/Pagination'

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
  const [shouldFetch, setShouldFetch] = useState(false)
  const [canFetchContractCompany, setCanFetchContractCompany] = useState(false)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const prevPageRef = useRef(page)
  const prevSizeRef = useRef(size)
  const [searchTerm, setSearchTerm] = useState('')

  const handleCodeChange = (e: any) => {
    setCode(e.target.value)
  }
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }

  const { data, isError, isLoading } = useQuery('get-contract-admin', () => getContractAdmin(user?.email), {
    enabled: shouldFetch && !!user?.email,
    onSuccess: () => {
      successNotification('Gửi mail thành công')
      setShouldFetch(false)
    },
    onError: () => {
      errorNotification('Gửi mail thất bại')
      setShouldFetch(false)
    }
  })

  const getContractMutation = useMutation(
    (emailAndCode: { email: string; code: string }) => getContract(emailAndCode.email, emailAndCode.code),
    {
      onSuccess: (response) => {
        if (response.code == '00') {
          setIsSend(true)

          setData1(response.object)
          successNotification('Xác minh thành công')
          setCanFetchContractCompany(true)
        } else if (response.code == '01') {
          errorNotification('Mã xác minh không đúng')
        } else errorNotification('Xác minh không thành công')
      },
      onError: () => {
        errorNotification('Lỗi xác minh')
      }
    }
  )

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (user?.email) {
      getContractMutation.mutate({ email: user?.email, code })
    }
  }

  const { data: dataContractCompany, refetch } = useQuery(
    'get-contract-company',
    () => getCompanyContract(page, size, user?.email),
    {
      enabled: canFetchContractCompany && !!user?.email,
      onSuccess: (response) => {
        setTotalPage(response?.object?.totalPages)
      },
      onError: () => {}
    }
  )

  const handleFetchContract = () => {
    setShouldFetch(true)
  }

  useEffect(() => {
    if (prevPageRef.current !== page || prevSizeRef.current !== size) {
      prevPageRef.current = page
      prevSizeRef.current = size
      refetch()
    }
  }, [page, refetch, size])
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

  const handleSearchChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(e.target.value)
  }

  const filteredContracts = dataContractCompany?.object?.content?.filter((d: { pricePlanName: string }) =>
    d.pricePlanName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {!isSend ? (
        <div className='w-full md:w-[80%] flex flex-col items-center justify-center bg-white rounded-md shadow-md'>
          <h2 className='text-xl font-bold mb-4'>Nhập mã xác minh</h2>
          <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
            <div className='w-full md:w-[50%] flex items-center'>
              <div
                onClick={handleFetchContract}
                className='cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 mr-2'
              >
                {isLoading ? (
                  <LoadingIcon />
                ) : (
                  <div className='flex'>
                    <FaEnvelopeCircleCheck fontSize={20} className='mt-1 mr-1' />
                    Nhận mã
                  </div>
                )}
              </div>
              <input
                type='number'
                value={code}
                onChange={handleCodeChange}
                placeholder='Nhập mã xác minh'
                maxLength={6}
                className='flex-grow p-2 border border-gray-300 rounded-md'
              />
            </div>
            <button
              type='submit'
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
            >
              {getContractMutation.isLoading ? (
                <LoadingIcon />
              ) : (
                <button className='flex' disabled={isLoading}>
                  <FaCircleCheck className='mt-1 mr-1' />
                  Xác minh
                </button>
              )}
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
                    placeholder='Tìm kiếm loại hợp đồng'
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* <button
                  type='submit'
                  className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                >
                  Tìm
                </button> */}
              </div>
            </form>
            <div className='overflow-x-auto  my-3 z-0 h-[70vh]'>
              <button
                className='rounded-md m-2 float-right flex gap-1 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                onClick={() => {
                  setSelectedModal(dataContractCompany?.id)
                  setExtendModal(true)
                }}
              >
                <FaArrowsUpDownLeftRight className='mt-1' />
                Gia hạn
              </button>
              <table className='w-full text-sm text-left shadow-md sm:rounded-lg rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto z-0'>
                <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    {/* <th scope='col' className='px-2 py-3 text-center'>
                      STT
                    </th> */}
                    <th scope='col' className='px-2 py-3 text-center'>
                      Tên công ty
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Mã số thuế
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Gói hợp đồng
                    </th>

                    <th scope='col' className='px-2 py-3 text-center'>
                      Ngày đăng ký
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Số tiền(VND)
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Trạng thái
                    </th>
                    <th></th>
                  </tr>
                </thead>
                {/* {dataContractCompany?.object && ( */}
                <tbody className='w-full'>
                  {filteredContracts?.map((d: any, index: number) => (
                    <tr className=' w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                      {/* <td className='px-2 py-2 text-center'>{data1?.id}</td> */}
                      <td className='px-2 py-2 text-center'>{d.companyName || '___'}</td>
                      <td className='px-2 py-2 text-center'>{d?.taxCode || '___'}</td>
                      <td className='px-2 py-2 text-center'>{d?.pricePlanName || '___'}</td>

                      <td className='px-2 py-2 text-center'>
                        {d?.createdDate ? moment(d?.createdDate).format('DD-MM-YYYY') : d?.createdDate || '___'}
                      </td>
                      <td className='px-2 py-2 text-center'>
                        {d?.price == null ? 0 : (d?.price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '___'}
                      </td>
                      <td
                        className={`px-2 py-2 text-center font-bold ${
                          d?.status === 'PROCESSING'
                            ? 'text-amber-500'
                            : d?.status === 'APPROVED'
                              ? 'text-green-500'
                              : d?.status === 'REJECTED'
                                ? 'text-red-500'
                                : ''
                        }`}
                      >
                        {d?.status === 'PROCESSING'
                          ? 'Đang xử lý'
                          : d?.status === 'APPROVED'
                            ? 'Đã chấp nhận'
                            : d?.status === 'REJECTED'
                              ? 'Đã từ chối'
                              : '___'}
                      </td>

                      <td className='px-2 py-2 text-center'>
                        <Menu as='div' className='relative inline-block text-left '>
                          <Menu.Button>
                            <button
                              className='flex justify-center items-center gap-3 cursor-pointer hover:text-blue-500'
                              // onClick={() => setIsOpen(true)}
                            >
                              <RxDotsVertical className='h-5 w-5' title='Hành động' />
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
                            <Menu.Items className='absolute right-8 top-[-100%] z-50 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                              {d?.status == 'APPROVED' ? (
                                <>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={() => setIsOpen(true)}
                                        title='Xem'
                                        className={`${
                                          active ? 'bg-green-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                      >
                                        <EyeIcon className='h-5' /> Xem hợp đồng
                                      </button>
                                    )}
                                  </Menu.Item>
                                  {/* <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        title='Gia hạn'
                                        onClick={() => {
                                          setSelectedModal(dataContractCompany?.id)
                                          setExtendModal(true)
                                        }}
                                        className={`${
                                          active ? 'bg-green-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                      >
                                        <ArrowPathIcon className='h-5' /> Gia hạn
                                      </button>
                                    )}
                                  </Menu.Item> */}
                                </>
                              ) : (
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => setIsOpen(true)}
                                      title='Xem'
                                      className={`${
                                        active ? 'bg-green-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                                    >
                                      <EyeIcon className='h-5' /> Xem hợp đồng
                                    </button>
                                  )}
                                </Menu.Item>
                              )}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* // )} */}
              </table>
              {!isLoading && dataContractCompany?.object?.content.length != 0 ? (
                <Pagination
                  totalPages={totalPage}
                  currentPage={page + 1}
                  size={size}
                  setSize={setSize}
                  setPage={setPage}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div className='flex justify-center items-center py-12 text-gray-500'>Không tìm thấy hợp đồng</div>
              )}
            </div>
          </div>
        </div>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                <Dialog.Panel className='w-[100vw] md:w-[90vw] md:h-[94vh] transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between'>
                    <div className='font-semibold'>Xem hợp đồng</div>
                    <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={closeModal} />
                  </div>
                  <ViewContract src={data1?.file} />
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
                    <div>Gói dịch vụ sẽ được hủy. Bạn có chắc chắn với quyết định của mình?</div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={handleBanCompany}
                      >
                        Xác nhận
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
                    refetch={refetch}
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
