import { Dialog, Field, Textarea, Transition } from '@headlessui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Label } from 'react-konva'
import { useQuery } from 'react-query'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import RejectSignContract from '~/components/Admin/NewContract/RejectSignContract'
import SignContract from '~/components/Admin/NewContract/SignContract'
import ViewContract from '~/components/Admin/NewContract/ViewContract'
import { getOptMail, verifyOtp } from '~/services/auth-sign-contract.service'
import { getNewContractByIdNotToken } from '~/services/contract.service'
import logo from '../../assets/svg/Tdocman.svg'
import { useForm } from 'react-hook-form'
import useToast from '~/hooks/useToast'
import { useAuth } from '~/context/authProvider'
import { ADMIN, USER } from '~/common/const/role'
import Loading from '~/components/shared/Loading/Loading'
import { permissionObject } from '~/common/const/permissions'
type FormType = {
  email: string
  code: number
}
const ViewSignContract = () => {
  const [modalSign, setModalSign] = useState(false)
  const [modalReject, setModalReject] = useState(false)
  const { id, customer } = useParams()
  const { user } = useAuth()
  const location = useLocation()
  const [checkAuth, setCheckAuth] = useState<any>(() => customer == '2')
  const { successNotification, errorNotification } = useToast()
  const commentRef = useRef<any>('')
  const { data, refetch, isFetching, isLoading } = useQuery('detail-contract-public', () =>
    getNewContractByIdNotToken(id)
  )
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<FormType>()
  const onSubmit = async (data: any) => {
    try {
      const response = await verifyOtp(data)
      if (response.code == '00') {
        successNotification('Xác thực người dùng thành công!')
        setCheckAuth(false)
      } else errorNotification('OTP không chính xác')
    } catch (e) {
      console.log(e)
      errorNotification('Lỗi hệ thống!!')
    }
  }
  const handleGetOpt = async () => {
    const result = await trigger('email')
    if (result) {
      try {
        const response = await getOptMail(getValues('email'), id, 'contract')
        if (response.code == '00') {
          successNotification('Gửi mã thành công, hãy kiểm tra hòm thư!')
        } else errorNotification('Email của bạn không khớp đúng thông tin trong hợp đồng')
      } catch (e) {
        console.log(e)
        errorNotification('Lỗi hệ thống!!')
      }
    }
  }
  if (isFetching || isLoading) return <Loading />
  if (checkAuth)
    return (
      <div className='w-full h-full flex flex-col justify-center items-center bg-white overflow-auto'>
        <div className='flex flex-col justify-center items-center  select-none'>
          <img src={logo} alt='logo' className='w-[80px] md:w-[100px]' />
          <div className=' bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-900 text-[32px] md:text-[48px] cursor-pointer'>
            TDocman
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] md:w-[50%] flex justify-center flex-wrap'>
          <div className='w-full mt-5 relative'>
            <label className='font-light '>
              Email<sup className='text-red-500'>*</sup>
            </label>
            <input
              className={`${errors.email ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              placeholder='Nhập Email của bạn'
              {...register('email', {
                required: 'Email không được để trống'
              })}
            />
            <div className={`text-red-500 absolute text-[12px]  ${errors.email ? 'visible' : 'invisible'}`}>
              {errors.email?.message}
            </div>
          </div>
          <div className='w-full mt-5 relative'>
            <label className='font-light '>
              Mã xác thực<sup className='text-red-500'>*</sup>
            </label>
            <div className='flex justify-between'>
              <input
                className={`${errors.code ? 'ring-red-600' : ''} block w-[calc(100%-130px)] rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                placeholder='Nhập mã xác thực'
                {...register('code', {
                  required: 'Mã xác thực không hợp lệ'
                })}
              />
              <button
                type='button'
                className='w-[120px] block bg-red-500 hover:bg-red-500 uppercase text-white font-bold rounded-md border-0 py-1.5 px-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onClick={handleGetOpt}
              >
                Nhận mã
              </button>
            </div>

            <div className={`text-red-500 absolute text-[12px]  ${errors.code ? 'visible' : 'invisible'}`}>
              {errors.code?.message}
            </div>
          </div>
          <div className='w-full mt-5'>
            <button
              type='submit'
              className='text-center w-full my-3 none center mr-4  bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              data-ripple-light='true'
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    )

  if (
    customer == '1' &&
    user?.role == USER &&
    (user?.permissions.includes(permissionObject.SALE) ||
      user?.permissions.includes(permissionObject.OFFICE_STAFF) ||
      user?.permissions.includes(permissionObject.OFFICE_STAFF))
  )
    return <Navigate to='/404notfound' state={{ from: location }} replace></Navigate>
  return (
    <div className='w-full h-full flex flex-col md:flex-row justify-center  bg-white overflow-auto'>
      <div className='w-full md:w-[20vw]'>
        <div className='w-full'>
          <div className='w-full text-center font-bold text-[24px] my-3'>Ký hợp đồng</div>
          <div className='w-full mt-5 px-2'>
            <Field>
              <Label className='text-sm/6 font-medium text-black'>Nhận xét:</Label>
              <Textarea
                disabled={(customer == '1' && data?.object?.signA != null) || (customer == '2' && data?.object?.signB)}
                ref={commentRef}
                placeholder='Đưa ra một số nhận xét về bản hợp đồng'
                className={`mt-3 w-full resize-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
                rows={10}
              />
            </Field>
          </div>
          <div className='w-full flex gap-1 justify-center'>
            {customer == '2' && (
              <button
                type='button'
                disabled={customer == '2' && data?.object?.signB}
                className=' my-3 none center mr-4 rounded-lg bg-red-500 px-2 py-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ad649191] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                data-ripple-light='true'
                onClick={() => setModalReject(true)}
              >
                Từ chối ký
              </button>
            )}
            <button
              type='button'
              disabled={(customer == '1' && data?.object?.signA != null) || (customer == '2' && data?.object?.signB)}
              className=' my-3 none center mr-4 rounded-lg bg-[#0070f4] px-2 py-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              data-ripple-light='true'
              onClick={() => setModalSign(true)}
            >
              Ký hợp đồng
            </button>
          </div>
        </div>
      </div>
      <div className='w-full md:w-[80vw] h-full shadow-lg'>
        <ViewContract src={data?.object?.file} />
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
                  <SignContract
                    id={id}
                    createdBy={customer == '1' ? user?.email : getValues('email')}
                    customer={customer}
                    comment={commentRef.current?.value}
                    refetch={refetch}
                    to={data?.object?.createdBy}
                    cc={data?.object?.approvedBy}
                    setModalSign={setModalSign}
                  />
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
                  <RejectSignContract contract={data.object} />
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
