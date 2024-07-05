import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import logo from '../../../assets/svg/Tdocman.svg'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/shared/Loading/Loading'
import { getSearchContract } from '~/services/contract.service'
import { debounce } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import ItemNewContract from '~/components/Admin/SearchResult/ItemNewContract'
import ItemOldContract from '~/components/Admin/SearchResult/ItemOldContract'
import Pagination from '~/components/BaseComponent/Pagination/Pagination'
import { XMarkIcon } from '@heroicons/react/24/outline'
import LoadingPage from '~/components/shared/LoadingPage/LoadingPage'
type FormData = {
  searchText: string
  fieldSearch: string
}
const SearchPageResult = () => {
  const { fieldSearch, searchText } = useParams()
  const navigate = useNavigate()
  const refForm = useRef<any>()
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [data, setData] = useState<any>()
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>({
    defaultValues: { fieldSearch, searchText }
  })
  useEffect(() => {
    searchQuery.mutate({ fieldSearch: getValues('fieldSearch'), data: { page, size, key: getValues('searchText') } })
  }, [page, size])
  const searchQuery = useMutation(getSearchContract, {
    onSuccess: (result) => {
      setData(result.object)
      setTotalPage(result?.object?.totalPages)
    }
  })
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    navigate(`../search/${data.fieldSearch}/${data.searchText}`, { replace: true })
    searchQuery.mutate({ fieldSearch: getValues('fieldSearch'), data: { page, size, key: getValues('searchText') } })
  }
  const handlePageChange = (page: any) => {
    setPage(page - 1)
  }
  if (searchQuery.isLoading || searchQuery.isIdle) return <LoadingPage />
  return (
    <div className=' h-full'>
      <div className='flex items-center justify-start gap-5 shadow-lg bg-[url(https://i.ibb.co/QMrFzkS/wallpaperflare-com-wallpaper-13.jpg)] bg-cover h-[100px]'>
        <div className='flex justify-center items-center select-none p-6 '>
          <img src={logo} alt='logo' className='w-[20px] md:w-[50px]' />
          <div
            className=' bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-900 text-[14px] md:text-[24px] cursor-pointer'
            onClick={() => navigate('/')}
          >
            Docman
          </div>
        </div>

        <form onSubmit={handleSubmit(debounce(onSubmit, 100))} className=' my-2'>
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
              className='border rounded-3xl px-10 py-2 w-[70vw] md:w-[50vw] shadow-sm'
              placeholder='Tìm kiếm'
            />
            {/* <XMarkIcon className='h-5 w-5 cursor-pointer' onClick={() => console.log('clear')} /> */}
          </div>
          <div className='pl-6 my-1 flex gap-5 select-none w-full text-[14px]'>
            <div
              className={`font-mono font-semibold ${fieldSearch == 'contract' ? 'text-blue-600 border-b-4 border-blue-500' : ''} border-blue-400 hover:text-blue-600 cursor-pointer`}
              onClick={() => {
                setValue('fieldSearch', 'contract')
                refForm.current.click()
              }}
            >
              Hợp đồng mới
            </div>
            <div
              className={`font-mono font-semibold ${fieldSearch == 'old-contract' ? 'text-blue-600 border-b-4 border-blue-500' : ''} border-blue-400 hover:text-blue-600 cursor-pointer`}
              onClick={() => {
                setValue('fieldSearch', 'old-contract')
                refForm.current.click()
              }}
            >
              Hợp đồng cũ
            </div>
          </div>
          <button type='submit' className='hidden' ref={refForm}></button>
        </form>
      </div>

      <div className='h-[calc(100%-100px)] overflow-auto'>
        <div className='pl-5 text-black mt-2 bg-slate-300 rounded-3xl py-1'>
          👉 Hiển thị {data?.totalElements} kết quả cho "{getValues('searchText')}" của
          {fieldSearch == 'contract' ? ' Hợp đồng mới' : ' Hợp đồng cũ'}
        </div>
        <div className='flex flex-wrap gap-5 px-6 lg:px-52 mt-4'>
          {data?.content?.map((d: any) =>
            fieldSearch == 'contract' ? <ItemNewContract data={d} /> : <ItemOldContract data={d} />
          )}
        </div>
        <div className='mt-6'>
          <Pagination
            totalPages={totalPage}
            currentPage={page + 1}
            size={size}
            setSize={setSize}
            setPage={setPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
export default SearchPageResult
