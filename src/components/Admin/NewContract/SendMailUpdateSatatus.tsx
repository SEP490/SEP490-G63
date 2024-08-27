import { Fragment, useMemo, useRef, useState } from 'react'
import ComboboxMail from '~/components/Admin/SendMail/ComboboxMail'
import uploadIcon from '~/assets/images/uploadpdf.png'
import { getNewContractById, sendMail } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
import { BASE_URL_FE } from '~/common/const'
import LoadingPage from '~/components/shared/LoadingPage/LoadingPage'
import SunEditor from 'suneditor-react'
import { statusRequest } from '~/common/const/status'
import { useQuery } from 'react-query'
import { getUserByPermission } from '~/services/user.service'
import { Dialog, Transition } from '@headlessui/react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getParty } from '~/services/party.service'
import pdfIcon from '../../../assets/images/pdf-icon.jpg'
import { getListReason } from '~/services/reason.service'
type IProps = { id: string | undefined; status: number; closeModal: any; refetch: any; dataC: any; refetchNumber: any }
const SendMailUpdateStatus = ({ id, status, closeModal, refetch, dataC, refetchNumber }: IProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [selectedTo, setSelectedTo] = useState<any[]>([])
  const [selectedCc, setSelectedCc] = useState<any[]>([])
  const [subject, setSubject] = useState<string>(statusRequest[status]?.title)
  const [editorData, setEditorData] = useState<any>('')
  const { successNotification, errorNotification } = useToast()
  const [open, setOpen] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const contractFile = useRef<any>()
  const [files, setFiles] = useState<any>([])
  const [selectedURL, setSelectedURL] = useState('')
  const { isLoading: loadingSALE, data: dataSale } = useQuery('getUserByRoleSale', () => getUserByPermission('SALE'))
  const { isLoading: loadingAdmin, data: dataAdmin } = useQuery('getUserByRoleAdmin', () =>
    getUserByPermission('MANAGER')
  )
  const reason = useRef(null)
  const { isLoading: loadingAO, data: dataAO } = useQuery('getUserByRoleAdminOfficer', () =>
    getUserByPermission('OFFICE_ADMIN')
  )
  const { data: dataParty } = useQuery('party-data', getParty)
  const { data: dataReason } = useQuery('reason-data', () => getListReason(0, 50))
  const { isLoading: loading, data: dataContract } = useQuery('getContractDetail', () => getNewContractById(id), {
    onSuccess: async (response) => {
      if (status == 1) {
        dataC?.rejectedBy != null &&
          setSelectedTo([{ label: dataC?.rejectedBy + '(ADMIN OFFICER)', value: dataC?.rejectedBy }])
      } else if (status == 2 || status == 3) {
        response.object.createdBy != null &&
          setSelectedTo([{ label: response.object.createdBy + '(SALE)', value: response.object.createdBy }])
      } else if (status == 4) {
        setSelectedTo([{ label: dataParty.object.email + '(ADMIN)', value: dataParty.object.email }])
        response.object.createdBy != null &&
          setSelectedCc([{ label: response.object.createdBy + '(SALE)', value: response.object.createdBy }])
      } else if (status == 6) {
        response.object.createdBy != null &&
          setSelectedTo([{ label: response.object.createdBy + '(SALE)', value: response.object.createdBy }])
        response.object.approvedBy != null &&
          setSelectedCc([{ label: response.object.approvedBy + '(ADMIN OFFICER)', value: response.object.approvedBy }])
      } else if (status == 7) {
        const mailCC = []
        response.object.approvedBy != null &&
          mailCC.push({ label: response.object.approvedBy + '(ADMIN OFFICER)', value: response.object.approvedBy })
        setSelectedCc(mailCC)
        response.object.partyB != null &&
          setSelectedTo([{ label: response.object.partyB.email + '(Khách hàng)', value: response.object.partyB.email }])
      }
      const fileUrl = response.object.file
      const fileData = await fetch(fileUrl)
      const blob = await fileData.blob()
      contractFile.current = blob
    }
  })
  const optionTo = useMemo(() => {
    if (status == 1) return dataAO
    else if (status == 2 || status == 3 || status == 5 || status == 6) return dataSale
    else if (status == 4) return dataAdmin
    else return []
  }, [status, dataAO, dataAdmin, dataSale])

  const optionCC = useMemo(() => {
    if (status == 1 || status == 5 || status == 6) return dataAO
    else if (status == 2 || status == 3) return dataSale
    else if (status == 4) return dataAdmin
    else return []
  }, [status, dataAO, dataAdmin, dataSale])

  const handleFileChange = (event: any) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map((file: any) => {
      const url = URL.createObjectURL(file)
      return {
        url,
        file
      }
    })
    setFiles(newFiles)
  }

  const handleSubmit = async () => {
    if (selectedTo.length === 0) {
      errorNotification('Trường "Đến" không được để trống!')
      return
    }
    if (subject.trim() === '') {
      errorNotification('Trường "Tiêu đề" không được để trống!')
      return
    }
    setLoadingSubmit(true)
    const formData = new FormData()
    selectedTo.forEach((email) => {
      formData.append('to', email.value)
    })
    selectedCc.forEach((email) => {
      formData.append('cc', email.value)
    })
    formData.append('subject', subject)
    const htmlContent = statusRequest[status]?.description({
      name: status == 4 ? `Sếp` : status == 7 ? `Quý khách hàng` : selectedTo?.[0]?.value || '',
      html: editorData || '',
      src:
        status == 4
          ? `${BASE_URL_FE}view/${id}/sign/1`
          : status == 7
            ? `${BASE_URL_FE}view/${id}/sign/2`
            : `${BASE_URL_FE}contract/detail/${id}`
    })
    formData.append('htmlContent', htmlContent)
    formData.append('contractId', id as string)
    formData.append('reasonId', status == 3 || status == 6 || status == 9 ? reason.current?.value : '')
    formData.append('attachments', contractFile.current, `${dataContract?.object?.name}.pdf`)
    files.forEach((file: any) => {
      formData.append('attachments', file.file)
    })
    if (status) formData.append('status', statusRequest[status]?.status)
    formData.append('description', editorData)
    try {
      const response = await sendMail(formData)
      if (response) {
        successNotification('Gửi yêu cầu thành công!')
        closeModal()
        refetch()
        refetchNumber()
      } else {
        errorNotification('Gửi yêu cầu thất bại')
      }
    } catch (error) {
      errorNotification('Gửi yêu cầu thất bại')
    } finally {
      setLoadingSubmit(false)
    }
  }
  if (loading || loadingSALE || loadingAO || loadingAdmin || loadingSubmit) return <LoadingPage />
  return (
    <div className='h-full overflow-auto pb-5'>
      <div className='w-full flex flex-col justify-between border-b-2'>
        <div className='w-full md:w-full py-2 flex items-center z-50'>
          <span className='w-40  font-bold'>Đến</span>
          <ComboboxMail selected={selectedTo} setSelected={setSelectedTo} option={optionTo} isCreate={status == 7} />
        </div>
        <div className='w-full md:w-full py-2  flex items-center z-40'>
          <span className='w-40  font-bold'>CC</span>
          <ComboboxMail selected={selectedCc} setSelected={setSelectedCc} option={optionCC} isCreate={status == 7} />
        </div>
      </div>

      <div className='py-2 border-b-2 border-slate-200 flex items-center z-10'>
        <span className='w-40 font-bold'>Tiêu đề</span>
        <input
          type='text'
          className=' w-full rounded'
          placeholder=''
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      {(status == 3 || status == 6 || status == 9) && (
        <div className='py-2 border-b-2 border-slate-200 flex items-center z-10'>
          <span className='w-40 font-bold'>Nguyên nhân</span>
          <select className=' w-full rounded' ref={reason}>
            {dataReason?.content.map((data: any) => <option value={data.id}>{data.title}</option>)}
          </select>
        </div>
      )}

      <h2 className=' font-bold my-2'>Nội dung</h2>
      <SunEditor
        name='term'
        placeholder='Nội dung'
        height='40vh'
        setContents={editorData}
        onChange={(data) => setEditorData(data)}
        setOptions={{
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview', 'print']
          ],
          imageUploadUrl: '/upload/image',
          imageUploadSizeLimit: 5 * 1024 * 1024
        }}
      />

      <h2 className=' font-bold my-2'>Tệp đính kèm</h2>
      <div className='w-full flex justify-start gap-3'>
        <div
          className='border-2 flex flex-col w-[120px] justify-center items-center rounded-md cursor-pointer'
          onClick={() => {
            setOpen(true)
            setSelectedURL(dataContract?.object?.file)
          }}
        >
          <div className=' object-contain'>
            <img src={pdfIcon} className='w-full h-full' />
          </div>
          <div
            className='text-red-500 w-[100px] mb-5 hover:underline truncate ...'
            title={`${dataContract?.object?.name}.pdf`}
          >
            {dataContract?.object?.name}.pdf
          </div>
        </div>
        {files?.map((file: any) => (
          <div
            key={file.url}
            className='border-2 flex flex-col w-[120px] justify-center items-center rounded-md cursor-pointer'
            onClick={() => {
              setOpen(true)
              setSelectedURL(file.url)
            }}
          >
            <div className=' object-contain'>
              <img src={pdfIcon} className='w-full h-full' />
            </div>
            <div className='text-red-500 w-[100px] mb-5 hover:underline truncate ...' title={`${file?.file?.name}.pdf`}>
              {file?.file?.name}.pdf
            </div>
          </div>
        ))}
        <div className='text-center flex items-center justify-center'>
          <input type='file' id='file-upload' className='hidden' onChange={handleFileChange} multiple accept='.pdf' />
          <label
            htmlFor='file-upload'
            className='cursor-pointer inline-flex items-center justify-center rounded-full border'
          >
            <PlusIcon className='w-[60px] h-[60px]' />
          </label>
        </div>
      </div>

      {previewUrls.length > 0 && (
        <div className='mt-4 text-center'>
          {previewUrls.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} className='max-w-full max-h-85 mx-auto mb-4' />
          ))}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className='py-2 px-6 mb-4 rounded bg-sky-800 text-white mt-4 text-center flex justify-center mx-auto hover:bg-sky-500 active:bg-sky-800 focus:outline-none focus:ring focus:ring-sky-300'
      >
        Gửi
      </button>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50 w-[90vw]'
          onClose={() => {
            setOpen(false)
            setSelectedURL('')
          }}
        >
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
                <Dialog.Panel className='w-[90vw] md:w-[90vw] h-[96vh] transform overflow-hidden rounded-md bg-white p-5 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between'>
                    <div></div>
                    <XMarkIcon
                      className='h-5 w-5 mr-3 mb-3 cursor-pointer'
                      onClick={() => {
                        setOpen(false)
                        setSelectedURL('')
                      }}
                    />
                  </div>
                  <iframe src={selectedURL} width='100%' height='100%' />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default SendMailUpdateStatus
