import authorImages from "../assets/authorImages"

export function QuoteCard({ quotes }) {
  return (
    <div className="quotesCardDiv" style={{ backgroundColor: "" }}>
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
            <h1 className="quote">"{quote.content}"</h1>
          </div>
        </div>
      ))}
    </div>
  )
}
