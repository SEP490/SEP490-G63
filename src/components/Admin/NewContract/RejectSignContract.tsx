import React from 'react'
import { Stage, Layer, Line } from 'react-konva'
import { ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Description, Field, Label, Textarea } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { sendMail } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
import { useMutation } from 'react-query'
import LoadingIcon from '~/assets/LoadingIcon'
type FormData = {
  comment: string
}
const RejectSignContract = ({ contract }: any) => {
  const { errorNotification, successNotification } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const sendMailReject = useMutation(sendMail, {
    onError: () => {
      errorNotification('Gửi yêu cầu thất bại')
    },
    onSuccess: () => {
      successNotification('Từ chối thành công!')
    }
  })
  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('to', contract?.createdBy)
    formData.append('cc', contract?.approvedBy)
    formData.append('subject', 'Hợp đồng cần được xem xét lại')
    const htmlContent = `Hợp đồng <b>${contract?.name}</b> cần được chỉnh sửa lại thông tin theo yêu cầu của đại diện: <b>${contract?.partyB?.presenter}</b> thuộc công ty <b>${contract?.partyB?.name}</b> như sau: <br/> <i>"${data.comment}"</i>`
    formData.append('htmlContent', htmlContent)
    formData.append('contractId ', contract?.id as string)
    formData.append('status', 'SIGN_B_FAIL')
    formData.append('description', data.comment)

    sendMailReject.mutate(formData)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full mt-5'>
        <Field>
          <Label className='text-sm/6 font-medium text-black'>
            Lí do<sup className='text-red-700'>*</sup>
          </Label>
          <Textarea
            {...register('comment', {
              required: 'Lí do đưa ra không được để trống'
            })}
            disabled={sendMailReject.isLoading}
            placeholder='Đưa ra một số lí do khiến bạn không hài lòng với bản hợp đồng'
            className={` mt-3 block w-full resize-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
            rows={5}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.comment ? 'visible' : 'invisible'}`}>
            {errors.comment?.message}
          </div>
        </Field>
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
