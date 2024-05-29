import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ViewContract from '~/components/Admin/NewContract/ViewContract'
import { XMarkIcon } from '@heroicons/react/24/outline'
const Contract = () => {
  const src =
    'https://res.cloudinary.com/dphakhyuz/image/upload/v1716909266/PDF_d0bdc551-535f-4086-8b53-15eb2fe7fe58.pdf'
  const [selectedContract, setSelectedContract] = useState(src)
  const [openModal, setOpenModal] = useState(false)
  const closeModal = () => {
    setOpenModal(false)
  }
  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Show</button>
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
                  <div className='flex justify-between'>
                    <div className='font-semibold'>Xem hợp đồng</div>
                    <XMarkIcon className='h-5 w-5 mr-3 mb-3 cursor-pointer' onClick={() => setOpenModal(false)} />
                  </div>
                  <ViewContract src={selectedContract} />
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
