import React, { useState } from 'react'
import Logo from '~/assets/svg/Tdocman.svg'
import { NavLink, Link, Navigate, useNavigate } from 'react-router-dom'
import { FaCaretDown } from 'react-icons/fa'
import ResponsiveMenu from './ResponsiveMenu'
import { HiMenuAlt3, HiMenuAlt1 } from 'react-icons/hi'

export const NavbarLinks = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'About',
    link: '/about'
  },
  {
    name: 'Blogs',
    link: '/blogs'
  },
  {
    name: 'Best Places',
    link: '/best-places'
  }
]

const DropdownLinks = [
  {
    name: 'Dịch vụ',
    link: '/#services'
  },
  {
    name: 'Điều khoản',
    link: '/#mobile_brands'
  },
  {
    name: 'Cài đặt',
    link: '/#location'
  }
]

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <>
      <nav className='fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md'>
        {/* <div className="bg-gradient-to-r from-primary to-secondary text-white ">
          <div className="container py-[2px] sm:block hidden">
            <div className="flex items-center justify-between">
              <p className="text-sm">20% off on next booking</p>
              <p>mobile no. +91 123456789</p>
            </div>
          </div>
        </div> */}
        <div className='container py-3 sm:py-0'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4  font-bold text-2xl'>
              <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt='' className='h-16' />
              </Link>
              {/* <span>TCJ Tourism</span> */}
            </div>
            <div className='hidden md:block grow'>
              <ul className='flex justify-center items-center gap-14 '>
                <li className='py-4'>
                  <NavLink to='/'>Trang chủ</NavLink>
                </li>
                <li className='py-4'>
                  <NavLink to='/blogs'>Bài viết</NavLink>
                </li>
                <li className='py-4'>
                  <NavLink to='/best-places'>Dịch vụ</NavLink>
                </li>
                <li className='py-4'>
                  <NavLink to='/about'>Thông tin</NavLink>
                </li>
                <li className='group relative cursor-pointer'>
                  <a href='/#home' className='flex h-[72px] items-center gap-[2px]'>
                    Tiện ích
                    <span>
                      <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' />
                    </span>
                  </a>
                  <div className='absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block shadow-md '>
                    <ul className='space-y-3'>
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a className='inline-block w-full rounded-md p-2 hover:bg-primary/20' href={data.link}>
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className='flex items-center gap-4'>
              <button
                className='bg-gradient-to-r from-red-500 to-red-500 hover:bg-bg-gradient-to-r hover:from-red hover:bg-red-500 transition-all duration-600 text-white px-3 py-1 rounded-full'
                onClick={() => {
                  navigate('/login')
                }}
              >
                Đăng nhập
              </button>
              <button
                className='bg-gradient-to-r from-cyan-500 to-teal-500 hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full'
                onClick={() => {
                  // handleOrderPopup();
                  navigate('/register')
                }}
              >
                Đăng ký
              </button>
              {/* Mobile Hamburger icon */}
              <div className='md:hidden block'>
                {showMenu ? (
                  <HiMenuAlt1 onClick={toggleMenu} className=' cursor-pointer transition-all' size={30} />
                ) : (
                  <HiMenuAlt3 onClick={toggleMenu} className='cursor-pointer transition-all' size={30} />
                )}
              </div>
            </div>
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  )
}

export default Navbar
