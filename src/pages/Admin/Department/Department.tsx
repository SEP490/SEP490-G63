import { AxiosError } from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import useToast from '~/hooks/useToast'
import { getListDepartment } from '~/services/department.service'

const Department = () => {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [totalPage, setTotalPage] = useState(1)
  const { errorNotification, successNotification } = useToast()
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  const { data, isLoading, refetch, isFetching } = useQuery('list-department', () => getListDepartment(page, size), {
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || error.message || 'Hệ thống lỗi')
    },
    onSuccess: (result) => {
      setTotalPage(result?.object?.totalPages)
    }
  })
  console.log(data)

  return <>Department</>
}
export default Department
