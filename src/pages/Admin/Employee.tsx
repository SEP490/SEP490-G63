import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import AddNewEmployee from '~/components/Admin/Employee/AddNewEmployee'
import { PlusIcon } from '@heroicons/react/24/outline'
import ViewEmployee from '~/components/Admin/Employee/ViewEmployee'
const Employee = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDetail, setViewDetail] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <div className='bg-[#e8eaed] h-full'>
      <div className='flex flex-wrap py-4'>
        <div className='font-bold hidden md:flex md:w-[20%] px-3 md:flex-col items-center '>
          <p className='font-bold text-[28px]'>Employee</p>
          <div className='overflow-x-auto shadow-md sm:rounded-md my-3 w-full'>
            <div className='bg-white pl-4'>
              <p>Permissions</p>
              <div className='font-normal'>select permission</div>
            </div>
          </div>
        </div>
        <div className=' w-full px-5  md:w-[80%]'>
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
                placeholder='Search for employee'
              />
            </div>

            <button
              type='button'
              onClick={openModal}
              className='rounded-md flex gap-1 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-[#00b63e] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            >
              <PlusIcon className='h-5 w-5' /> Add Employee
            </button>
          </div>
          <div className=' overflow-x-auto shadow-md sm:rounded-lg my-3'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto '>
              <thead className=' text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Employee Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Phone
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Department
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Position
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Address
                  </th>

                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='w-full'>
                <tr className=' w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:underline cursor-pointer'
                    onClick={() => setViewDetail(true)}
                  >
                    Nguyễn Hữu Thắng
                  </th>
                  <td className='px-6 py-4'>thangnhhe161517@fpt.edu.vn</td>
                  <td className='px-6 py-4'>0854898556</td>
                  <td className='px-6 py-4'>IT</td>
                  <td className='px-6 py-4'>Dev</td>
                  <td className='px-6 py-4'>Thon 3,Thach Hoa,Thach That,Ha Noi</td>

                  <td className='px-6 py-4 text-right'>
                    <a href='#' className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className='w-[100vw] md:w-[60vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Add New Employee
                  </Dialog.Title>
                  <AddNewEmployee />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={viewDetail} as={Fragment}>
        <Dialog as='div' className='relative z-10 w-[90vw]' onClose={() => setViewDetail(false)}>
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
                <Dialog.Panel className='w-[100vw] md:w-[60vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Employee Detail
                  </Dialog.Title>
                  <ViewEmployee />
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
