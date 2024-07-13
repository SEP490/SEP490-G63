import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import AddNewEmployee from '~/components/Admin/Employee/AddNewEmployee'
import {
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  NoSymbolIcon,
  PlusIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import ViewEmployee from '~/components/Admin/Employee/ViewEmployee'
import { deleteEmployee, getListEmployee } from '~/services/employee.service'
import EditEmployee from '~/components/Admin/Employee/EditEmployee'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import Loading from '~/components/shared/Loading/Loading'
import { useMutation, useQuery } from 'react-query'
import { AxiosError } from 'axios'
import useToast from '~/hooks/useToast'
import LoadingIcon from '~/assets/LoadingIcon'
import DocumentIcon from '~/assets/svg/document'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteAppendices, deleteNewContract, getAppendicesContactAll } from '~/services/contract.appendices.service'
import moment from 'moment'
import ViewContract from '~/components/Admin/NewContract/ViewContract'
import { getNewContractById } from '~/services/contract.service'
export interface DataContract {
  id?: string
  name?: string
  number?: string
  rule?: string
  term?: string
  file?: string
  createdDate?: string
  status?: string
  approvedBy?: string
  signA?: string
  signB?: string
  createdBy?: string
}
const AppendicesContract = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDetail, setViewDetail] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const { errorNotification, successNotification } = useToast()
  const prevPageRef = useRef(page)
  const prevSizeRef = useRef(size)
  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedContract, setSelectedContract] = useState<DataContract | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [searchData, setSearchData] = useState('')
  function closeAllModal() {
    setDeleteModal(false)
    setEditModal(false)
    setViewDetail(false)
    setSelectedContract(null)
  }
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  const { data: dataContract, isLoading: loadingContract } = useQuery('get-contract-detail', () =>
    getNewContractById(id as string)
  )
  const { data, isLoading, refetch, isFetching } = useQuery(
    ['appendices-list'],
    () => getAppendicesContactAll(id as string, page, size),
    {
      onSuccess: (result) => {
        setTotalPage(result?.object?.totalPages)
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
      }
    }
  )
  const deleteAppendicesQuery = useMutation(deleteAppendices, {
    onSuccess: (response) => {
      if (response?.code == '00') {
        closeAllModal()
        refetch()
      }
    }
  })
  const handleDeleteAppendices = () => {
    deleteAppendicesQuery.mutate(selectedContract?.id as string)
  }
  useEffect(() => {
    if (prevPageRef.current !== page || prevSizeRef.current !== size) {
      prevPageRef.current = page
      prevSizeRef.current = size
      refetch()
    }
  }, [page, refetch, size])
  const deleteQuery = useMutation(deleteEmployee, {
    onSuccess: (data) => {
      if (data?.code == '00') {
        successNotification('Xóa người dùng thành công!!!')
        refetch()
        closeAllModal()
      } else errorNotification('Xóa người dùng thất bại')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    }
  })

  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <div className='flex flex-wrap py-4'>
        <div className='w-full px-5'>
          <div className='flex gap-3 justify-between items-center w-full'>
            <div className='test-[23px]'>
              Phụ lúc hợp đồng cho hợp đồng: <span className='font-bold'>{dataContract?.object?.name}</span> số:{' '}
              <span className='font-bold'>{dataContract?.object?.number}</span>
            </div>
            <button
              type='button'
              onClick={() => navigate(`/appendices-create/${id}`)}
              className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <PlusIcon className='h-5 w-5' /> Thêm mới phụ lục
            </button>
          </div>
          <div className='shadow-md sm:rounded-lg my-3 h-fit '>
            <table className='w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 '>
              <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                <tr>
                  <th className='px-3 py-3 w-[30px]'>STT</th>
                  <th className='px-3 py-3 w-[200px]'>Tên hợp đồng</th>
                  <th className='px-3 py-3 w-[250px]'>Số hợp đồng</th>
                  <th className='px-3 py-3 '>Ngày tạo</th>
                  <th className='px-3 py-3 '>Trạng thái</th>
                  <th className='px-3 py-3 ' align='center'>
                    Chi tiết
                  </th>
                  <th className='px-3 py-3'></th>
                </tr>
              </thead>

              <tbody className='w-full '>
                {!isLoading &&
                  !isFetching &&
                  data?.object?.content?.map((d: DataContract, index: number) => (
                    <tr
                      key={d.id}
                      className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 '
                    >
                      <th className='px-3 py-3 w-[30px]'>{page * size + index + 1}</th>

                      <th
                        className='px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:underline cursor-pointer hover:text-blue-500'
                        onClick={() => {
                          setViewDetail(true)
                          selectedContract(d)
                        }}
                      >
                        <div className='w-[150px] truncate ...'>{d.name}</div>
                      </th>
                      <td className='px-3 py-4 w-[250px]'>{d.number}</td>
                      <td className='px-3 py-4'>
                        {d?.createdDate ? moment(d?.createdDate).format('DD/MM/YYYY') : d?.createdDate}
                      </td>
                      <td className='px-3 py-4'>{d.status}</td>
                      <td className='px-3 py-4' align='center'>
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
                                    onClick={() => {
                                      setDeleteModal(true)
                                      setSelectedContract(d)
                                    }}
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
            {(isLoading || isFetching) && (
              <Loading loading={isLoading || isFetching}>
                <div className='w-full min-h-[200px] opacity-75 bg-gray-50 flex items-center justify-center'></div>
              </Loading>
            )}
            {!isLoading && !isFetching && (data == null || data?.object?.content?.length == 0) && (
              <div className='w-full min-h-[200px] opacity-75 bg-gray-50 flex items-center justify-center'>
                <div className='flex flex-col justify-center items-center opacity-60'>
                  <DocumentIcon />
                  Chưa có phụ lục hợp đồng
                </div>
              </div>
            )}
          </div>
          {!isLoading && !isFetching && data && data?.object?.content?.length != 0 && (
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
                    <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => setOpenModal(false)} />
                  </div>
                  <ViewContract src={selectedContract?.file} />
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
                    <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => setDeleteModal(false)} />
                  </div>
                  <div>
                    Bạn có chắc chắn muốn xóa hợp đồng?
                    <button
                      type='button'
                      disabled={deleteAppendicesQuery?.isLoading}
                      onClick={handleDeleteAppendices}
                      className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                      data-ripple-light='true'
                    >
                      {deleteAppendicesQuery?.isLoading ? <LoadingIcon /> : 'Xóa'}
                    </button>
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
export default AppendicesContract
