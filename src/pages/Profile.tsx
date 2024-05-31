import { useState } from 'react'
import InformationUser from '~/components/Profile/InformationUser'
import { UserIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'
import ContractInformation from '~/components/Profile/ContractInformation'
const Profile = () => {
  const [tab, setTab] = useState(1)
  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <p className='font-bold text-[28px] my-4 mx-4'>Tác vụ cá nhân</p>
      <div className='flex flex-col md:flex-row  justify-center md:justify-between'>
        <div className='w-full md:w-[20%] bg-white min-h-[70vh] rounded-md shadow-md mx-3'>
          <ul className='flex flex-row md:flex-col gap-3 m-3'>
            <li
              onClick={() => setTab(1)}
              className={`flex gap-4 justify-start px-3 py-1 cursor-pointer ${tab == 1 ? 'bg-main-color text-white' : 'text-black'} hover:bg-main-color hover:text-white rounded-3xl`}
            >
              <UserIcon className='h-7 w-7' /> Thông tin cá nhân
            </li>
            <li
              onClick={() => setTab(2)}
              className={`flex gap-4 justify-start px-3 py-1 cursor-pointer ${tab == 2 ? 'bg-main-color text-white' : 'text-black'} hover:bg-main-color hover:text-white rounded-3xl`}
            >
              <DocumentCheckIcon className='h-7 w-7' />
              Thông tin hợp đồng
            </li>
          </ul>
        </div>
        {tab == 1 ? <InformationUser /> : <ContractInformation />}
      </div>
    </div>
  )
}
export default Profile
