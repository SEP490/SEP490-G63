import { SubmitHandler, useForm } from 'react-hook-form'
import avatar from '../../assets/images/avatar1.png'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getUserDetail, updateProfile } from '~/services/user.service'
import { useAuth } from '~/provider/authProvider'
import useToast from '~/hooks/useToast'
import Loading from '~/components/shared/Loading/Loading'
export interface UserData {
  id: string
  address: string
  avatar: string
  department: string
  dob: string
  email: string
  gender: number
  identification_number: string
  name: string
  phone: string
  position: string
}
const ContractInformation = () => {
  const reader = new FileReader()
  const [data, setData] = useState<any>()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [imgUpload, setImgUpload] = useState<any>(avatar)
  const inputRef = useRef<any>()
  const { successNotification, errorNotification } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<UserData>({
    defaultValues: useMemo(() => {
      return data
    }, [data])
  })
  const handleChangeImage = (event: any) => {
    const files = event.target.files

    reader.readAsDataURL(files[0])
    reader.addEventListener('load', (event) => {
      setImgUpload(event.target?.result)
    })
  }
  useEffect(() => {
    async function fetchAPI() {
      try {
        if (user?.id) {
          const response = await getUserDetail(user?.id)
          if (response.object) {
            setData(response.object)

            reset(response.object)
            setImgUpload(response.object?.avatar == null ? avatar : response.object?.avatar)
            setLoading(false)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchAPI()
  }, [])
  if (loading) return <Loading />
  const onSubmit: SubmitHandler<UserData> = async (data: any) => {
    try {
      const formData = new FormData()
      for (const key in data) {
        formData.append(key, data[key])
      }
      formData.append('file', inputRef.current.files[0])

      if (user?.id) {
        const response = await updateProfile(user?.id, formData)
        if (response.code == '00' && response.object) {
          console.log(response)

          successNotification('Chỉnh sửa thông tin người dùng thành công')
        } else {
          errorNotification('Chỉnh sửa thông tin người dùng không thành công')
        }
      }
    } catch (e) {
      errorNotification('Chỉnh sửa thông tin người dùng không thành cồng')
      console.log(e)
    }
  }

  return (
    <div className='w-full md:w-[80%]  flex flex-col items-center mx-3 py-4 px-3 justify-center bg-white rounded-md shadow-md'>
      Thông tin hợp đồng
    </div>
  )
}
export default ContractInformation
