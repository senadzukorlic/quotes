import React, { useEffect, useState } from "react"
import { Token } from "../Context"
import { useContext } from "react"
import { fetchQuotes } from "../Api"
import { QuoteCard } from "../Components/QuoteCard"
function QuotesPage() {
  const { setToken, token } = useContext(Token)

  const handleLogout = () => {
    setToken(null)
  }

  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchQuotes({ page: 1, pageSize: 20, token })
      console.log(response.quotes)
      setQuotes(response.quotes)
    }
    fetchData()
  }, [token])

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {quotes.map((quote) => (
        <QuoteCard
          key={quote.id}
          quotes={quote.content}
          author={quote.author}
        />
      ))}
    </div>
  )
}

export default QuotesPage

// const { token } = useContext(Token)
// const [quotes, setQuotes] = useState([]);
// const [tags, setTags] = useState([]);
// const [page, setPage] = useState(1);
// const [pageSize, setPageSize] = useState(20);
// const [sortBy, setSortBy] = useState("upvotesCount");
// const [sortDirection, setSortDirection] = useState("desc");
// const [quotesCount, setQuotesCount] = useState(0);

// useEffect(() => {
//   fetchQuotes();
// }, [tags, page, pageSize, sortBy, sortDirection]);

// const fetchQuotes = async () => {
//   const queryParams = new URLSearchParams({
//     tags: tags.join(','),
//     page,
//     pageSize,
//     sortBy,
//     sortDirection
//   }).toString();

//   const response = await fetch(`/quotes?${queryParams}`);
//   const data = await response.json();
//   setQuotes(data.quotes);
//   setQuotesCount(data.quotesCount);
// };

// return (

//   <div className='parentDiv'>
//     {token ? <QuotesPage /> : <Login />}
//     <h1>Quotes</h1>
//     <Filter tags={tags} setTags={setTags} />
//     <Sort sortBy={sortBy} setSortBy={setSortBy} sortDirection={sortDirection} setSortDirection={setSortDirection} />
//     <QuotesList quotes={quotes} />
//     <Pagination page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} total={quotesCount} />
//   </div>
// );
// };
