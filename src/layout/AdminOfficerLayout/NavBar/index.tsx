import { useState } from 'react'
import logo from '../../../assets/svg/Tdocman.svg'
import { Bars3Icon, UserIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import avatar from '../../../assets/images/avatar1.png'
import useViewport from '~/hooks/useViewport'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/provider/authProvider'
import useToast from '~/hooks/useToast'
import { routerAdmin } from '~/common/const/router'
const NavBar = () => {
  const [openNav, setOpenNav] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const { width } = useViewport()
  const isMobile = width <= 1024
  const navigate = useNavigate()
  const { removeToken, user } = useAuth()
  const { successNotification } = useToast()
  return (
    <div>
      <div className='relative visible'>
        <div
          className={`absolute z-20 h-[100vh] overflow-hidden bg-black w-full opacity-40 transition-all duration-100 delay-100 ease-in ${openNav || openProfile ? 'visible' : 'invisible'}`}
          onClick={() => {
            openNav && setOpenNav(false)
            openProfile && setOpenProfile(false)
          }}
        ></div>
        <div
          className={`absolute z-30 h-[100vh] overflow-hidden bg-white w-[200px] right-0 transition-all duration-100 delay-100 ease-in ${openProfile ? 'visible' : 'invisible'}`}
        >
          <div className='flex flex-col justify-center items-center gap-3 cursor-pointer'>
            <img
              src={user?.avatar ? user?.avatar : avatar}
              alt='avatar'
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid blue  '
              }}
              title={user?.name}
            />
            <label className='font-bold cursor-pointer flex items-center gap-1'>{user?.name}</label>
          </div>
          <button
            onClick={() => {
              navigate('/profile')
              openNav && setOpenNav(false)
              openProfile && setOpenProfile(false)
            }}
            className={`hover:bg-hover-main hover:text-white text-gray-900
           group flex w-full items-center  px-2 py-2 text-sm `}
          >
            Tài khoản
          </button>
          <button
            className={`hover:bg-hover-main hover:text-white text-gray-900
           group flex w-full items-center  px-2 py-2 text-sm `}
            onClick={() => {
              removeToken()
              successNotification('Đăng xuất thành công')
              navigate('/login')
            }}
          >
            Đăng xuất
          </button>
        </div>
        <div
          className={`absolute z-30 h-[100vh] overflow-hidden bg-white w-[220px] left-0 transition-all duration-100 delay-100 ease-in ${openNav ? 'visible' : 'invisible'}`}
        >
          <ul className={`flex flex-col gap-1 font-bold`}>
            {routerAdmin.map((r) => (
              <li
                key={r.id}
                onClick={() => {
                  openNav && setOpenNav(false)
                  openProfile && setOpenProfile(false)
                  setTimeout(() => {
                    navigate(r.slug)
                  }, 300)
                }}
                className={`${r.slug == location.pathname ? 'bg-main-color text-white' : ''} cursor-pointer  hover:bg-hover-main hover:text-white w-full px-2 py-3 flex items-center gap-2 text-[14px]`}
              >
                {r.icon} {r.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='w-full flex justify-between px-4 items-center h-[50px] shadow-md bg-white'>
        <div className='font-bold flex items-center my-2 '>
          <Bars3Icon
            className={`h-7 w-7 cursor-pointer hover:bg-gray-300 round  ed-md visible ${isMobile ? 'visible' : 'invisible'}`}
            onClick={() => setOpenNav(true)}
          />
          <img src={logo} alt='logo' className='w-[32px]' />
          <div
            className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-900 text-[24px] cursor-pointer'
            onClick={() => navigate('/')}
          >
            Docman
          </div>
        </div>

        {isMobile ? (
          <UserIcon
            className={`h-7 w-7 cursor-pointer hover:bg-gray-300 rounded-md`}
            onClick={() => setOpenProfile(true)}
          />
        ) : (
          <div className='flex items-center gap-2'>
            <div
              className='flex justify-center items-center gap-3 cursor-pointer'
              title='Trang cá nhân'
              onClick={() => navigate('/profile')}
            >
              <img
                src={user?.avatar ? user?.avatar : avatar}
                alt='avatar'
                style={{
                  width: '38px',
                  height: '38px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '2px solid blue  '
                }}
                title={user?.name}
              />
              <label className='font-bold cursor-pointer flex items-center gap-1'>{user?.name}</label>
            </div>
            <ArrowRightStartOnRectangleIcon
              className='h-5 w-5 cursor-pointer'
              title='Đăng xuất'
              onClick={() => {
                removeToken()
                successNotification('Đăng xuất thành công')
                navigate('/login')
              }}
            />{' '}
          </div>
        )}
      </div>
      {!isMobile && (
        <div className='w-full h-[50px]'>
          <ul className={`flex h-full bg-main-color gap-1 px-10 text-white font-bold`}>
            {routerAdmin.map((r) => (
              <li
                key={r.id}
                onClick={() => navigate(r.slug)}
                className={`${r.slug == location.pathname ? 'bg-hover-main' : ''} cursor-pointer rounded-md hover:bg-hover-main px-2 flex items-center gap-2 justify-center text-[12px]`}
              >
                {r.icon} {r.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default NavBar