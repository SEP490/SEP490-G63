import { useForm } from 'react-hook-form'
import useToast from '~/hooks/useToast'
import { useMutation, useQuery } from 'react-query'
import LoadingIcon from '~/assets/LoadingIcon'
import { sendMailPublicApp } from '~/services/contract.appendices.service'
import { getListReason } from '~/services/reason.service'
type FormData = {
  reasonId: string
}
const RejectSignContract = ({ contract, comment, createdBy, refetch }: any) => {
  const { errorNotification, successNotification } = useToast()
  const { data: dataReason } = useQuery('reason-data', () => getListReason(0, 50))
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const sendMailReject = useMutation(sendMailPublicApp, {
    onError: () => {
      errorNotification('Gửi yêu cầu thất bại')
    },
    onSuccess: () => {
      successNotification('Từ chối thành công!')
      refetch()
    }
  })
  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('to', contract?.createdBy)
    contract?.approvedBy != null && formData.append('cc', contract?.approvedBy)
    formData.append('subject', 'Hợp đồng cần được xem xét lại')
    const htmlContent = `Hợp đồng <b>${contract?.name}</b> cần được chỉnh sửa lại thông tin theo yêu cầu của đại diện: <b>${contract?.partyB?.presenter}</b> thuộc công ty <b>${contract?.partyB?.name}</b> như sau: <br/> <i>"${data.comment}"</i>`
    formData.append('htmlContent', htmlContent)
    formData.append('contractAppendicesId', contract?.id as string)
    formData.append('status', 'SIGN_B_FAIL')
    formData.append('description', comment)
    formData.append('reasonId', data.reasonId)
    formData.append('createdBy', createdBy as string)

    sendMailReject.mutate(formData)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full mt-5 relative'>
        <div className='py-2 border-b-2 border-slate-200 flex items-center z-10'>
          <span className='w-40 font-bold'>Nguyên nhân</span>
          <select
            className=' w-full rounded'
            {...register('reasonId', { required: 'Nguyên nhân không được để trống' })}
          >
            {dataReason?.content.map((data: any) => <option value={data.id}>{data.title}</option>)}
          </select>
        </div>
        <div className={`text-red-500 absolute text-[12px]  ${errors.reasonId ? 'visible' : 'invisible'}`}>
          {errors.reasonId?.message}
        </div>
      </div>

      <div className='w-full flex justify-end'>
        <button
          type='submit'
          disabled={sendMailReject.isLoading}
          className='middle my-3 none center mr-4 rounded-md bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          {sendMailReject.isLoading ? <LoadingIcon /> : 'Xác nhận'}
        </button>
      </div>
    </form>
  )
}
export default RejectSignContract
