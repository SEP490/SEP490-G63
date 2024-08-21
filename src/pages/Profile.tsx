import { useState } from 'react'
import InformationUser from '~/components/Profile/InformationUser'
import { UserIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'
import ContractInformation from '~/components/Profile/ContractInformation'
import { useAuth } from '~/context/authProvider'

const Profile = () => {
  const [tab, setTab] = useState(1)
  const { user } = useAuth()
  console.log(user)

  return (
    <div className='bg-[#e8eaed] h-full overflow-auto'>
      <div className='flex flex-col md:flex-row mt-3 justify-center md:justify-between'>
        <div className='w-full md:w-[20%] bg-white md:h-[80vh] rounded-md shadow-md mx-3 mb-2'>
          <ul className='flex flex-row md:flex-col gap-3 m-3'>
            <li
              onClick={() => setTab(1)}
              className={`flex gap-4 justify-start items-center px-3 py-1 cursor-pointer ${tab == 1 ? 'bg-main-color text-white' : 'text-black'} hover:bg-main-color hover:text-white rounded-3xl`}
            >
              <UserIcon className='h-5 w-5' /> Thông tin cá nhân
            </li>
            {user?.role === 'ADMIN' && (
              <li
                onClick={() => setTab(2)}
                className={`flex gap-4 justify-start px-3 py-1 cursor-pointer ${tab == 2 ? 'bg-main-color text-white' : 'text-black'} hover:bg-main-color hover:text-white rounded-3xl`}
              >
                <DocumentCheckIcon className='h-5 w-5' />
                Thông tin hợp đồng
              </li>
            )}
          </ul>
        </div>
        {tab === 1 ? <InformationUser /> : <ContractInformation />}
      </div>
    </div>
  )
}

export default Profile
