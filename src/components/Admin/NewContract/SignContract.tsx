import { AxiosError } from 'axios'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Stage, Layer, Line } from 'react-konva'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { statusRequest } from '~/common/const/status'
import Loading from '~/components/shared/Loading/Loading'
import LoadingPage from '~/components/shared/LoadingPage/LoadingPage'
import useToast from '~/hooks/useToast'
import { getSMSCode, verifySMSCode } from '~/services/auth-sign-contract.service'
import { sendMail, sendMailPublic, signContract } from '~/services/contract.service'
import { getListReason } from '~/services/reason.service'
interface IProps {
  id: string | undefined
  customer: string | undefined
  comment: string
  setModalSign: any
  refetch: any
  createdBy: string | undefined
  to: string
  cc: string
  phoneVerify: string
}
type FormTypeSMS = {
  code: number
}
const SignContract = ({ id, customer, comment, setModalSign, refetch, createdBy, to, cc, phoneVerify }: IProps) => {
  const [lines, setLines] = React.useState<any>([])
  const isDrawing = React.useRef(false)
  const [checkSms, setCheckSms] = useState(true)
  const stageRef = React.useRef<any>(null)
  const { successNotification, errorNotification } = useToast()
  const formSMS = useForm<FormTypeSMS>()
  const uri = useRef('')
  const getSMSQuery = useMutation(getSMSCode)
  const handleMouseDown = (e: any) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool: 'pen', points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    const lastLine = lines[lines.length - 1]
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }
  const signQuery = useMutation(signContract, {
    onSuccess: () => {
      setModalSign(false)
      refetch()

      successNotification('Ký hợp đồng thành công')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data.message || '')
    }
  })
  const handleExport = async () => {
    const dataRequest = {
      contractId: id as string,
      signImage: uri.current,
      comment: comment,
      createdBy: createdBy as string,
      customer: customer == '2'
    }
    signQuery.mutate(dataRequest)
    const formData = new FormData()

    formData.append('to', to)
    if (cc != null) formData.append('cc', cc)
    formData.append('subject', statusRequest[customer == '2' ? 8 : 5]?.title)
    formData.append('htmlContent', statusRequest[customer == '2' ? 8 : 5]?.description)
    formData.append('contractId', id as string)
    formData.append('status', statusRequest[customer == '2' ? 8 : 5]?.status)
    formData.append('createdBy', createdBy as string)
    formData.append('reasonId', '')
    formData.append('description', statusRequest[customer == '2' ? 8 : 5]?.description)
    try {
      const response = await sendMailPublic(formData)
    } catch (error) {
      errorNotification('Gửi yêu cầu thất bại')
    }
  }
  const onSubmitSMS = async (data: any) => {
    try {
      const response = await verifySMSCode({ phone: phoneVerify, code: data.code })
      if (response.code == '00') {
        successNotification('Xác thực người dùng thành công!')
        setCheckSms(false)
        await handleExport()
      } else errorNotification('OTP không chính xác')
    } catch (e) {
      errorNotification('OTP không chính xác')
    }
  }

  if (signQuery.isLoading) return <LoadingPage />
  return (
    <>
      {checkSms ? (
        <form onSubmit={formSMS.handleSubmit(onSubmitSMS)}>
          <div className='w-full'>
            Chúng tôi đã gửi mã xác thực về số điện thoại: {phoneVerify}. Hãy kiểm tra vè xác thực người dùng.
          </div>
          <div className='w-full mt-5 relative'>
            <label className='font-light '>
              Mã xác thực<sup className='text-red-500'>*</sup>
            </label>
            <div className='flex justify-between'>
              <input
                className={`${formSMS.formState.errors.code ? 'ring-red-600' : ''} block w-[calc(100%-130px)] rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                placeholder='Nhập mã xác thực'
                {...formSMS.register('code', {
                  required: 'Mã xác thực không hợp lệ'
                })}
              />
              <button
                type='submit'
                className='w-[120px] block bg-red-500 hover:bg-red-500 uppercase text-white font-bold rounded-md border-0 py-1.5 px-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                Xác thực
              </button>
            </div>

            <div
              className={`text-red-500 absolute text-[12px]  ${formSMS.formState.errors.code ? 'visible' : 'invisible'}`}
            >
              {formSMS.formState.errors.code?.message}
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className='shadow-lg' style={{ width: 300, border: '1px solid black', margin: 1 }}>
            <div>
              <Stage
                width={300}
                height={300}
                ref={stageRef}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
              >
                <Layer
                  style={{
                    backgroundColor: 'white'
                  }}
                >
                  {lines.map((line: any, i: number) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke='black'
                      strokeWidth={5}
                      tension={0.5}
                      lineCap='round'
                      lineJoin='round'
                      globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>
          <div className='w-full flex justify-between'>
            <button
              type='button'
              className='middle my-3 none center mr-4 rounded-md bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              data-ripple-light='true'
              onClick={() => setLines([])}
            >
              Thử lại
            </button>
            <button
              type='button'
              className='middle my-3 none center mr-4 rounded-md bg-[#0070f4] py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              data-ripple-light='true'
              onClick={() => {
                uri.current = stageRef.current.toDataURL()
                setCheckSms(true)
                // getSMSQuery.mutate(phoneVerify)
              }}
            >
              Xác nhận
            </button>
          </div>
        </>
      )}
    </>
  )
}
export default SignContract
