import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Cog6ToothIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  NoSymbolIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { AxiosError } from 'axios'
import moment from 'moment'
import { Fragment, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import EditTemplateContract from '~/components/Admin/TemplateContract/EditTemplateContract'
import ViewTemplateContract from '~/components/Admin/TemplateContract/ViewTemplateContract'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import Loading from '~/components/shared/Loading/Loading'
import useToast from '~/hooks/useToast'
import { deleteTemplateContract, getTemplateContract } from '~/services/template-contract.service'

const TemplateContract = () => {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [totalPage, setTotalPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [detailModal, setDetailModal] = useState(false)
  const navigate = useNavigate()
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const { successNotification, errorNotification } = useToast()
  const [dataTable, setDataTable] = useState([])
  const { data, error, isError, isLoading, refetch, isFetching } = useQuery('template-contract', () =>
    getTemplateContract(page, size)
  )
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  const handleCloseModal = () => {
    setDeleteModal(false)
    setOpenModal(false)
    setDetailModal(false)
    setSelectedContract(null)
  }
  const deleteTemplate = useMutation(deleteTemplateContract, {
    onSuccess: () => {
      successNotification('Xóa thành công')
      handleCloseModal()
      setTimeout(() => refetch(), 500)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data.message || '')
    }
  })
  const handleDelete = () => {
    if (selectedContract) deleteTemplate.mutate(selectedContract.id)
  }
  useEffect(() => {
    if (isError) {
      errorNotification((error as AxiosError)?.message || '')
    }
    if (data?.code == '00' && data?.success && data?.object) {
      setDataTable(data.object.content)
      setTotalPage(data.object.totalPages)
    }
  }, [data, isError, error])
  useEffect(() => {
    refetch()
  }, [page, size])
  if (isLoading || isFetching) return <Loading />
  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <div className='flex flex-wrap py-4'>
        <div className=' w-full px-5'>
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
                placeholder='Tìm kiếm mẫu hợp đồng'
                // onChange={handChangeInputSearch}
              />
            </div>

            <button
              type='button'
              onClick={() => navigate('/contract/create')}
              className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <PlusIcon className='h-5 w-5' /> Tạo mới
            </button>
          </div>
          <div className='shadow-md sm:rounded-lg my-3  max-h-[75vh]'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
              <thead className='text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 shadow-md'>
                <tr>
                  <th className='px-3 py-3'>STT</th>
                  <th className='px-3 py-3'>Tên hợp đồng</th>
                  <th className='px-3 py-3'>Chi tiết</th>
                  <th className='px-3 py-3'>Ngày tạo</th>

                  <th className='px-3 py-3 w-1'></th>
                </tr>
              </thead>

              <tbody className='w-full '>
                {dataTable?.map((d: any, index: number) => (
                  <tr
                    key={d.id}
                    className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 '
                  >
                    <td className='px-3 py-4'>{page * size + index + 1}</td>
                    <td className='px-3 py-4'>{d.nameContract}</td>
                    <td className='px-3 py-4'>
                      <div
                        className='cursor-pointer text-blue-500 hover:underline'
                        onClick={() => {
                          setSelectedContract(d)
                          setDetailModal(true)
                        }}
                      >
                        Xem
                      </div>
                    </td>

                    <td className='px-3 py-4'>{d.createdDate ? moment(d.createdDate).format('DD/MM/YYYY') : ''}</td>

                    <td className='px-3 py-4 w-[20px] cursor-pointer ho'>
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
                                    setOpenModal(true)
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
            {(!dataTable || dataTable?.length == 0) && (
              <div className='w-full min-h-[200px] opacity-75 bg-gray-50 flex items-center justify-center'>
                <div className='flex flex-col justify-center items-center opacity-60'>
                  <DocumentIcon />
                  Chưa có hợp đồng mẫu
                </div>
              </div>
            )}
          </div>
          {dataTable && dataTable?.length != 0 && (
            <Pagination
              totalPages={totalPage}
              currentPage={page + 1}
              size={size}
              setSize={setSize}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={handleCloseModal}>
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
                    Xóa hợp đồng mẫu
                  </Dialog.Title>
                  <div>
                    <div>Bạn có chắc chắn với quyết định của mình?</div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={() => handleDelete()}
                      >
                        Đồng ý
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
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={handleCloseModal}>
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
                  <div className='flex justify-between'>
                    <div className='font-semibold'>Chỉnh sửa</div>
                    <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={handleCloseModal} />
                  </div>
                  <EditTemplateContract
                    selectedContract={selectedContract}
                    handleCloseModal={handleCloseModal}
                    refetch={refetch}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={detailModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={handleCloseModal}>
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
                  <div className='flex justify-between'>
                    <div className='font-semibold'>Chi tiết</div>
                    <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={handleCloseModal} />
                  </div>
                  <ViewTemplateContract
                    selectedContract={selectedContract}
                    handleCloseModal={handleCloseModal}
                    refetch={refetch}
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
export default TemplateContract
