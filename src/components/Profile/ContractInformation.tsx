import { useQuery } from 'react-query'
import { useAuth } from '~/provider/authProvider'
import { getContract, getContractAdmin } from '~/services/admin.contract.service'
import Loading from '../shared/Loading/Loading'
import { Fragment, useState } from 'react'
import moment from 'moment'
import { Menu, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  LockOpenIcon,
  NoSymbolIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import DatePicker from 'react-datepicker'

const ContractInformation = () => {
  const { user } = useAuth()
  const [code, setCode] = useState('')
  const [isSend, setIsSend] = useState(false)
  const data1: any[] = []

  const handleCodeChange = (e: any) => {
    setCode(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const response = await getContract(user?.email, code)
    if (response) {
      setIsSend(true)
      console.log(response)
    }
    console.log('Verification Code:', code)
  }

  const { data, isError, isLoading } = useQuery('get-contract-admin', () => getContractAdmin(user?.email), {
    enabled: !!user?.email
  })

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <div>Lỗi tải hợp đồng</div>
  }

  return (
    <>
      {isSend ? (
        <div className='w-full md:w-[80%] flex flex-col items-center mx-3 py-4 px-3 justify-center bg-white rounded-md shadow-md'>
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
                    placeholder='Tìm kiếm tên công ty'
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
                    <th scope='col' className='px-2 py-3 text-center'>
                      STT
                    </th>
                    <th scope='col' className='px-2 py-3 text-center'>
                      Tên khách hàng
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
                  {data1?.map((d: any, index: number) => (
                    <tr className=' w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                      <td className='px-2 py-2 text-center'>{index + 1}</td>
                      <td className='px-2 py-2 text-center'>{d?.companyName}</td>
                      <td className='px-2 py-2 text-center'>
                        {d?.startDateUseService
                          ? moment(d?.startDateUseService).format('DD-MM-YYYY')
                          : d?.startDateUseService}
                      </td>
                      <td className='px-2 py-2 text-center'>
                        {d?.endDateUseService
                          ? moment(d?.endDateUseService).format('DD-MM-YYYY')
                          : d?.endDateUseService}
                      </td>
                      <td className='px-2 py-2 text-center'>
                        {d?.registerDate ? moment(d?.registerDate).format('DD-MM-YYYY') : d?.registerDate}
                      </td>
                      <td className='px-2 py-2 text-center'>{d?.taxCode}</td>
                      <td className={`px-2 py-2 text-center`}>Status</td>
                      <td className='px-2 py-2 text-center'>
                        {d?.price == null ? 0 : (d?.price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                              {d?.status == 'PROCESSING' ? (
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
                              ) : (
                                <>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
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
                                        className={`${
                                          active ? 'bg-green-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                      >
                                        <PaperAirplaneIcon className='h-5' /> Gửi mail
                                      </button>
                                    )}
                                  </Menu.Item>
                                  {d?.status != 'LOCKED' && d?.status != 'EXPIRED' && (
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

                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        title='Gia hạn'
                                        onClick={() => {
                                          // setSelectedCustomer(d)
                                          // setExtendModal(true)
                                        }}
                                        className={`${
                                          active ? 'bg-green-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                      >
                                        <ArrowPathIcon className='h-5' /> Gia hạn
                                      </button>
                                    )}
                                  </Menu.Item>

                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={() => {
                                          // setFileModal(true)
                                          // setSelectedCustomer(d)
                                        }}
                                        title='Tải file'
                                        className={`${
                                          active ? 'bg-green-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                                      >
                                        <ArrowUpOnSquareIcon className='h-5' /> Tải file
                                      </button>
                                    )}
                                  </Menu.Item>
                                </>
                              )}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ContractInformation
