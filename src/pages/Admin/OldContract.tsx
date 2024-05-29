import { Dialog, Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon, NoSymbolIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { truncate } from 'fs'
import moment from 'moment'
import { Fragment, useEffect, useState } from 'react'
import ViewContract from '~/components/Admin/NewContract/ViewContract'
import UploadFile from '~/components/BaseComponent/Uploadfile/UploadFile'
import useToast from '~/hooks/useToast'
import { deleteOldContract, getOldContract } from '~/services/contract.service'

const OldContract = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<any>()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const { successNotification, errorNotification } = useToast()
  const [openModalContract, setOpenModalContract] = useState(false)
  function openModal() {
    setIsOpen(true)
  }
  const handleCloseModal = () => {
    setDeleteModal(false)
    setIsOpen(false)
    setOpenModalContract(false)
    setSelectedContract(null)
  }
  const handleDelete = async () => {
    if (selectedContract?.id) {
      const response = await deleteOldContract(selectedContract?.id)
      if (response.code == '00') {
        successNotification('Xóa thành công')
        handleCloseModal()
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOldContract(page, size)
        if (response.object) {
          setData(response.object)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [page, size, isOpen, deleteModal])
  return (
    <div className='bg-[#e8eaed] h-full'>
      <div className='flex flex-wrap py-4'>
        <div className=' w-full px-5   h-[100vh]'>
          <div className='flex gap-3 justify-between w-full'>
            <div className='relative w-[50%]'>
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
                className='block p-2 ps-10 w-full text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Tìm kiếm'
              />
            </div>

            <button
              type='button'
              onClick={openModal}
              className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <PlusIcon className='h-5 w-5' /> Tải lên
            </button>
          </div>
          <div className=' overflow-x-auto shadow-md sm:rounded-lg my-3  max-h-[75vh]'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
              <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                <tr>
                  <th className='px-3 py-3'>STT</th>
                  <th className='px-3 py-3'>Tên hợp đồng</th>
                  <th className='px-3 py-3'>Ngày kí</th>
                  <th className='px-3 py-3'>Ngày bắt đầu</th>
                  <th className='px-3 py-3'>Ngày kết thúc</th>
                  <th className='px-3 py-3' align='center'>
                    Xem chi tiết
                  </th>
                  <th className='px-3 py-3'></th>
                </tr>
              </thead>
              <tbody className='w-full '>
                {data?.content?.map((d: any, index: number) => (
                  <tr
                    key={d.id}
                    className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 '
                  >
                    <td className='px-3 py-4'>{page * size + index + 1}</td>
                    <td className='px-3 py-4'>{d.contractName}</td>
                    <td className='px-3 py-4'>
                      {d.contractSignDate ? moment(d.contractSignDate).format('DD/MM/YYYY') : ''}
                    </td>
                    <td className='px-3 py-4'>
                      {d.contractStartDate ? moment(d.contractStartDate).format('DD/MM/YYYY') : ''}
                    </td>
                    <td className='px-3 py-4'>
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
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={handleCloseModal}>
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
                <Dialog.Panel className='w-[100vw] md:w-[80vw] min-h-[90vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Tải lên
                  </Dialog.Title>
                  <UploadFile handleCloseModal={handleCloseModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={handleCloseModal}>
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
                    <div>Hợp đồng này sẽ được xóa vĩnh viễn. Bạn có chắc chắn với quyết định của mình?</div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={() => handleDelete()}
                      >
                        Chắc chắn
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
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={handleCloseModal}>
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
