import { Dialog, Transition } from '@headlessui/react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import RejectSignContract from '~/components/Admin/NewContract/RejectSignContract'
import SignContract from '~/components/Admin/NewContract/SignContract'
import ViewContract from '~/components/Admin/NewContract/ViewContract'
import { getNewContractById } from '~/services/contract.service'

const ViewSignContract = () => {
  const [modalSign, setModalSign] = useState(false)
  const [modalReject, setModalReject] = useState(false)
  const { id, customer } = useParams()
  const { data } = useQuery('detail-contract', () => getNewContractById(id))
  console.log(data)

  return (
    <div className='w-full h-[100vh] flex justify-center flex-wrap'>
      <div className='w-full'>
        <button
          type='button'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
          onClick={() => setModalReject(true)}
        >
          Từ chối
        </button>
        <button
          type='button'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
          onClick={() => setModalSign(true)}
        >
          Ký hợp đồng
        </button>
      </div>
      <div className='w-[80vw] h-full'>
        <ViewContract src={data.object.file} />
      </div>

      <Transition appear show={modalSign} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setModalSign(false)}>
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
                <Dialog.Panel className=' transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Ký hợp đồng
                  </Dialog.Title>
                  <SignContract />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={modalReject} as={Fragment}>
        <Dialog as='div' className='relative z-50 w-[90vw]' onClose={() => setModalReject(false)}>
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
                <Dialog.Panel className='w-[90%] md:w-[60%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                    Từ chối ký hợp đồng
                  </Dialog.Title>
                  <RejectSignContract />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
export default ViewSignContract
