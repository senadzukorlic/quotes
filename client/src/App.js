import React, { useContext } from "react"
import Login from "./Pages/LogIn"
import QuotesPage from "./Pages/QuotesPage"
// import "./Style.css"
import { Token } from "./Context"

function App() {
  const { token } = useContext(Token)

  return <div>{token ? <QuotesPage /> : <Login />}</div>
}

export default App
