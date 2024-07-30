import axios from "axios"

export async function getQuotes(token) {
  try {
    const response = await axios.get("http://localhost:8000/quotes", {
      headers: { Authorization: "Bearer " + token },
    })

    return response.data.quotes
  } catch (error) {
    console.log(`Nije supelo`, error)
  }
}
