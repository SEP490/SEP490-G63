import { formatDate } from '~/utils/formatDate'

const ItemOldContract = ({ data }: any) => {
  return (
    <div className='flex gap-2 w-full' key={data.id}>
      <div>
        <iframe scrolling='no' src={data.file} />
      </div>
      <div>
        <div className='text-blue-700 hover:underline text-[20px] cursor-pointer'>{data.contractName}</div>
        <div className='text-gray-500 flex flex-col tex-[14px]'>
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
