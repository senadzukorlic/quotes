import React, { useState } from "react"
import authorImages from "../assets/authorImages"
import { useAuth } from "../Context"
export function QuoteCard({ quotes }) {
  const [likedQuotes, setLikedQuotes] = useState({})
  const [dislikedQuotes, setDislikedQuotes] = useState({})
  const { token } = useAuth()
  const handleLike = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/quotes/${id}/upvote`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.ok) {
        const updatedQuote = await response.json()
        setLikedQuotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
        setDislikedQuotes((prev) => ({ ...prev, [id]: prev[id] || 0 }))
      }
    } catch (error) {
      console.error("Failed to like quote", error)
    }
  }

  const handleDislike = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/quotes/${id}/downvote`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.ok) {
        const updatedQuote = await response.json()
        setDislikedQuotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
        setLikedQuotes((prev) => ({ ...prev, [id]: prev[id] || 0 }))
      }
    } catch (error) {
      console.error("Failed to dislike quote", error)
    }
  }

  return (
    <div className="quotesCardDiv">
      {quotes.map((quote) => (
        <div className="quotesCard" key={quote.id}>
          <div className="ImgAndAuthorDiv">
            <img
              src={authorImages[quote.author]}
              alt=""
              className="author-image"
            />
            <p className="author-name">{quote.author}</p>
          </div>
          <div className="quoteDiv">
            <div className="tags">
              <p>Tag:</p>
              {quote.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="quote">
              <h1 id="quote">"{quote.content}"</h1>
            </div>
            <div className="voteDiv">
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => handleLike(quote.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <LikeIcon />
                </button>
                <span>{quote.upvotesCount + (likedQuotes[quote.id] || 0)}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => handleDislike(quote.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <DislikeIcon />
                </button>
                <span>
                  {quote.downvotesCount + (dislikedQuotes[quote.id] || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const LikeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="green"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.21 8.95 7 9.45 7 10v8c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.5l-.01-.01L23 10z" />
  </svg>
)

const DislikeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="red"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22L1.14 11.27c-.09.23-.14.47-.14.73v1.5c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06l1.39 1.44 6.58-6.59c.38-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
)
