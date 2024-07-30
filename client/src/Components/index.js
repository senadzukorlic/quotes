import "./Form/STYLE.css"

export function Form({
  onSubmit,
  username,
  password,
  changeUsername,
  changePassword,
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="text" value={username} onChange={changeUsername} />
      <input type="password" value={password} onChange={changePassword} />
      <button type="submit">Submit</button>
    </form>
  )
}
