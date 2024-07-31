import axios from "axios"
import { createContext, useState, useContext } from "react"

export const Token = createContext()

export function TokenProvider({ children }) {
  const [token, setToken] = useState("")

  const fetchToken = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8000/sessions", {
        username,
        password,
      })
      const { accessToken } = response.data
      setToken(accessToken)
    } catch (error) {
      console.error("Failed to fetch token", error)
    }
  }

  return (
    <Token.Provider value={{ token, setToken, fetchToken }}>
      {children}
    </Token.Provider>
  )
}

export const useAuth = () => useContext(Token)
