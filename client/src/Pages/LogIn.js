import React, { useState } from "react"
import { Form } from "../Components/From"
import { useAuth } from "../Context"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { fetchToken } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetchToken(username, password)
  }

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        username={username}
        password={password}
        changeUsername={(e) => setUsername(e.target.value)}
        changePassword={(e) => setPassword(e.target.value)}
      />
    </div>
  )
}

export default Login
