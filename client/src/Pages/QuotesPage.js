import React, { useEffect, useState } from "react"
import { Token } from "../Context"
import { useContext } from "react"
import { getQuotes } from "../Api"
function QuotesPage() {
  const { setToken, token } = useContext(Token)
  const handleLogout = () => {
    setToken(null)
  }

  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getQuotes(token)
      setQuotes(response)
    }
    fetchData()
  }, [token])

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {quotes.map((q) => (
        <ul key={q.id}>
          <li>{q.content}</li>
        </ul>
      ))}
    </div>
  )
}

export default QuotesPage
