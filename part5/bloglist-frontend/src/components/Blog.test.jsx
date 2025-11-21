import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateForm from './CreateForm'

describe('<Blog />', () => {
  test('blog renders correctly', () => {
    const blog = {
      title: 'test',
      author: 'author',
      url: 'testurl',
      likes: 2,
    }
    render(<Blog blog={blog} />)

    expect(screen.getByText('test', { exact: false })).toBeDefined()
    expect(screen.getByText('author', { exact: false })).toBeDefined()

    const notUrl = screen.queryByText('testurl')
    const notLikes = screen.queryByText('2')
    screen.debug(notUrl)
    expect(notUrl).toBeNull()
    expect(notLikes).toBeNull()
  })

  test('blog shows details correctly', async () => {
    const blog = {
      title: 'test',
      author: 'author',
      url: 'testurl',
      likes: 2,
    }
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.queryByText('testurl', { exact: false })).toBeDefined()
    expect(screen.queryByText('2', { exact: false })).toBeDefined()
  })

  test('like button functions correctly', async () => {
    const blog = {
      title: 'test',
      author: 'author',
      url: 'testurl',
      likes: 2,
    }

    const handleUpdate = vi.fn()

    render(<Blog
      blog={blog}
      updateBlog={handleUpdate}
    />)


    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleUpdate.mock.calls).toHaveLength(2)
  })
})

describe('<CreateForm />', () => {
  test('is called with the right input', async() => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<CreateForm createBlog={createBlog}/>)
    screen.debug()
    const title = screen.getByLabelText('title:')
    const author = screen.getByLabelText('author:')
    const url = screen.getByLabelText('url:')
    const button = screen.getByText('create')

    await user.type(title, 'test title')
    await user.type(author, 'test author')
    await user.type(url, 'test url')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')
  })
})