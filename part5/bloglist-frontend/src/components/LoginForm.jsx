import TextInput from './TextInput'
const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div>
    <h2> log in to application</h2>
    <form
      onSubmit={handleLogin}>
      <TextInput
        text="username"
        value={username}
        setValue={setUsername}
      />
      <TextInput
        text="password"
        value={password}
        setValue={setPassword}
      />
      <button
        type="submit">
        login
      </button>
    </form>
  </div>
)

export default LoginForm