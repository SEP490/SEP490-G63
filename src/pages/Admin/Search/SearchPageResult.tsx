import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import logo from '../../../assets/svg/Tdocman.svg'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/shared/Loading/Loading'
import { getSearchContract } from '~/services/contract.service'
import { debounce } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import ItemNewContract from '~/components/Admin/SearchResult/ItemNewContract'
type FormData = {
  searchText: string
  fieldSearch: string
}
const SearchPageResult = () => {
  const { fieldSearch, searchText } = useParams()
  const navigate = useNavigate()
  const refForm = useRef<any>()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(6)
  const { register, handleSubmit, getValues, setValue, watch } = useForm<FormData>({
    defaultValues: { fieldSearch, searchText }
  })

  const { data, isLoading, refetch, isRefetching } = useQuery(['search-result', fieldSearch, searchText], () =>
    getSearchContract(getValues('fieldSearch'), { page, size, key: getValues('searchText') })
  )
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    navigate(`../search/${data.fieldSearch}/${data.searchText}`, { replace: true })
    refetch()
  }

  if (isLoading || isRefetching) return <Loading />
  console.log(data)

  return (
    <div>
      <div className='flex items-center justify-start gap-5 shadow-lg bg-white'>
        <div className='flex justify-center items-center select-none p-6'>
          <img src={logo} alt='logo' className='w-[20px] md:w-[50px]' />
          <div
            className=' bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-900 text-[14px] md:text-[24px] cursor-pointer'
            onClick={() => navigate('/')}
          >
            Docman
          </div>
        </div>

        <form onSubmit={handleSubmit(debounce(onSubmit, 100))} className='flex flex-col items-center my-2'>
          <div className='pl-6 my-1 flex gap-5 select-none w-full text-[14px]'>
            <div
              className={`${fieldSearch == 'contract' ? 'text-blue-600 underline' : ''} hover:underline hover:text-blue-600 cursor-pointer`}
              onClick={() => {
                setValue('fieldSearch', 'contract')
                refForm.current.click()
              }}
            >
              Hợp đồng mới
            </div>
            <div
              className={`${fieldSearch == 'old-contract' ? 'text-blue-600 underline' : ''}  hover:underline hover:text-blue-600 cursor-pointer`}
              onClick={() => {
                setValue('fieldSearch', 'old-contract')
                refForm.current.click()
              }}
            >
              Hợp đồng cũ
            </div>
          </div>
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
              className='border rounded-3xl px-10 py-2 w-[70vw] md:w-[50vw]'
              placeholder='Tìm kiếm'
            />
          </div>
          <button type='submit' className='hidden' ref={refForm}></button>
        </form>
      </div>

      <div className='bg-white'>
        <div>
          Hiển thị {data.object.totalElements} kết quả cho "{searchText}" của
          {fieldSearch == 'contract' ? ' Hợp đồng mới' : ' Hợp đồng cũ'}
        </div>
        {data?.object?.content?.map((d: any) => <ItemNewContract data={d} />)}
      </div>
    </div>
  )
}
export default SearchPageResult
