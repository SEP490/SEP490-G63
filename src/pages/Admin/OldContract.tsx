import { Dialog, Transition } from '@headlessui/react'
import { NoSymbolIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AxiosError } from 'axios'
import moment from 'moment'
import { Fragment, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import LoadingIcon from '~/assets/LoadingIcon'
import DocumentIcon from '~/assets/svg/document'
import ViewContract from '~/components/Admin/NewContract/ViewContract'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import UploadFile from '~/components/BaseComponent/Uploadfile/UploadFile'
import Loading from '~/components/shared/Loading/Loading'
import useToast from '~/hooks/useToast'
import { deleteOldContract, getOldContract } from '~/services/contract.service'
import { getContractType } from '~/services/type-contract.service'

type FormSearch = {
  searchText: string
}
const OldContract = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<any>(null)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const { successNotification, errorNotification } = useToast()
  const [openModalContract, setOpenModalContract] = useState(false)
  const navigate = useNavigate()
  const prevPageRef = useRef(page)
  const prevSizeRef = useRef(size)
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }

  function openModal() {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setDeleteModal(false)
    setIsOpen(false)
    setOpenModalContract(false)
    setSelectedContract(null)
  }
  const deleteContractQuery = useMutation(deleteOldContract, {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    },
    onSuccess: (response) => {
      if (response.code == '00') {
        successNotification('Xóa thành công')
        handleCloseModal()
        refetch()
      }
    }
  })
  const handleDelete = async () => {
    if (selectedContract?.id) {
      deleteContractQuery.mutate(selectedContract?.id)
    }
  }

  const { data: typeContract, isLoading: loadingTypeContract } = useQuery('type-contract', () =>
    getContractType({ page: 0, size: 100, title: '' })
  )
  const { isLoading, refetch, isFetching } = useQuery(
    ['old-contract-list', page, size],
    () => getOldContract(page, size),
    {
      onSuccess: (response: any) => {
        setData(response?.object)
        setTotalPage(response?.object?.totalPages)
      },
      onError: (error: AxiosError<{ message: string }>) => {
        errorNotification(error.response?.data.message || 'Lỗi hệ thống')
      }
    }
  )
  const { handleSubmit, register } = useForm<FormSearch>()
  const onSubmit: SubmitHandler<FormSearch> = async (data) => {
    navigate(`/search/old-contract/${data.searchText}`)
  }

  useEffect(() => {
    if (prevPageRef.current !== page || prevSizeRef.current !== size) {
      prevPageRef.current = page
      prevSizeRef.current = size
      refetch()
    }
  }, [page, refetch, size])
  return (
    <div className='bg-[#e8eaed] h-full overflow-auto px-3'>
      <div className='flex gap-3 justify-between w-full py-3 h-[60px]'>
        <div className='flex md:w-[50%] w-[70%]'>
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
          <form onSubmit={handleSubmit(onSubmit)} className='flex w-full gap-2'>
            <input
              type='text'
              id='table-search'
              {...register('searchText')}
              className='block p-2 ps-10 w-[80%] shadow-md text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Thông tin hợp đồng'
            />
            <button
              type='submit'
              className='rounded-md shadow-md w-fit bg-main-color px-2 py-1 text-xs sm:text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <FaSearch className='float-left mt-1 mr-1' />
              Tìm kiếm
            </button>
          </form>
        </div>

        <button
          type='button'
          onClick={openModal}
          className='rounded-md shadow-md flex gap-1 items-center bg-main-color px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
        >
          <PlusIcon className='h-5 w-5' /> Tạo mới
        </button>
      </div>
      <div className='overflow-auto'>
        <div className='shadow-md sm:rounded-lg h-fit'>
          <table className='w-full text-sm text-left rtl:text-right'>
            <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 shadow-md'>
              <tr>
                <th className='px-3 py-3 w-[30px]' align='center'>
                  STT
                </th>
                <th className='px-3 py-3'>Tên hợp đồng</th>
                <th className='px-3 py-3'>Loại hợp đồng</th>
                <th className='px-3 py-3' align='center'>
                  Ngày kí
                </th>
                <th className='px-3 py-3' align='center'>
                  Ngày bắt đầu
                </th>
                <th className='px-3 py-3' align='center'>
                  Ngày kết thúc
                </th>
                <th className='px-3 py-3' align='center'>
                  Chi tiết
                </th>
                <th className='px-3 py-3'></th>
              </tr>
            </thead>

            <tbody className='w-full '>
              {!isLoading &&
                !isFetching &&
                !loadingTypeContract &&
                data?.content?.map((d: any, index: number) => (
                  <tr
                    key={d.id}
                    className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 '
                  >
                    <td className='px-3 py-4' align='center'>
                      {page * size + index + 1 < 10 ? `0${page * size + index + 1}` : page * size + index + 1}
                    </td>
                    <td className='px-3 py-4'>{d.contractName}</td>
                    <td className='px-3 py-4'>
                      {typeContract?.content?.find((t: any) => t.id == d.contractTypeId)?.title}
                    </td>
                    <td className='px-3 py-4' align='center'>
                      {d.contractSignDate ? moment(d.contractSignDate).format('DD/MM/YYYY') : ''}
                    </td>
                    <td className='px-3 py-4' align='center'>
                      {d.contractStartDate ? moment(d.contractStartDate).format('DD/MM/YYYY') : ''}
                    </td>
                    <td className='px-3 py-4' align='center'>
                      {d.contractEndDate ? moment(d.contractEndDate).format('DD/MM/YYYY') : ''}
                    </td>
                    <td className='px-3 py-4' align='center'>
                      <div
                        className='cursor-pointer text-blue-500 hover:underline'
                        onClick={() => {
                          setSelectedContract(d)
                          setOpenModalContract(true)
                        }}
                      >
                        Xem
                      </div>
                    </td>

                    <td className='px-3 py-4 w-[20px] cursor-pointer ho'>
                      <div
                        className='flex gap-1 text-red-500'
                        onClick={() => {
                          setDeleteModal(true)
                          setSelectedContract(d)
                        }}
                      >
                        <NoSymbolIcon className='h-5' /> Xóa
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {(isLoading || isFetching || loadingTypeContract) && (
            <Loading loading={isLoading || isFetching}>
              <div className='w-full min-h-[60vh] opacity-75 bg-gray-50 flex items-center justify-center'></div>
            </Loading>
          )}
          {!isLoading && !isFetching && !loadingTypeContract && (!data || data?.content?.length == 0) && (
            <div className='w-full min-h-[60vh] opacity-75 bg-gray-50 flex items-center justify-center'>
              <div className='flex flex-col justify-center items-center opacity-60'>
                <DocumentIcon />
                Bạn chưa tải lên hợp đồng cũ
              </div>
            </div>
          )}
        </div>
      </div>

      {!isLoading && !isFetching && !loadingTypeContract && data && data?.content?.length != 0 && (
        <Pagination
          totalPages={totalPage}
          currentPage={page + 1}
          size={size}
          setSize={setSize}
          setPage={setPage}
          onPageChange={handlePageChange}
        />
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-40 w-[90vw]' onClose={handleCloseModal}>
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
                <Dialog.Panel className='w-[100vw] md:w-[800px] h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between'>
                    <div className='font-semibold'>Tải lên hợp đồng</div>
                    <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={handleCloseModal} />
                  </div>
                  <UploadFile handleCloseModal={handleCloseModal} refetch={refetch} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
                <Dialog.Panel className='w-[100vw] md:w-[600px] md:h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Thông báo
                  </Dialog.Title>
                  <div>
                    <div>Hợp đồng này sẽ được xóa vĩnh viễn. Bạn có chắc chắn với quyết định của mình?</div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={() => handleDelete()}
                      >
                        {deleteContractQuery.isLoading ? <LoadingIcon /> : 'Xác nhận'}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={openModalContract} as={Fragment}>
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
                <Dialog.Panel className='w-[100vw] md:w-[90vw] md:h-[94vh] transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between'>
                    <div className='font-semibold'>Xem hợp đồng</div>
                    <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={handleCloseModal} />
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
export default OldContract
