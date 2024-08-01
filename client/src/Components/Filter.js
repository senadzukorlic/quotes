// Filter.jsx
import React, { useState } from "react"

const Filter = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("")

  const handleAddTag = (e) => {
    e.preventDefault()
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue])
      setInputValue("")
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <form
      onSubmit={handleAddTag}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <input
          style={{
            width: "200px",
            height: "30px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            padding: "0 15px",
            boxSizing: "border-box",
            textAlign: "center",
            outline: "none",
            textIndent: "5px",
          }}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a tag"
        />
        <button
          style={{
            borderRadius: "20px",
            height: "33px",
          }}
          type="submit"
        >
          Add Tag
        </button>
      </div>

      <div>
        {tags.map((tag) => (
          <span className="tag" key={tag} onClick={() => handleRemoveTag(tag)}>
            {tag}
          </span>
        ))}
      </div>
    </form>
  )
}

export default Filter
