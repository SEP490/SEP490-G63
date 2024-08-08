import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  EllipsisVerticalIcon,
  NoSymbolIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import DocumentIcon from '~/assets/svg/document'
import Loading from '~/components/shared/Loading/Loading'

import { useMutation, useQuery } from 'react-query'

import { deletePaySlipFormula, getPaySlipFormula } from '~/services/pay.formula.service'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { formatPrice } from '~/common/utils/formatPrice'
import CreatePaySlip from '~/components/Admin/Salary/CreatePaySlip'
import { AxiosError } from 'axios'
import useToast from '~/hooks/useToast'
import LoadingIcon from '~/assets/LoadingIcon'
import UpdatePaySlip from '~/components/Admin/Salary/UpdatePaySlip'

const PaySlipFormula = () => {
  const navigate = useNavigate()
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selected, setSelected] = useState<any>(null)
  const { errorNotification, successNotification } = useToast()

  const { data, isLoading, refetch, isFetching } = useQuery(['pay-slip'], () => getPaySlipFormula())
  const closeModal = () => {
    setCreateModal(false)
    setUpdateModal(false)
    setDeleteModal(false)
    setSelected(null)
  }
  const deleteQuery = useMutation(deletePaySlipFormula, {
    onSuccess: (data) => {
      if (data?.code == '00') {
        successNotification('Xóa thành công!!!')
        refetch()
        closeModal()
      } else errorNotification('Xóathất bại')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    }
  })
  const handleDelete = () => {
    deleteQuery.mutate(selected?.id as string)
  }
  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <div className='flex gap-3 justify-between w-full py-3 h-[60px] px-3'>
        <div className='text-[23px] w-full'>Quản lí công thức phiếu lương</div>
        <div className='flex items-center gap-5'>
          <button
            type='button'
            onClick={() => navigate(`/salary`)}
            className='rounded-md justify-center w-[140px] flex gap-1 bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
          >
            <ArrowLeftIcon className='h-5 w-5' /> Quay lại
          </button>
          <button
            type='button'
            onClick={() => setCreateModal(true)}
            className='rounded-md justify-center w-[140px] flex gap-1 bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
          >
            <PlusIcon className='h-5 w-5' /> Tạo
          </button>
        </div>
      </div>
      <div className='flex h-[calc(100%-70px)] flex-col gap-2 md:flex-row justify-start sm:justify-between px-3'>
        <div className='w-full h-full  overflow-auto'>
          <div
            className={`${data != null && data?.object?.content?.length != 0 && !isLoading && !isFetching ? 'overflow-auto' : 'overflow-hidden'}`}
          >
            <div className='shadow-md sm:rounded-lg h-fit'>
              <table className='w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 '>
                <thead className=' text-xs text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                  <tr>
                    <th className='px-3 py-3 w-[5%]' align='center'>
                      STT
                    </th>
                    <th className='px-3 py-3' align='center'>
                      Tổng DS
                    </th>
                    <th className='px-3 py-3' align='center'>
                      Lương cứng
                    </th>
                    <th scope='col' className='px-3 py-3' align='center'>
                      % DS
                    </th>
                    <th scope='col' className='px-3 py-3' align='center'>
                      % triển khai KH
                    </th>
                    <th className='px-3 py-3 ' align='center'>
                      Thưởng đạt ngưỡng
                    </th>
                    <th className='px-3 py-3 ' align='center'>
                      Trợ cấp ăn
                    </th>
                    <th className='px-3 py-3 ' align='center'>
                      Phụ cấp
                    </th>
                    <th className='px-3 py-3 w-[30px]'></th>
                  </tr>
                </thead>
                <tbody className='w-full '>
                  {!isLoading && !isFetching ? (
                    data?.object?.content?.map((d: any, index: number) => (
                      <tr
                        key={d.id}
                        className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 '
                      >
                        <td className='px-3 py-3 w-[30px]' align='center'>
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.fromValueContract) == 0 && formatPrice(d.toValueContract) != 0
                            ? `< ${formatPrice(d.toValueContract)}`
                            : `${formatPrice(d.fromValueContract)} - ${formatPrice(d.toValueContract)}`}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.baseSalary)}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {d.commissionPercentage}(%)
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {d.clientDeploymentPercentage}(%)
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.bonusReachesThreshold)}
                        </td>{' '}
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.foodAllowance)}
                        </td>{' '}
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.transportationOrPhoneAllowance)}
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
                                        setUpdateModal(true)
                                        setSelected(d)
                                      }}
                                      className={`${
                                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center  gap-3 rounded-md px-2 py-1 text-sm `}
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
                                        setSelected(d)
                                      }}
                                      className={`${
                                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                      } group flex w-full items-center gap-3 rounded-md px-2 py-1 text-sm `}
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
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
              {(isLoading || isFetching) && (
                <Loading loading={isLoading || isFetching}>
                  <div className='w-full min-h-[60vh] opacity-75 bg-gray-50 flex items-center justify-center'></div>
                </Loading>
              )}

              {!isLoading && !isFetching && (data?.object == null || data?.object?.content?.length == 0) && (
                <div className='w-full min-h-[60vh] opacity-75 bg-gray-50 flex items-center justify-center'>
                  <div className='flex flex-col justify-center items-center opacity-60'>
                    <CurrencyDollarIcon className='w-20' />
                    Chưa có công thức phiếu lương
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={createModal} as={Fragment}>
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
                <Dialog.Panel className='w-[100vw] md:w-[80vw] md:h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between mb-2'>
                    <div className='font-bold'>Tạo mới</div>
                    <div className='flex gap-3 items-center'>
                      <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => closeModal()} />
                    </div>
                  </div>
                  <CreatePaySlip initialValue={{}} closeModal={closeModal} refetch={refetch} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={updateModal} as={Fragment}>
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
                <Dialog.Panel className='w-[100vw] md:w-[80vw] md:h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between mb-2'>
                    <div className='font-bold'>Tạo mới</div>
                    <div className='flex gap-3 items-center'>
                      <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => closeModal()} />
                    </div>
                  </div>
                  <UpdatePaySlip initialValue={selected} closeModal={closeModal} refetch={refetch} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={deleteModal} as={Fragment}>
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
                <Dialog.Panel className='w-[100vw] md:w-[40vw] md:h-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between mb-2'>
                    <div className='font-bold'>Thông báo</div>
                    <div className='flex gap-3 items-center'>
                      <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => closeModal()} />
                    </div>
                  </div>
                  <div>
                    <div>
                      Công thức phiếu lương sẽ được xóa khỏi hệ thống. Bạn có chắc chắn với quyết định của mình?
                    </div>
                    <div className='w-full flex justify-end mt-6'>
                      <button
                        type='button'
                        className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        data-ripple-light='true'
                        onClick={handleDelete}
                      >
                        {deleteQuery.isLoading ? <LoadingIcon /> : 'Xóa'}
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
export default PaySlipFormula
