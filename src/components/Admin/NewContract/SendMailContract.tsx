import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ComboboxMail from '~/components/Admin/SendMail/ComboboxMail'
import uploadIcon from '~/assets/images/uploadpdf.png'
import { getNewContractById, sendMail } from '~/services/contract.service'
import useToast from '~/hooks/useToast'
import Loading from '~/components/shared/Loading/Loading'
import { useParams } from 'react-router-dom'

const SendMailContract = () => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [selectedTo, setSelectedTo] = useState<any[]>([])
  const [selectedCc, setSelectedCc] = useState<any[]>([])
  const [subject, setSubject] = useState<string>('')
  const [editorData, setEditorData] = useState<string>('')
  const { successNotification, errorNotification } = useToast()
  const [loading, setLoading] = useState<boolean>(true)
  const { id, type } = useParams()
  const handleFileChange = (event: any) => {
    const files = Array.from(event.target.files)
    const newPreviewUrls: string[] = []

    files.forEach((file: any) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result as string)
        if (newPreviewUrls.length === files.length) {
          setPreviewUrls(newPreviewUrls)
        }
      }
      reader.readAsDataURL(file)
    })

    setSelectedFiles(files)
  }

  const handleSubmit = async () => {
    setLoading(true)
    if (selectedTo.length === 0) {
      errorNotification('Trường "Đến" không được để trống!')
      setLoading(false)
      return
    }

    if (subject.trim() === '') {
      errorNotification('Trường "Tiêu đề" không được để trống!')
      setLoading(false)
      return
    }

    if (editorData.trim() === '') {
      errorNotification('Trường "Nội dung" không được để trống!')
      setLoading(false)
      return
    }

    const formData = new FormData()
    selectedTo.forEach((email) => {
      formData.append('to', email.value)
    })
    selectedCc.forEach((email) => {
      formData.append('cc', email.value)
    })
    formData.append('subject', subject)
    formData.append('htmlContent', editorData)
    selectedFiles.forEach((file) => {
      formData.append('attachments', file)
    })

    try {
      const response = await sendMail(formData)
      if (response) {
        successNotification('Gửi mail thành công!')
      } else {
        errorNotification('Xảy ra lỗi khi gửi mail!')
      }
    } catch (error) {
      console.error('Error sending mail:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (id) {
          const response = await getNewContractById(id)
          if (response.code == '00' && response.object) {
            if (type == '1') {
              setSelectedTo([{ label: response.object.partyA.email, value: response.object.partyA.email }])
            } else if (type == '2') {
              setSelectedTo([{ label: response.object.partyB.email, value: response.object.partyB.email }])
            }
          } else errorNotification('Không tìm thấy thông tin')
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchApi()
  }, [id, type])
  if (loading) return <Loading />
  return (
    <div className='h-full'>
      <div className='place-content-center bg-white m-8 rounded p-6 shadow-xl shadow-neutral-400 w-2/3 mx-auto'>
        <div className='font-bold rounded text-3xl mb-8'>
          <span>Thư mới</span>
        </div>
        <div className='py-2 border-b-2 border-slate-200 flex items-center'>
          <span className='w-20 font-bold'>Đến</span>
          <ComboboxMail selected={selectedTo} setSelected={setSelectedTo} />
        </div>
        <div className='py-2 border-b-2 border-slate-200 flex items-center'>
          <span className='w-20 font-bold'>CC</span>
          <ComboboxMail selected={selectedCc} setSelected={setSelectedCc} />
        </div>
        <div className='py-2 border-b-2 border-slate-200 flex items-center'>
          <span className='w-20 font-bold'>Tiêu đề</span>
          <input
            type='text'
            className=' w-full rounded h-8'
            placeholder=''
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <h2 className='mt-8 font-bold mb-4'>Nội dung</h2>
        <CKEditor
          editor={ClassicEditor}
          data='<p>Nội dung của bạn ở đây...</p>'
          onReady={(editor) => {
            console.log('Editor is ready to use!', editor)
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            setEditorData(data)
          }}
        />
        <div className='mt-4 text-center'>
          <input type='file' id='file-upload' className='hidden' onChange={handleFileChange} multiple />
          <label htmlFor='file-upload' className='cursor-pointer inline-flex items-center justify-center rounded-full'>
            <img src={uploadIcon} alt='Upload' className='w-30 h-20' />
          </label>
        </div>
        {previewUrls.length > 0 && (
          <div className='mt-4 text-center'>
            {previewUrls.map((url, index) => (
              <img key={index} src={url} alt={`Preview ${index}`} className='max-w-full max-h-85 mx-auto mb-4' />
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className='py-2 px-6 mb-4 rounded bg-sky-800 text-white mt-4 text-center flex justify-center mx-auto hover:bg-sky-500 active:bg-sky-800 focus:outline-none focus:ring focus:ring-sky-300'
      >
        Gửi
      </button>
    </div>
  )
}

export default SendMailContract
