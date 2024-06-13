import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import useToast from '~/hooks/useToast'
import { extendService, getPrice, handleBankTransaction } from '~/services/admin.contract.service'
import Loading from '../shared/Loading/Loading'

type FormData = {
  pricePlan: string
}

const Expried = ({ closeModal, selectedCustomer, bankModal, setBankModal, bankImage, setBankImage }: any) => {
  const { errorNotification, successNotification } = useToast()
  const [isConfirm, setIsConfirm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>()
  const [extendData, setExtendData] = useState<any>()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const { data, isError, isLoading } = useQuery('get-price', getPrice)

  const extendServiceMutation = useMutation(
    (params: { companyId: string; pricePlanId: string; payed: boolean }) => extendService(params),
    {
      onSuccess: (response) => {
        setExtendData(response?.object)
        setIsConfirm(true)
      },
      onError: () => {
        errorNotification('Có lỗi xảy ra trong quá trình gia hạn dịch vụ!')
      }
    }
  )

  const handleBankTransferMutation = useMutation(
    (params: { orderId: string; amount: number }) => handleBankTransaction(params),
    {
      onSuccess: (response) => {
        setBankImage(response.object.data.qrDataURL)
        successNotification('Vui lòng quét mã QR để thanh toán!')
        queryClient.invalidateQueries('get-contract-admin')
      },
      onError: () => {
        errorNotification('Gia hạn dịch vụ không thành công')
      }
    }
  )

  const onSubmit: SubmitHandler<FormData> = async () => {
    if (selectedCustomer?.id && selectedPlan?.id) {
      extendServiceMutation.mutate({
        companyId: selectedCustomer?.id,
        pricePlanId: selectedPlan?.id,
        payed: false
      })
    } else {
      errorNotification('Vui lòng chọn gói dịch vụ!')
    }
  }

  const handleBankTransfer = () => {
    closeModal()
    setBankModal(true)
    if (extendData?.id) {
      handleBankTransferMutation.mutate({
        orderId: extendData?.id,
        amount: extendData?.amout
      })
    }
  }

  const handleSelectChange = (event: any) => {
    const selectedId = event.target.value
    const plan = data.find((d: any) => d.id === selectedId)
    setSelectedPlan(plan)
  }

  const handleCash = () => {
    successNotification('Đi trả tiền đi bạn ơi!')
    closeModal()
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    errorNotification('Có lỗi xảy ra trong quá trình gia hạn dịch vụ!')
    return <h1>Có lỗi xảy ra trong quá trình gia hạn dịch vụ!</h1>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isConfirm ? (
        <>
          <div>Hãy lựa chọn gói dịch vụ sẽ được kích hoạt với công ty {selectedCustomer?.companyName}.</div>
          <select
            {...register('pricePlan', {
              required: 'Gói được để trống'
            })}
            onChange={handleSelectChange}
            className='rounded-md mt-1'
            disabled={extendServiceMutation.isLoading}
          >
            <option>Gói dịch vụ</option>
            {data?.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.pricePlan && <p className='text-red-500'>{errors.pricePlan.message}</p>}
          {selectedPlan && (
            <div className='mt-6'>
              <h3 className='text-lg font-bold'>Thông tin gói dịch vụ</h3>
              <table className='w-full border-collapse'>
                <thead>
                  <tr>
                    <th className='border p-2'>Trường</th>
                    <th className='border p-2'>Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border p-2'>Giá</td>
                    <td className='border p-2'>{selectedPlan.price.toLocaleString()} VND</td>
                  </tr>
                  <tr>
                    <td className='border p-2'>Thời gian (năm)</td>
                    <td className='border p-2'>{selectedPlan.timeWithYears} năm</td>
                  </tr>
                  <tr>
                    <td className='border p-2'>Giảm giá</td>
                    <td className='border p-2'>{selectedPlan.discount}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className='w-full flex justify-end mt-6'>
            <button
              type='submit'
              className='middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              data-ripple-light='true'
              disabled={extendServiceMutation.isLoading}
            >
              {extendServiceMutation.isLoading ? 'Đang xử lý...' : 'Chấp nhận'}
            </button>
            <button
              type='button'
              className='middle none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              data-ripple-light='true'
              onClick={closeModal}
              disabled={extendServiceMutation.isLoading}
            >
              Hủy
            </button>
          </div>
        </>
      ) : (
        <div className='w-full flex justify-end mt-6'>
          <button
            type='button'
            className='middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-[#00ff002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
            onClick={handleCash}
          >
            Tiền mặt
          </button>
          <button
            type='button'
            className='middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-[#0000ff2f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
            onClick={handleBankTransfer}
          >
            Chuyển khoản
          </button>
          <button
            type='button'
            className='middle none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
            onClick={() => setIsConfirm(false)}
          >
            Hủy
          </button>
        </div>
      )}
    </form>
  )
}

export default Expried
