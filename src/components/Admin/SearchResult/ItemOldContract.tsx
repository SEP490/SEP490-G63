import { useNavigate } from 'react-router-dom'
import { formatDate } from '~/common/utils/formatDate'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState, Fragment } from 'react'
import ViewContract from '../NewContract/ViewContract'

const ItemOldContract = ({ data }: any) => {
  const navigate = useNavigate()
  const [openModalContract, setOpenModalContract] = useState(false)
  const handleCloseModal = () => {
    setOpenModalContract(false)
  }
  return (
    <>
      <div className='flex gap-2 w-full'>
        <div className='w-1/2'>
          <div
            className='text-blue-700 hover:underline text-[20px] cursor-pointer'
            onClick={() => navigate('/old-contract')}
          >
            {data.contractName}
          </div>
          <div className='text-black flex flex-col'>
            <div>
              <strong>Ngày bắt đầu:</strong> {formatDate(data.contractStartDate)}
            </div>
            <div>
              <strong>Ngày kết thúc:</strong> {formatDate(data.contractEndDate)}
            </div>
            <div>
              <strong>Ngày ký:</strong> {formatDate(data.contractSignDate)}
            </div>
            <div>
              <strong>Người tạo:</strong> {data.createdBy}
            </div>
          </div>
        </div>
        <div className='shadow-md relative cursor-pointer '>
          <iframe className='w-full h-full overflow-hidden bg-none' scrolling='no' src={data.file} title='Contract' />
          <div className='absolute h-full w-full z-30 top-0 right-0' onClick={() => setOpenModalContract(true)}></div>
        </div>
      </div>
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
                  <ViewContract src={data?.file} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ItemOldContract
