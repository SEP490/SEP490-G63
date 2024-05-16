import TravelImg from '~/assets/places/o.jpg'
import { MdFlight, MdOutlineLocalHotel } from 'react-icons/md'
import { IoIosWifi } from 'react-icons/io'
import { IoFastFoodSharp } from 'react-icons/io5'

const Banner1 = () => {
  return (
    <>
      <div className='min-h-[550px] bg-gray-100'>
        <div className='min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 '>
          <div className='container'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
              {/* text content section */}
              <div className='flex flex-col justify-center gap-6 sm:pt-0 lg:px-16'>
                <h1 data-aos='fade-up' className='text-3xl sm:text-4xl font-bold'>
                  Easy and quick account creation
                </h1>
                <p data-aos='fade-up' className='text-sm text-gray-500 tracking-wide leading-8'>
                  Easy and quick account creation is crucial for enhancing user experience and encouraging sign-ups. It
                  involves a streamlined process that allows users to register with minimal steps, often using social
                  media or email integrations for convenience. This efficient onboarding reduces barriers to entry,
                  helping businesses attract and retain more users by making the initial interaction smooth and
                  hassle-free.
                  <br />
                </p>
                <div data-aos='zoom-in' className='grid grid-cols-2 gap-6'>
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
                </div>
              </div>
              {/* Image section */}
              <div data-aos='flip-up'>
                <img
                  src={TravelImg}
                  alt='biryani img'
                  className='max-w-[450px] h-[350px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner1
