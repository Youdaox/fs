const loginForm = (handleLogin, username, setUsername, password, setPassword) => (
<div>
    <form onSubmit={handleLogin}>
    <div>
        <label>
        username
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        </label>
    </div>
    <div>
        <label>
        password
        <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        </label>
    </div>
    <button type="submit">submit</button>
    </form>
</div>
)

export default loginForm