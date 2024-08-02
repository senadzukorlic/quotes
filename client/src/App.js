import React, { useState, useEffect } from "react"
import { useAuth } from "./Context"
import { QuoteCard } from "./Components/QuoteCard"
import Filter from "./Components/Filter"
import Pagination from "./Components/Pagination"

import Login from "./Pages/LogIn"

const App = () => {
  const { token } = useAuth()
  const [quotes, setQuotes] = useState([])
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)
  const [quotesCount, setQuotesCount] = useState(0)

  useEffect(() => {
    if (token) {
      fetchQuotes()
    }
  }, [tags, page, pageSize, token])

  const fetchQuotes = async () => {
    const queryParams = new URLSearchParams({
      tags: tags.join(","),
      page,
      pageSize,
    }).toString()

    try {
      const response = await fetch(
        `http://localhost:8000/quotes?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      setQuotes(data.quotes)
      console.log(data.quotes)
      setQuotesCount(data.quotesCount)
    } catch (error) {
      console.error("Failed to fetch quotes", error)
    }
  }

  return (
    <div className="parentDiv">
      {token ? (
        <>
          <h1>To read the quotes of great minds</h1>
          <Filter tags={tags} setTags={setTags} />
          <QuoteCard quotes={quotes} />
          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            total={quotesCount}
          />
        </>
      ) : (
        <>
          <h1>Welcome to Quotes site</h1>
          <Login />
        </>
      )}
    </div>
  )
}

export default App
