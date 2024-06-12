import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import useToast from '~/hooks/useToast'
// import { DataPrice } from '~/pages/Admin/Price'

// import { DataCustomer } from '~/pages/Admin/User'
import { extendService } from '~/services/admin.contract.service'
import { getPrice } from '~/services/admin.contract.service'

interface Iprops {
  closeModal: () => void
  selectedCustomer: any
}
type FormData = {
  pricePlan: string
}
const Expried = ({ closeModal, selectedCustomer }: Iprops) => {
  const { errorNotification, successNotification } = useToast()
  // const [data, setData] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<any>()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      if (selectedCustomer?.id) {
        console.log('plan: ', selectedPlan)

        const response = await extendService({
          companyId: selectedCustomer?.id,
          pricePlanId: selectedPlan?.id,
          payed: true
        })
        console.log('response', response)

        if (response) {
          successNotification('Gia hạn dịch vụ thành công')
          closeModal()
        } else errorNotification('Gia hạn dịch vụ không thành công')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     const data = await getPrice()
  //     if (data) {
  //       setData(data)
  //     }
  //   }
  //   fetchAPI()
  // }, [])
  const { data, isError, isLoading } = useQuery('get-price', () => getPrice(), {})

  const handleSelectChange = (event: any) => {
    const selectedId = event.target.value
    const plan = data.find((d: any) => d.id === selectedId)
    setSelectedPlan(plan)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Hãy lựa chọn gói dịch vụ sẽ được kích hoạt với công ty {selectedCustomer?.companyName}.</div>
      <select
        {...register('pricePlan', {
          required: 'Gói được để trống'
        })}
        onChange={handleSelectChange}
        className='rounded-md mt-1'
      >
        {data?.map((d: any) => <option value={d.id}>{d.name}</option>)}
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
          className='middle  none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#ff00002f] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Chấp nhận
        </button>
        <button
          type='button'
          className='middle  none center mr-4 rounded-lg bg-[#49484d] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#49484d]  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
          onClick={closeModal}
        >
          Hủy
        </button>
      </div>
    </form>
  )
}
export default Expried
