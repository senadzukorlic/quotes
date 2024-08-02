import React from "react"

const Pagination = ({ page, setPage, pageSize, setPageSize, total }) => {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "300px",
        marginBottom: "50px",
        paddingTop: "20px",

        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "500px",
        }}
      >
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
      </div>
      <div>
        <label>Items per page:</label>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={1}>1 </option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={7}>All</option>
        </select>
      </div>
    </div>
  )
}

export default Pagination
