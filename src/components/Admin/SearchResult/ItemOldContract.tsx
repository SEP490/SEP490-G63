import { useNavigate } from 'react-router-dom'
import { formatDate } from '~/common/utils/formatDate'

const ItemOldContract = ({ data }: any) => {
  const navigate = useNavigate()
  return (
    <div className='flex gap-2 w-full border-b-2 border-slate-300' key={data.id}>
      <div className='border shadow-md'>
        <iframe scrolling='no' src={data.file} />
      </div>
      <div>
        <div
          className='text-blue-700 hover:underline text-[20px] cursor-pointer'
          onClick={() => navigate('/old-contract')}
        >
          {data.contractName}
        </div>
        <div className='text-black flex flex-col tex-[14px]'>
          <div>Ngày bắt đầu: {formatDate(data.contractStartDate)}</div>
          <div>Ngày kết thúc: {formatDate(data.contractEndDate)}</div>
          <div>Ngày ký: {formatDate(data.contractSignDate)}</div>
          <div>Người tạo: {data.createdBy}</div>
        </div>

        <div id='rule'></div>
      </div>
    </div>
  )
}
export default ItemOldContract
