const ItemNewContract = ({ data }: any) => {
  return (
    <div className='flex gap-2' key={data.id}>
      <div>
        <iframe scrolling='no' src={data.file} />
      </div>
      <div>
        <div className='text-blue-700 hover:underline text-[20px] cursor-pointer'>
          {data.name} | {data.number}
        </div>
        <div className='text-gray-500'>
          <div>
            Bên A: {data.partyA?.name}; Đại diện bởi {data.partyA?.position}:{data.partyA?.presenter}; Địa chỉ:{' '}
            {data.partyA?.address}
          </div>
          <div>
            Bên B: {data.partyB?.name}; Đại diện bởi {data.partyB?.position}:{data.partyB?.presenter}; Địa chỉ:{' '}
            {data.partyB?.address}
          </div>
        </div>

        <div id='rule'></div>
      </div>
    </div>
  )
}
export default ItemNewContract
