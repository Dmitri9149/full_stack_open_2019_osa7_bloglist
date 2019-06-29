import loginService from './services/login'
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import  { useField } from './hooks/index'
import notificationReducer from './reducers/notificationReducer'
import { createMessage } from './reducers/notificationReducer'
import { createStore } from 'redux'

const store = createStore(notificationReducer)
console.log('STORE AFTER CREATION!!!!!!!', store.getState())


const Notification = () => {
  console.log('STORE!!!!!!!', store.getState())
  if (store.getState().message === null) {
    return null
  }

  const style = {
    color: store.kind === 'error' ? 'red' : 'green',
    background: 'Orange',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {store.getState().message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newLikes, setNewLikes] = useState(0)
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    const getAll = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs( sortBlogs(blogs) )
      } catch(exception) {
        notify('error', 'something is wrong inside useEffect getting blogs')
      }
    }
    getAll()
  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const username = useField('text')
  const password = useField('password') 
  const newTitle = useField('text')
  const newUrl = useField('text')
  const newAuthor = useField('text')


  const notify = (kind , message) => {
    store.dispatch(createMessage( kind, message))
    setTimeout(() => store.dispatch(createMessage('success', null )), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginService.login({
        username:username.value, password:password.value
      })

      console.log('user...........', user)

      await blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify('error', 'wrong username or password')
    }
  }

  const addBlog = async (event) => {
    try {
      event.preventDefault()

      const blogObject = {
        author: newAuthor.value,
        title: newTitle.value,
        url:newUrl.value,
        likes:newLikes
      }

      await blogService.create(blogObject)
      const renewedBlogs = await blogService.getAll()
      setBlogs(sortBlogs(renewedBlogs))
      notify('success', `a new blog ${newTitle.value} by ${newAuthor.value} added`)
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
      setNewLikes('')
    } catch(exception) {
      notify('error','some problems with blog addition')
    }
  }

  const handleLikesOf = async (blog) => {
    try {

      const changedBlog = {
        title:blog.title,
        author:blog.author,
        url:blog.url,
        likes:blog.likes +1,
        user:blog.user.id
      }

      const id = blog.id

      await blogService.update(id, changedBlog)
      const renewedBlogs = await blogService.getAll()
      setBlogs(sortBlogs(renewedBlogs))

    } catch (exception) {
      notify('error','something is wrong with updates due to likes handling')
    }

  }

  const deleteBlogOf = async (id) => {
    try {
      console.log('id -------------->', id)
      const blog = blogs.find(blog => blog.id === id)
      if (window.confirm(`Poistetaanko   "${blog.title}"  ?`)) {
        const res = await blogService.del(id)
        console.log('after delete method', res)
        const renewedBlogs = await blogService.getAll()
        setBlogs(sortBlogs(renewedBlogs))
        notify('success','the blog is deleted')
      }
    } catch (exception) {
      notify('error', 'something is wrong with deliting of the blog')
    }
  }


  const sortBlogs = (blogs) => blogs.sort((b,a) => (a.likes-b.likes))

  const determineWhenVisible =  (blog, user) => {
    const condition = (blog.user.username === user.username)
    return { display: condition ? '' : 'none' }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <Togglable buttonLabel='login'>
          <LoginForm
            username ={username}
            password = {password}

            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      ---
      <h2>blogs</h2>

      <Notification store={store} />

      <p>{user.name} logged in</p>
      <div>
        <button onClick = {() => {
          setUser(null)
          username.reset()
          password.reset()
          blogService.setToken(null)
        }}
        >
        logout
        </button>
      </div>
      <h2>New Blog</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          newUrl={newUrl}
          newAuthor = { newAuthor }
        />
      </Togglable>
      <div>

      </div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes = {() => handleLikesOf(blog)}
          deleteBlog = {() => deleteBlogOf(blog.id)}
          displayOrNot = {determineWhenVisible(blog, user)}
        />
      )}
    </div>
  )
}

export default App