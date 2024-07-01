import { useState, Fragment } from 'react'
import './Pagination.css' // Import CSS file
import { Listbox, Transition } from '@headlessui/react'
const sizeData = [10, 15, 20]
const Pagination = ({ totalPages, currentPage, onPageChange, size, setSize, setPage }: any) => {
  const [page, setPage_] = useState(currentPage)

  const handlePageChange = (newPage: any) => {
    setPage_(newPage)
    onPageChange(newPage)
  }

  const renderPages = () => {
    const pages = []
    const pageRange = 2 // Số trang hiện quanh trang hiện tại
    const startPage = Math.max(1, page - pageRange)
    const endPage = Math.min(totalPages, page + pageRange)

    if (startPage > 1) {
      pages.push(
        <button className='rounded-md' key={1} onClick={() => handlePageChange(1)}>
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(<span key='start-ellipsis'>...</span>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)} className={`${i === page ? 'active' : ''} rounded-md`}>
          {i}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key='end-ellipsis'>...</span>)
      }
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      )
    }

    return pages
  }

  return (
    <div className='pagination-container'>
      <button className='rounded-md' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        <h6 style={{ fontSize: 12, padding: 3 }}>Previous</h6>
      </button>
      {renderPages()}
      <button className='rounded-md' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
        <h6 style={{ fontSize: 12, padding: 3 }}>Next</h6>
      </button>

      <Listbox
        value={size}
        onChange={(v) => {
          setSize(v)
          setPage(0)
        }}
      >
        <div className='flex flex-col'>
          <Listbox.Button className='w-[90px] m-0 cursor-default rounded-md bg-white py-12 flex justify-center  px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            {size} / page
          </Listbox.Button>
          <div className='relative mx-1'>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-20 bottom-8 left-0 max-h-60 w-[100px] overflow-auto rounded-sm bg-white py-1 px-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                {sizeData.map((s, index) => (
                  <Listbox.Option
                    key={index}
                    className={`cursor-pointer hover:bg-blue-200 rounded-md select-none py-2  pr-2 text-gray-900 flex justify-end`}
                    value={s}
                  >
                    {s + ' / page'}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      </Listbox>
    </div>
  )
}

export default Pagination
