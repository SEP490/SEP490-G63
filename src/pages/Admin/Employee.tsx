import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import AddNewEmployee from '~/components/Admin/Employee/AddNewEmployee'
import { Cog6ToothIcon, EllipsisVerticalIcon, NoSymbolIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline'
import ViewEmployee from '~/components/Admin/Employee/ViewEmployee'
import { getListEmployee } from '~/services/employee.service'
import EditEmployee from '~/components/Admin/Employee/EditEmployee'
import DocumentIcon from '~/assets/svg/document'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import Loading from '~/components/shared/Loading/Loading'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import useToast from '~/hooks/useToast'

export interface DataEmployee {
  id?: string
  name?: string
  email?: string
  password?: string
  phone?: string
  position?: string
  status?: string
  identificationNumber?: string
  department?: string
  permissions?: string
  address?: string
}
const Employee = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDetail, setViewDetail] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const { errorNotification } = useToast()
  const prevPageRef = useRef(page)
  const prevSizeRef = useRef(size)

  const [selectedUser, setSelectedUser] = useState<DataEmployee | undefined>(undefined)
  const [searchData, setSearchData] = useState('')
  function closeAllModal() {
    setDeleteModal(false)
    setEditModal(false)
    setViewDetail(false)
    setSelectedUser(undefined)
  }
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const handChangeInputSearch = (e: any) => {
    setSearchData(e.target.value)
  }
  const { data, isLoading, refetch, isFetching } = useQuery(
    'employee-list',
    () => getListEmployee({ size: size, page: page, name: searchData }),
    {
      onSuccess: (result) => {
        setTotalPage(result?.object?.totalPages)
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
      }
    }
  )
  useEffect(() => {
    if (prevPageRef.current !== page || prevSizeRef.current !== size) {
      prevPageRef.current = page
      prevSizeRef.current = size
      refetch()
    }
  }, [page, refetch, size])

  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <div className='flex flex-wrap py-4'>
        <div className='w-full px-5'>
          <div className='flex gap-3 justify-between w-full'>
            <div className='flex w-[50%]'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
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
                </div>
              </div>
              <input
                type='text'
                id='table-search'
                className='block p-2 ps-10 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Tìm kiếm nhân viên'
                onChange={handChangeInputSearch}
              />
            </div>

            <button
              type='button'
              onClick={openModal}
              className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <PlusIcon className='h-5 w-5' /> Thêm mới nhân viên
            </button>
          </div>
          <div className='shadow-md sm:rounded-lg my-3  max-h-[73vh] '>
            <Loading loading={isLoading || isFetching}>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
                <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                  <tr>
                    <th className='px-3 py-3 w-[200px]'>Tên nhân viên</th>
                    <th className='px-3 py-3 w-[250px]'>Email</th>
                    <th className='px-3 py-3 '>Số điện thoại</th>
                    <th className='px-3 py-3 '>Phòng ban</th>
                    <th className='px-6 py-3 '>Vị trí</th>
                    <th className='px-3 py-3 w-[300px]'>Địa chỉ</th>
                    <th className='px-3 py-3'></th>
                  </tr>
                </thead>

                <tbody className='w-full '>
                  {data?.object?.content?.map((d: DataEmployee) => (
                    <tr
                      key={d.id}
                      className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 '
                    >
                      <th
                        className='px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:underline cursor-pointer hover:text-blue-500'
                        onClick={() => {
                          setViewDetail(true)
                          setSelectedUser(d)
                        }}
                      >
                        <div className='w-[150px] truncate ...'>{d.name}</div>
                      </th>
                      <td className='px-3 py-4 w-[250px]'>{d.email}</td>
                      <td className='px-3 py-4'>{d.phone}</td>
                      <td className='px-3 py-4'>{d.department}</td>
                      <td className='px-3 py-4'>{d.position}</td>
                      <td className='px-3 py-4'>
                        <div className='w-[300px] truncate ...'>{d.address}</div>
                      </td>

                      <td className='px-3 py-4 text-right'>
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
                            <Menu.Items className='absolute right-8 top-[-100%] z-50 mt-2 w-24 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    title='Sửa'
                                    onClick={() => {
                                      setEditModal(true)
                                      setSelectedUser(d)
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {(!data || data.length == 0) && (
                <div className='w-full min-h-[200px] opacity-75 bg-gray-50 flex items-center justify-center'>
                  <div className='flex flex-col justify-center items-center opacity-60'>
                    <UserIcon width={50} height={50} />
                    Chưa có nhân viên
                  </div>
                </div>
              )}
            </Loading>
          </div>
          {data && data?.object?.content?.length != 0 && (
            <Pagination
              totalPages={totalPage}
              currentPage={page + 1}
              size={size}
              setSize={setSize}
              setPage={setPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={closeModal}>
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
                <Dialog.Panel className='w-[100vw] md:w-[80vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Thêm mới nhân viên
                  </Dialog.Title>
                  <AddNewEmployee closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={viewDetail} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={closeAllModal}>
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
                <Dialog.Panel className='w-[100vw] md:w-[80vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Thông tin chi tiết
                  </Dialog.Title>
                  <ViewEmployee data={selectedUser} onClose={closeAllModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={editModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={closeAllModal}>
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
                <Dialog.Panel className='w-[100vw] md:w-[80vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Chỉnh sửa thông tin
                  </Dialog.Title>
                  <EditEmployee data={selectedUser} closeModal={closeAllModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={closeAllModal}>
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
                    Thông báo
                  </Dialog.Title>
                  <div>
                    <div>Nhân viên sẽ được xóa khỏi hệ thống. Bạn có chắc chắn với quyết định của mình?</div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                      >
                        Xóa
                      </button>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d]  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={closeAllModal}
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
    </div>
  )
}
export default Employee
