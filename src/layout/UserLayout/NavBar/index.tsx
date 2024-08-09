import { Fragment, useState } from 'react'
import logo from '../../../assets/svg/Tdocman.svg'
import {
  Bars3Icon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  BellAlertIcon,
  XMarkIcon,
  InformationCircleIcon,
  KeyIcon
} from '@heroicons/react/24/outline'
import avatar from '../../../assets/images/avatar1.png'
import useViewport from '~/hooks/useViewport'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '~/context/authProvider'
import useToast from '~/hooks/useToast'
import { routerAdmin, routerAdminOfficer, routerSale } from '~/common/const/router'
import { permissionObject } from '~/common/const/permissions'
import { Menu, Popover, Transition } from '@headlessui/react'
import { NotificationData, useNotification } from '~/context/notiProvider'
import LoadingIcon from '~/assets/LoadingIcon'
import LogoNoti from '~/assets/images/logo-noti.png'
import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [activeButton, setActiveButton] = useState('all')
  const { width } = useViewport()
  const isMobile = width <= 1024
  const navigate = useNavigate()
  const { removeToken, user } = useAuth()
  const { successNotification } = useToast()
  const {
    notifications,
    totalNotRead,
    isReadNotify,
    isDeleteNotify,
    viewMoreNotify,
    setNotifications,
    setTotalNotRead,
    loading,
    page,
    totalPages
  } = useNotification()
  const navigateUser = user?.permissions.includes(permissionObject.OFFICE_ADMIN)
    ? routerAdminOfficer
    : user?.permissions.includes(permissionObject.SALE)
      ? routerSale
      : routerAdmin

  const handleReadNotify = (id: any, markRead: boolean) => {
    if (!markRead) {
      setTotalNotRead((totalNotRead: any) => totalNotRead - 1)
      setNotifications(
        notifications?.map((n) => {
          if (n.id == id) return { ...n, markRead: true }
          else return n
        })
      )
      isReadNotify(id)
    }
  }
  const handleDeleteNotify = (id: any) => {
    setNotifications((prevNotifications: any) => prevNotifications.filter((n: any) => n.id !== id))

    isDeleteNotify(id)
  }

  const formatTime = (time: string) => {
    moment.updateLocale('vi', {
      relativeTime: {
        future: 'trong %s',
        past: '%s trước',
        s: 'vài giây',
        ss: '%d giây',
        m: 'một phút',
        mm: '%d phút',
        h: 'một giờ',
        hh: '%d giờ',
        d: 'một ngày',
        dd: '%d ngày',
        M: 'một tháng',
        MM: '%d tháng',
        y: 'một năm',
        yy: '%d năm'
      }
    })

    return moment(time).fromNow()
  }
  const handleButtonClick = (type: 'all' | 'unread') => {
    setActiveButton(type)
  }

  const filteredNotifications =
    activeButton === 'all' ? notifications : notifications.filter((n: NotificationData) => !n.markRead)
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
              navigate('/')
            }}
          >
            Đăng xuất
          </button>
        </div>
        <div
          className={`absolute z-30 h-[100vh] overflow-hidden bg-white w-[220px] left-0 transition-all duration-100 delay-100 ease-in ${openNav ? 'visible' : 'invisible'}`}
        >
          <ul className={`flex flex-col gap-1 font-bold`}>
            {navigateUser.map((r) => (
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
        <div className='flex items-center gap-4 '>
          <Popover className='relative'>
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                ${open ? 'text-white' : 'text-white/90'}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                >
                  <div className='relative'>
                    <BellAlertIcon className='w-7 h-7 cursor-pointer text-blue-700' />
                    {totalNotRead != 0 && !loading && (
                      <div className='text-white cursor-default absolute top-[-4px] right-[-4px] bg-red-500 text-[8px] rounded-[50%] w-4 h-4 flex justify-center items-center font-bold'>
                        {totalNotRead}
                      </div>
                    )}
                  </div>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0 translate-y-1'
                  enterTo='opacity-100 translate-y-0'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 translate-y-1'
                >
                  <Popover.Panel
                    className={`absolute left-1/2 z-10  w-96  ${isMobile ? '-translate-x-[80%] ' : 'md:-translate-x-[100%] md:w-90'} transform px-4 sm:px-0 `}
                  >
                    <div className='overflow-hidden rounded-lg bg-white w-full shadow-lg ring-1 ring-black/5'>
                      <div className='font-bold text-[20px] pl-4 my-2'>Thông báo</div>
                      <button
                        className={`px-4 py-2 rounded-3xl ml-3 text-blue-600 font-semibold ${activeButton === 'all' ? 'bg-blue-100' : ''}`}
                        onClick={() => handleButtonClick('all')}
                      >
                        Tất cả
                      </button>
                      <button
                        className={`ml-1 px-4 py-2 rounded-3xl text-blue-600 font-semibold ${activeButton === 'unread' ? 'bg-blue-100' : ''}`}
                        onClick={() => handleButtonClick('unread')}
                      >
                        Chưa đọc
                      </button>
                      <div className='relative w-full max-h-[60vh] overflow-auto'>
                        {loading && notifications?.length == 0 ? (
                          <div className='min-h-[200px] flex items-center justify-center'>
                            <LoadingIcon className='w-6 h-6' />
                          </div>
                        ) : notifications?.length == 0 || !notifications ? (
                          <div className='min-h-[200px] flex items-center justify-center'>Không có thông báo </div>
                        ) : (
                          <div className='flex flex-col justify-center overflow-y-auto overflow-x-hidden px-1 w-full '>
                            {filteredNotifications?.map((n: NotificationData) => (
                              <div
                                key={n.id}
                                className={`bg-white m-[1px] cursor-pointer w-full flex items-center group relative hover:bg-gray-200 rounded-md`}
                              >
                                <img
                                  src={LogoNoti}
                                  alt='avatar'
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    border: '1px solid ghostwhite',
                                    marginRight: '10px',
                                    marginLeft: '5px'
                                  }}
                                  title={n.sender}
                                />
                                <div
                                  className={`flex flex-col w-[80%] pr-8 py-1 rounded-md transition-colors delay-[200] ${
                                    n.markRead ? 'opacity-60' : ''
                                  }`}
                                  onClick={() => handleReadNotify(n.id, n.markRead)}
                                >
                                  <div className='font-semibold text-[16px]'>{n.title}</div>
                                  <div className='text-[12px]'>{n.message}</div>
                                  <div
                                    className={`text-[12px] font-semibold ${
                                      n.markRead ? 'opacity-60' : 'text-blue-600'
                                    }`}
                                  >
                                    {formatTime(n.createdDate)}
                                  </div>
                                </div>
                                {!n.markRead && <div className='w-3 h-3 rounded-[50%] bg-blue-600 mr-2'></div>}
                                <div
                                  className='w-5 h-5 rounded-[50%] absolute right-8 z-50 cursor-pointer border hover:text-white hover:bg-red-800 group-hover:visible invisible'
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteNotify(n.id)
                                  }}
                                >
                                  <XMarkIcon />
                                </div>
                              </div>
                            ))}
                            {page.current + 1 != totalPages.current && (
                              <div
                                className='flex justify-center text-blue-400 hover:underline border-t-2 cursor-pointer'
                                onClick={() => {
                                  viewMoreNotify()
                                }}
                              >
                                Xem thêm
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          {isMobile ? (
            <UserIcon
              className={`h-7 w-7 cursor-pointer hover:bg-gray-300 rounded-md`}
              onClick={() => setOpenProfile(true)}
            />
          ) : (
            <Menu as='div' className='relative inline-block text-left '>
              <Menu.Button className='flex justify-center items-center gap-3 cursor-pointer'>
                <div className='flex items-center gap-2 mr-3'>
                  <div className='flex justify-center items-center gap-3 cursor-pointer' title='Trang cá nhân'>
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
                    <label className='font-bold cursor-pointer flex items-center gap-1 mr-3 max-w-[180px] truncate ...'>
                      {user?.name}
                    </label>
                  </div>
                </div>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0  z-50 mt-2 w-[180px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        title='Sửa'
                        onClick={() => navigate('/profile')}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center gap-3 rounded-md px-2 py-1 text-sm `}
                      >
                        <InformationCircleIcon className='h-5' /> Trang cá nhân
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        title='Reset'
                        onClick={() => {
                          navigate('/change-password')
                        }}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center gap-3 rounded-md px-2 py-1 text-sm `}
                      >
                        <KeyIcon className='h-5' /> Đổi mật khẩu
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        title='Xóa'
                        onClick={() => {
                          removeToken()
                          successNotification('Đăng xuất thành công')
                          navigate('/')
                        }}
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center gap-3 rounded-md px-2 py-1 text-sm `}
                      >
                        <ArrowRightStartOnRectangleIcon className='h-5' /> Đăng xuất
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
      {!isMobile && (
        <div className='w-full h-[50px]'>
          <ul className={`flex h-full bg-main-color gap-1 px-10 text-white font-bold`}>
            {navigateUser.map((r) => (
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
