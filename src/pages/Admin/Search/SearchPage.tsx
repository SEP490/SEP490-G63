import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/svg/Tdocman.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { debounce } from 'lodash'
import { useState } from 'react'
type FormData = {
  searchText: string
}
const SearchPage = () => {
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    navigate(`/search/${fieldSearch}/${data.searchText}`)
  }
  const [fieldSearch, setFieldSearch] = useState('contract')
  const { register, handleSubmit } = useForm<FormData>()
  return (
    <div className='w-full h-full flex flex-col justify-between pb-6'>
      <div className='w-full'>
        <div className='flex flex-col justify-center items-center mt-[20vh] select-none'>
          <img src={logo} alt='logo' className='w-[80px] md:w-[100px]' />
          <div
            className=' bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-900 text-[32px] md:text-[48px] cursor-pointer'
            onClick={() => navigate('/')}
          >
            TDocman
          </div>
        </div>
        <form onSubmit={handleSubmit(debounce(onSubmit, 100))} className='w-full flex flex-col items-center'>
          <div className='w-full flex justify-center'>
            <div className='relative '>
              <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
            </div>
            <input
              {...register('searchText', { required: true })}
              className='border rounded-3xl shadow-lg px-10 py-2 w-[90%] md:w-[50%]'
              placeholder='Tìm kiếm'
            />
          </div>
          <div className='flex gap-10 select-none mt-3'>
            <div
              className={`${fieldSearch == 'contract' ? 'text-blue-600' : ''} hover:underline hover:text-blue-600 cursor-pointer`}
              onClick={() => setFieldSearch('contract')}
            >
              Hợp đồng mới
            </div>
            <div
              className={`${fieldSearch == 'old-contract' ? 'text-blue-600' : ''}  hover:underline hover:text-blue-600 cursor-pointer`}
              onClick={() => setFieldSearch('old-contract')}
            >
              Hợp đồng cũ
            </div>
          </div>
        </form>
      </div>

      <div className='flex flex-col items-center'>
        <div className='flex gap-5 text-[14px]'>
          <a href='#' className='text-blue-600 hover:underline'>
            About TDocman
          </a>
          <a href='#' className='text-blue-600 hover:underline'>
            Contact us
          </a>
          <a href='#' className='text-blue-600 hover:underline'>
            About us
          </a>
          <a href='#' className='text-blue-600 hover:underline'>
            Privacy
          </a>
        </div>
        <div className='text-[12px] text-[gray]'>@ 2024 TDocman.id</div>
      </div>
    </div>
  )
}
export default SearchPage
