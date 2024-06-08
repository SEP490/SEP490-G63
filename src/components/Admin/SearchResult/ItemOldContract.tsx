import { formatDate } from '~/utils/formatDate'

const ItemOldContract = ({ data }: any) => {
  return (
    <div className='flex gap-2' key={data.id}>
      <div>
        <iframe scrolling='no' src={data.file} />
      </div>
      <div>
        <div className='text-blue-700 hover:underline text-[20px] cursor-pointer'>{data.contractName}</div>
        <div className='text-gray-500'></div>
        Ngày bắt đầu: {formatDate(data.contractStartDate)}
        Ngày kết thúc: {formatDate(data.contractEndDate)}
        Ngày ký: {formatDate(data.contractSignDate)}
        Người tạo: {formatDate(data.createdBy)}
        <div id='rule'></div>
      </div>
    </div>
  )
}
export default ItemOldContract
