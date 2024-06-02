import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import ViewContract from '~/components/Admin/NewContract/ViewContract'
import {
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  NoSymbolIcon,
  PaperAirplaneIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { getNewContract } from '~/services/contract.service'
import DocumentIcon from '~/assets/svg/document'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import Loading from '~/components/shared/Loading/Loading'
export interface DataContract {
  id: string
  name: string
  createdBy: string
  file: string
  createdDate: string
}
const Contract = () => {
  const navigate = useNavigate()
  const [selectedContract, setSelectedContract] = useState<DataContract | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const [data, setData] = useState<DataContract[] | []>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [totalPage, setTotalPage] = useState(1)
  const closeModal = () => {
    setOpenModal(false)
  }
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getNewContract(page, size)
      if (response) {
        setData(response.object?.content)
        setTotalPage(response?.object?.totalPages)
        setLoading(false)
      }
    }
    fetchAPI()
  }, [page, size])
  if (loading) return <Loading />
  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <div className='flex gap-3 justify-between w-full px-5 py-3'>
        <div className='w-[50%]'>
          {/* <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div> */}
          <input
            type='text'
            id='table-search'
            className='block p-2 ps-10 w-full text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Tìm kiếm'
          />
        </div>

        <button
          type='button'
          onClick={() => navigate('create')}
          className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
        >
          <PlusIcon className='h-5 w-5' /> Tạo mới
        </button>
      </div>
      <div className='shadow-md sm:rounded-lg my-3  max-h-[73vh] '>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
          <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
            <tr>
              <th className='px-3 py-3'>STT</th>
              <th className='px-3 py-3'>Tên hợp đồng</th>
              <th className='px-3 py-3'>Người tạo</th>
              <th scope='col' className='px-3 py-3'>
                Ngày tạo
              </th>
              <th scope='col' className='px-3 py-3'>
                Trạng thái
              </th>
              <th className='px-3 py-3'>Chi tiết</th>

              <th className='px-3 py-3'>Hành động</th>
            </tr>
          </thead>
          <tbody className='w-full '>
            {data?.map((d: any, index: number) => (
              <tr
                key={d.id}
                className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 '
              >
                <td className='px-3 py-4'>{size * page + index + 1}</td>
                <td className='px-3 py-4'>{d.name}</td>
                <td className='px-3 py-4'>{d.createBy}</td>
                <td className='px-3 py-4'>{d.createDate}</td>
                <td className='px-3 py-4'>Đang chờ</td>
                <td className='px-3 py-4'>
                  <div
                    className='cursor-pointer text-blue-500 hover:underline'
                    onClick={() => {
                      setSelectedContract(d)
                      setOpenModal(true)
                    }}
                  >
                    Xem
                  </div>
                </td>
                <td className='px-3 py-4'>
                  <div>
                    <Menu as='div' className='relative inline-block text-left '>
                      <Menu.Button className='flex justify-center items-center gap-3 cursor-pointer hover:text-blue-500'>
                        <EllipsisVerticalIcon className='h-7 w-7' title='Hành động' />
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
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                title='Sửa'
                                onClick={() => {
                                  navigate(`/send-mail/${d.id}`)
                                }}
                                className={`${
                                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                              >
                                <PaperAirplaneIcon className='h-5' /> Gửi ký
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                title='Sửa'
                                onClick={() => {
                                  setEditModal(true)
                                  setSelectedContract(d)
                                }}
                                className={`${
                                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center  gap-3 rounded-md px-2 py-2 text-sm `}
                              >
                                <Cog6ToothIcon className='h-5' /> Sửa
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                title='Xóa'
                                onClick={() => {}}
                                className={`${
                                  active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                } group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm `}
                              >
                                <NoSymbolIcon className='h-5' /> Xóa
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!data || data.length == 0) && (
          <div className='w-full min-h-[200px] opacity-75 bg-gray-50 flex items-center justify-center'>
            <div className='flex flex-col justify-center items-center opacity-60'>
              <DocumentIcon />
              Chưa có hợp đồng
            </div>
          </div>
        )}
      </div>
      {data && data?.length != 0 && (
        <Pagination totalPages={totalPage} currentPage={page + 1} onPageChange={handlePageChange} />
      )}
      <Transition appear show={openModal} as={Fragment}>
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
                <Dialog.Panel className='w-[100vw] md:w-[90vw] md:h-[94vh] transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between mb-2'>
                    <div className='font-semibold'>Xem hợp đồng</div>
                    <div className='flex gap-3 items-center'>
                      <button
                        type='button'
                        className='center rounded-lg bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                      >
                        Lịch sử hợp đồng
                      </button>
                      <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={() => setOpenModal(false)} />
                    </div>
                  </div>
                  <ViewContract src={selectedContract?.file} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default Contract
