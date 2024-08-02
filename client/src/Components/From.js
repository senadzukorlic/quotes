import "../STYLE.css"

export function Form({
  onSubmit,
  username,
  password,
  changeUsername,
  changePassword,
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="text"
        value={username}
        onChange={changeUsername}
        className="form-input"
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={changePassword}
        className="form-input"
        placeholder="Password"
      />{" "}
      <br />
      <button type="submit" className="form-button">
        Log In
      </button>
    </form>
  )
}
