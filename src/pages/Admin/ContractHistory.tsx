import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import useToast from '~/hooks/useToast'
import { getContractHistory } from '~/services/contract.service'
import Loading from '~/components/shared/Loading/Loading'
import LoadingIcon from '~/assets/LoadingIcon'
import moment from 'moment'
import { useAuth } from '~/context/authProvider'
import { ADMIN } from '~/common/const/role'
import { permissionObject } from '~/common/const/permissions'
import { statusObjectHistory } from '~/common/const/status'

export default function ContractHistory({ selectedContract }: any) {
  const { errorNotification } = useToast()
  const [history, setHistory] = useState<any>([])
  const { user } = useAuth()
  const formatTime = (timeString: string) => {
    const [date, time] = timeString.split(' ')
    const formattedTime = time.split('.')[0]
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year} ( ${formattedTime} )`
  }
  const permissionUser: STATUS = useMemo(() => {
    if (user?.role == ADMIN || user?.permissions.includes(permissionObject.MANAGER)) return ADMIN
    else if (user?.permissions.includes(permissionObject.OFFICE_ADMIN)) return 'OFFICE_ADMIN'
    else if (user?.permissions.includes(permissionObject.SALE)) return 'SALE'
    else return 'OFFICE_STAFF'
  }, [user])
  const { isLoading, error, data } = useQuery(
    'contract-history',
    () => getContractHistory(selectedContract as string),
    {
      // onSuccess: (response) => {
      //   if (response.code === '00' && response.object) {
      //     setHistory(response.object)
      //   } else {
      //     errorNotification('Lịch sử trống')
      //   }
      // },
      onError: (e) => {
        console.log(e)
        errorNotification('Lỗi khi lấy dữ liệu lịch sử hợp đồng')
      }
    }
  )

  if (isLoading)
    return (
      <div className='flex justify-center items-centers'>
        <LoadingIcon className='w-10 h-10' />
      </div>
    )
  if (error) return <div>Lỗi hiển thị lịch sử</div>
  console.log(data)

  return (
    <div className='shadow-md sm:rounded-lg my-3'>
      {/* <h1 className='text-2xl font-semibold mb-4'>Lịch sử hợp đồng</h1> */}
      <div className='overflow-y-auto rounded-xl'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr className='bg-gray-100'>
              <th className='px-4 py-3 border w-[30px]' align='center'>
                STT
              </th>
              {/* <th className='px-4 py-3 border'>Tên hợp đồng</th> */}
              <th className='px-4 py-3 border'>Người tạo</th>
              {/* <th className='px-4 py-3 border'>Thời gian</th> */}
              <th className='px-4 py-3 border'>Trạng thái</th>
              <th className='px-4 py-3 border'>Thời gian</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {data?.object?.map((item: any, index: any) => (
              <tr
                key={index}
                className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              >
                <td className='px-4 py-3 border w-[30px]' align='center'>
                  {index + 1}
                </td>
                {/* <td className='px-4 py-3 border'>{item.contractName}</td> */}
                <td className='px-4 py-3 border'>{item.createdBy}</td>
                {/* <td className='px-4 py-3 border'>{formatTime(item.time)}</td> */}
                <td className={`px-4 py-3 border ${statusObjectHistory[item.status]?.color}`}>
                  {statusObjectHistory[item.status]?.title}
                </td>
                <td className='px-4 py-3 border'>{item.time ? moment(item.time).format('DD-MM-YYYY HH:mm:ss') : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
