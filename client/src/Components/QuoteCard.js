import React, { useState } from "react"
import authorImages from "../assets/authorImages"
import { useAuth } from "../Context"

export function QuoteCard({ quotes }) {
  const [likedQuotes, setLikedQuotes] = useState({})
  const [dislikedQuotes, setDislikedQuotes] = useState({})
  const { token } = useAuth()

  const handleLike = async (id) => {
    try {
      if (likedQuotes[id]) {
        await fetch(`http://localhost:8000/quotes/${id}/upvote`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setLikedQuotes((prev) => ({ ...prev, [id]: false }))
      } else {
        await fetch(`http://localhost:8000/quotes/${id}/upvote`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setLikedQuotes((prev) => ({ ...prev, [id]: true }))
        if (dislikedQuotes[id]) {
          await fetch(`http://localhost:8000/quotes/${id}/downvote`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setDislikedQuotes((prev) => ({ ...prev, [id]: false }))
        }
      }
    } catch (error) {
      console.error("Failed to like quote", error)
    }
  }

  const handleDislike = async (id) => {
    try {
      if (dislikedQuotes[id]) {
        await fetch(`http://localhost:8000/quotes/${id}/downvote`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDislikedQuotes((prev) => ({ ...prev, [id]: false }))
      } else {
        await fetch(`http://localhost:8000/quotes/${id}/downvote`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDislikedQuotes((prev) => ({ ...prev, [id]: true }))

        if (likedQuotes[id]) {
          await fetch(`http://localhost:8000/quotes/${id}/upvote`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setLikedQuotes((prev) => ({ ...prev, [id]: false }))
        }
      }
    } catch (error) {
      console.error("Failed to dislike quote", error)
    }
  }

  const calculatePercentage = (upvotes, downvotes) => {
    const totalVotes = upvotes + downvotes
    if (totalVotes === 0) return 0
    return Math.round((upvotes / totalVotes) * 100)
  }

  return (
    <div className="quotesCardDiv">
      {quotes.map((quote) => {
        const upvotesCount =
          quote.upvotesCount + (likedQuotes[quote.id] ? 1 : 0)
        const downvotesCount =
          quote.downvotesCount + (dislikedQuotes[quote.id] ? 1 : 0)
        const percentage = calculatePercentage(upvotesCount, downvotesCount)

        return (
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
                <div className="stats">
                  <span style={{ color: percentageColor(percentage) }}>
                    {percentage}%
                  </span>
                </div>
                <div className="likeAndDislikeDiv">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => handleLike(quote.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <LikeIcon isActive={likedQuotes[quote.id]} />
                    </button>
                    <span>{upvotesCount}</span>
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
                      <DislikeIcon isActive={dislikedQuotes[quote.id]} />
                    </button>
                    <span>{downvotesCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const LikeIcon = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill={isActive ? "green" : "gray"}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.21 8.95 7 9.45 7 10v8c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.5l-.01-.01L23 10z" />
  </svg>
)

const DislikeIcon = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill={isActive ? "red" : "gray"}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22L1.14 11.27c-.09.23-.14.47-.14.73v1.5c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06l1.39 1.44 6.58-6.59c.38-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
)

const percentageColor = (percentage) => {
  if (percentage <= 20) return "red"
  if (percentage <= 50) return "orange"
  if (percentage <= 75) return "yellow"
  if (percentage < 100) return "lightgreen"
  return "green"
}
