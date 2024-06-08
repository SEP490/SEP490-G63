import React from 'react'
import TravelImg from '~/assets/places/n.jpg'
import { MdFlight, MdOutlineLocalHotel } from 'react-icons/md'
import { IoIosWifi } from 'react-icons/io'
import { IoFastFoodSharp } from 'react-icons/io5'

const Banner = () => {
  return (
    <>
      <div className='min-h-[550px] bg-gray-100'>
        <div className='min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 '>
          <div className='container'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
              {/* Image section */}
              <div data-aos='flip-up'>
                <img
                  src={TravelImg}
                  alt='biryani img'
                  className='max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover'
                />
              </div>
              {/* text content section */}
              <div className='flex flex-col justify-center gap-2 sm:pt-0 lg:px-16'>
                <h1 data-aos='fade-up' className='text-3xl sm:text-4xl font-bold'>
                  Pháp lý hợp đồng điện tử
                </h1>
                <p data-aos='fade-up' className='text-sm text-gray-500 tracking-wide leading-8'>
                  ✔️Luật mẫu thương mại điện tử UNCITRAL của Ủy ban Liên Hiệp Quốc về Luật thương mại điện tử.
                </p>
                <p data-aos='fade-up' className='text-sm text-gray-500 tracking-wide leading-8'>
                  ✔️Luật giao dịch điện tử số 51/2005/QH11 của Quốc hội ngày 29/11/2005 hiệu lực từ 01/03/2006.
                </p>
                <p data-aos='fade-up' className='text-sm text-gray-500 tracking-wide leading-8'>
                  ✔️Nghị định số 130/2018/NĐ-CP của Chính phủ quy định chi tiết thi hành Luật giao dịch điện tử về chữ
                  ký số và dịch vụ chứng thực chữ ký số.
                </p>
                <p data-aos='fade-up' className='text-sm text-gray-500 tracking-wide leading-8'>
                  ✔️Thông tư 22/2020/TT-BTTTT của Bộ Thông tin và truyền thông về yêu cầu kỹ thuật đối với phần mềm ký
                  số.
                </p>
                <p data-aos='fade-up' className='text-sm text-gray-500 tracking-wide leading-8'>
                  ✔️Nghị định số 166/2016/NĐ-CP quy định về giao dịch điện tử trong BHXH, BHYT, BHTN
                </p>
                {/* <div data-aos='zoom-in' className='grid grid-cols-2 gap-6'>
                  <div className='space-y-6'>
                    <div className='flex items-center gap-4'>
                      <MdFlight className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400' />
                      <p>Fast</p>
                    </div>
                    <div className='flex items-center gap-4'>
                      <MdOutlineLocalHotel className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400' />
                      <p>Secure</p>
                    </div>
                  </div>
                  <div className='space-y-6'>
                    <div className='flex items-center gap-4'>
                      <IoIosWifi className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400' />
                      <p>Convinient</p>
                    </div>
                    <div className='flex items-center gap-4'>
                      <IoFastFoodSharp className='text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400' />
                      <p>Efficient</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner
