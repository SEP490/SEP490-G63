import React, { useState } from 'react'
import './Pagination.css' // Import CSS file

const Pagination = ({ totalPages, currentPage, onPageChange }: any) => {
  const [page, setPage] = useState(currentPage)

  const handlePageChange = (newPage: any) => {
    setPage(newPage)
    onPageChange(newPage)
  }

  const renderPages = () => {
    const pages = []
    const pageRange = 2 // Số trang hiện quanh trang hiện tại
    const startPage = Math.max(1, page - pageRange)
    const endPage = Math.min(totalPages, page + pageRange)

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => handlePageChange(1)}>
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(<span key='start-ellipsis'>...</span>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)} className={i === page ? 'active' : ''}>
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
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        <h6 style={{ fontSize: 12, padding: 3 }}>Previous</h6>
      </button>
      {renderPages()}
      <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
        <h6 style={{ fontSize: 12, padding: 3 }}>Next</h6>
      </button>
    </div>
  )
}

export default Pagination
