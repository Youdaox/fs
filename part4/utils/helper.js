const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, blog) => {
    return total + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const favourite = (most, blog) => {
    return most.likes < blog.likes ? blog : most
  }

  return blogs.reduce(favourite, blogs[0])
}

const mostBlogs = (authors) => {
  const results = authors
    .reduce((list, blog) => {
      list[blog.author] = list[blog.author] + 1 || 1
      return list
    }, {})
  let author = results[0]
  let amount = 0
  for (const key in results) {
    if (results[key] >= amount) {
      author = key
      amount = results[key]
    }
  }
  return { 
    'author': author,
    'blogs': amount
  }
}

const mostLikes = (blogs) => {
  const authors = blogs
    .reduce((list, blog) => {
      list[blog.author] = list[blog.author] + blog.likes || blog.likes
      return list
    }, {})
  let author = authors[0]
  let amount = 0
  for (const key in authors) {
    if (authors[key] >= amount) {
      author = key
      amount = authors[key]
    }
  }
  return { 
    'author': author,
    'likes': amount
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}