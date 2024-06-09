import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  // const [priceValue, setPriceValue] = React.useState(30);
  const navigate = useNavigate()
  return (
    <div className=' bg-black/20 h-full'>
      <div className='h-full flex items-center p-4 bg-primary/10'>
        <div className='container grid grid-cols-1 gap-4'>
          <div className='text-white'>
            <p data-aos='fade-up' className='text-5xl font-mono border-4 border-teal-400 inline-block rounded p-2'>
              TDocman
            </p>
            <p data-aos='fade-up' data-aos-delay='300' className='font-bold text-4xl mt-2'>
              Giải pháp ký số tiên phong
            </p>
            <p
              data-aos='fade-up'
              data-aos-delay='350'
              className='text-xl w-full lg:w-[40vw] opacity-50 mt-4 rounded-xl'
            >
              Vinh dự mang đến những giải pháp tối ưu nhất và tự hào góp phần trong quá trình chuyển đổi số doanh nghiệp
              của bạn
            </p>
          </div>
          <div data-aos='fade-up' data-aos-delay='600' className='space-y-4 rounded-md py-2'>
            <button
              className='bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:scale-105 px-8 py-5 text-xl rounded-full duration-200'
              onClick={() => navigate('/register')}
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
