const TextInput = ({text, value, setValue}) => (
    <div>
    <label>
        {text}
        <input
            type="tezt"
            value={value}
            onChange={({ target }) => setValue(target.value)}
        >
        </input>
    </label>
</div>
)

export default TextInput