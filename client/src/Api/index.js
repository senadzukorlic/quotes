import axios from "axios"

export async function fetchQuotes({
  page = 1,
  pageSize = 20,
  tags = "",
  sortBy = "upvotesCount",
  sortDirection = "desc",
  token,
}) {
  try {
    const response = await axios.get("http://localhost:8000/quotes", {
      params: {
        page,
        pageSize,
        tags,
        sortBy,
        sortDirection,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching quotes:", error)
    throw error
  }
}
