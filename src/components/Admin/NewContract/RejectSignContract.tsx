import React from 'react'
import { Stage, Layer, Line } from 'react-konva'
import { ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Description, Field, Label, Textarea } from '@headlessui/react'
import { useForm } from 'react-hook-form'
type FormData = {
  comment: string
}
const RejectSignContract = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const onSubmit = async () => {}
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
          className='middle my-3 none center mr-4 rounded-md bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Xác nhận
        </button>
      </div>
    </form>
  )
}
export default RejectSignContract
