import { useState } from 'react'
import InformationUser from '~/components/Profile/InformationUser'

const Profile = () => {
  const [tab, setTab] = useState(1)
  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <p className='font-bold text-[28px] my-4 mx-4'>Tác vụ cá nhân</p>
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-[20%]'>
          <ul className='flex flex-row md:flex-col gap-3'>
            <li onClick={() => setTab(1)}>Thông tin tài khoản</li>
            <li onClick={() => setTab(2)}>Thông tin hợp đồng</li>
          </ul>
        </div>
        {tab == 1 ? <InformationUser /> : <>Thông tin hợp đồng</>}
      </div>
    </div>
  )
}
export default Profile
