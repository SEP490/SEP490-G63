import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import useToast from '~/hooks/useToast'
import { getContractHistory } from '~/services/contract.service'
import Loading from '~/components/shared/Loading/Loading'

export default function ContractHistory({ selectedContract }: any) {
  const { errorNotification } = useToast()
  const [history, setHistory] = useState<any>([])

  const formatTime = (timeString: string) => {
    const [date, time] = timeString.split(' ')
    const formattedTime = time.split('.')[0]
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year} ( ${formattedTime} )`
  }

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

  if (isLoading) return <Loading />
  if (error) return <div>Lỗi hiển thị lịch sử</div>

  return (
    <div className='shadow-md sm:rounded-lg my-3'>
      {/* <h1 className='text-2xl font-semibold mb-4'>Lịch sử hợp đồng</h1> */}
      <div className='overflow-y-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr className='bg-gray-100'>
              <th className='px-4 py-3 border'>STT</th>
              {/* <th className='px-4 py-3 border'>Tên hợp đồng</th> */}
              <th className='px-4 py-3 border'>Người tạo</th>
              {/* <th className='px-4 py-3 border'>Thời gian</th> */}
              <th className='px-4 py-3 border'>Trạng thái</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {data?.object?.map((item: any, index: any) => (
              <tr
                key={index}
                className='w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
              >
                <td className='px-4 py-3 border'>{index + 1}</td>
                {/* <td className='px-4 py-3 border'>{item.contractName}</td> */}
                <td className='px-4 py-3 border'>{item.createdBy}</td>
                {/* <td className='px-4 py-3 border'>{formatTime(item.time)}</td> */}
                <td className='px-4 py-3 border'>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
