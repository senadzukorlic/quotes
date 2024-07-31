// Pagination.jsx
import React from "react"

const Pagination = ({ page, setPage, pageSize, setPageSize, total }) => {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>

      <label>Items per page:</label>
      <select
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        <option value={1}>1 </option>
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={7}>7</option>
      </select>
    </div>
  )
}

export default Pagination
