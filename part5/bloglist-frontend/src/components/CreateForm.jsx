import TextInput from "./TextInput"
const CreateForm = ({handleCreateBlog, 
        title, 
        setTitle, 
        author,
        setAuthor,
        url,
        setUrl
    }) => (
    <div>
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
            <TextInput 
            text="title:"
            value={title}
            setValue={setTitle}
            />
            <TextInput 
            text="author:"
            value={author}
            setValue={setAuthor}
            />
            <TextInput 
            text="url::"
            value={url}
            setValue={setUrl}
            />
            <button type="submit">create</button>
        </form>
    </div>
)

export default CreateForm