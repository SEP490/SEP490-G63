import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate()
  return (
    <>
      <span id='contact'></span>
      <div className='dark:bg-black dark:text-white py-14'>
        <div className='container'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 bg-dark py-8 px-6 bg-teal-500'>
            <div className='col-span-2 space-y-3'>
              <h1 className='text-4xl font-bold text-white'>ĐĂNG KÝ ĐỂ NHẬN TƯ VẤN MIỄN PHÍ</h1>
              <p className='text-white'>
                Có đội ngũ chuyên gia kiểm soát chặt chẽ các vấn đề liên quan đến an toàn thông tin. Các thông tin định
                danh được mã hóa bảo mật nhiều lớp nhằm bảo vệ dữ liệu của khách hàng, hạn chế tối đa rủi ro lộ thông
                tin.{' '}
              </p>
            </div>
            <div className='grid place-items-center'>
              <a
                onClick={() => navigate('/register')}
                className='cursor-pointer rounded inline-block font-semibold py-2 px-6 bg-white text-teal-500 hover:bg-cyan-500 hover:text-white duration-200 tracking-widest uppercase '
              >
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
