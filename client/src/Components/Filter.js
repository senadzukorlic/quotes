// Filter.jsx
import React, { useState } from "react"

const Filter = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("")

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue])
      setInputValue("")
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a tag"
      />
      <button onClick={handleAddTag}>Add Tag</button>
      <div>
        {tags.map((tag) => (
          <span className="tag" key={tag} onClick={() => handleRemoveTag(tag)}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Filter
