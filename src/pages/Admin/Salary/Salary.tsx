import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import Loading from '~/components/shared/Loading/Loading'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import useToast from '~/hooks/useToast'
import PaySlipFormula from '~/components/Admin/Salary/PaySlipFormula'
import { getSalaryAll, getSalaryByMail } from '~/services/salary.service'
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import { listMonth, listYear } from '~/common/utils/formatDate'
import { formatPrice } from '~/common/utils/formatPrice'
import { useAuth } from '~/context/authProvider'
import { ADMIN } from '~/common/const/role'
import { useNavigate } from 'react-router-dom'
import { DownloadTableExcel } from 'react-export-table-to-excel'

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
  dob?: string
}
type FormSearch = {
  searchText: string
  year: number
  month: number
}
const Salary = () => {
  const [manageModal, setManageModal] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const { user } = useAuth()
  const { errorNotification } = useToast()
  const prevPageRef = useRef(page)
  const prevSizeRef = useRef(size)
  const navigate = useNavigate()
  const years = listYear()
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  const tableRef = useRef(null)

  const { handleSubmit, register, getValues, watch } = useForm<FormSearch>({
    defaultValues: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 }
  })
  const onSubmit: SubmitHandler<FormSearch> = async () => {
    refetch()
  }

  const listMonths = useMemo(() => listMonth(getValues('year') || 0), [watch('year')])
  const { data, isLoading, refetch, isFetching } = useQuery(
    ['employee-list'],
    () => {
      if (user?.role == ADMIN) {
        return getSalaryAll({
          page: page,
          size: size,
          month: getValues('month'),
          year: getValues('year'),
          type: 'SALE'
        })
      }
      return getSalaryByMail({
        page: page,
        size: size,
        month: getValues('month'),
        year: getValues('year')
      })
    },
    {
      onSuccess: (result) => {
        console.log(result)

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
      <div className='flex flex-wrap'>
        <div className='w-full px-3'>
          <div className='flex gap-3 justify-between w-full py-3 h-[60px]'>
            <div className='flex  w-[70%]'>
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
                  placeholder='Nhân viên'
                />
                <select
                  {...register('month')}
                  className='block  w-[16%] shadow-md text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  <option value={0}>Trống</option>
                  {listMonths?.map((m: number) => (
                    <option value={m} key={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  {...register('year')}
                  className='block w-[16%] shadow-md text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  {years?.reverse().map((m: number) => (
                    <option value={m} key={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <button
                  type='submit'
                  className='rounded-md w-[150px] shadow-md bg-main-color px-2 py-1 text-xs sm:text-sm font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                >
                  Tìm kiếm
                </button>
              </form>
            </div>

            {user?.role == ADMIN ? (
              <div className='flex gap-3'>
                <DownloadTableExcel filename={`Bảng lương`} sheet='Lương' currentTableRef={tableRef.current}>
                  <button
                    type='button'
                    onClick={() => console.log('export')}
                    className='rounded-md  bg-main-color px-4 py-2 text-xs sm:text-sm items-center font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                  >
                    Xuất ra Excel
                  </button>
                </DownloadTableExcel>
                <button
                  type='button'
                  onClick={() => navigate('/pay-slip')}
                  className='rounded-md flex gap-1 bg-main-color px-4 py-2 text-xs sm:text-sm items-center font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                >
                  Quản lí
                </button>
              </div>
            ) : (
              <div className='flex gap-3'>
                <DownloadTableExcel filename={`Bảng lương`} sheet='Lương' currentTableRef={tableRef.current}>
                  <button
                    type='button'
                    onClick={() => console.log('export')}
                    className='rounded-md  bg-main-color px-4 py-2 text-xs sm:text-sm items-center font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                  >
                    Xuất ra Excel
                  </button>
                </DownloadTableExcel>
                <button
                  type='button'
                  onClick={() => setManageModal(true)}
                  className='rounded-md  bg-main-color px-4 py-2 text-xs sm:text-sm items-center font-medium text-white hover:bg-hover-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
                >
                  Công thức
                </button>
              </div>
            )}
          </div>

          <div className='overflow-auto'>
            <div className='shadow-md sm:rounded-lg h-fit'>
              <table ref={tableRef} className='w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 '>
                <thead className='text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                  <tr>
                    <th className='px-3 py-3 w-[30px]' align='center'>
                      STT
                    </th>
                    <th className='px-3 py-3 w-[150px]'>Tên nhân viên</th>
                    <th className='px-3 py-3'> Email</th>
                    <th className='px-3 py-3 ' align='center'>
                      Tổng DS(VND)
                    </th>
                    <th className='px-3 py-3 ' align='center'>
                      Lương cứng(VND)
                    </th>
                    {/* <th className='px-6 py-3 '>Vị trí</th> */}
                    <th className='px-6 py-3 ' align='center'>
                      % DS
                    </th>
                    <th className='px-6 py-3 ' align='center'>
                      % Triển khai KH
                    </th>

                    <th className='px-6 py-3 ' align='center'>
                      Thưởng đạt ngưỡng(VND)
                    </th>
                    <th className='px-6 py-3 ' align='center'>
                      Trợ cấp ăn(VND)
                    </th>
                    <th className='px-6 py-3 ' align='center'>
                      Phụ cấp(VND)
                    </th>
                    <th className='px-6 py-3 ' align='center'>
                      Tiền lương(VND)
                    </th>
                  </tr>
                </thead>

                <tbody className='w-full '>
                  {!isLoading &&
                    !isFetching &&
                    data?.object?.content?.map((d: any, index: number) => (
                      <tr
                        key={d.id}
                        className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 '
                      >
                        <td className='px-3 py-3 w-[30px]' align='center'>
                          {page * size + index + 1 < 10 ? `0${page * size + index + 1}` : page * size + index + 1}
                        </td>
                        <td className='px-3 py-4'>{d?.user?.name}</td>
                        <td className='px-3 py-4'>{d.email}</td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.totalValueContract)}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.baseSalary)}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.commissionPercentage)}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.clientDeploymentPercentage)}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.bonusReachesThreshold)}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.foodAllowance)}
                        </td>{' '}
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.transportationOrPhoneAllowance)}
                        </td>
                        <td className='px-3 py-4' align='center'>
                          {formatPrice(d.totalSalary)}
                        </td>
                        {/* <td className='px-3 py-4 text-right'>
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
                                        setSelectedUser(d)
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
                        </td> */}
                      </tr>
                    ))}
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
                    <UserIcon width={50} height={50} />
                    Chưa có nhân viên
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isLoading && !isFetching && data?.object && data?.object?.content?.length != 0 && (
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

      <Transition appear show={manageModal} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setManageModal(false)}>
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
                  <div className='flex justify-between mb-2'>
                    <div className='font-bold'>Công thức phiếu lương</div>
                    <div className='flex gap-3 items-center'>
                      <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => setManageModal(false)} />
                    </div>
                  </div>
                  <PaySlipFormula />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default Salary
