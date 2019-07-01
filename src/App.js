import loginService from './services/login'
import React, { useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import  { useField } from './hooks/index'
import { createMessage } from './reducers/notificationReducer'
import { createUser, setNull } from './reducers/userReducer'
import { initializeBlogs  } from './reducers/blogReducer'




const App = (props) => {

  const  blogs = props.store.getState().blogs
  const user = props.store.getState().user
  console.log('blogs at the App beginnis', blogs)

  const store = props.store
  console.log('App at the beginning store.getState()', store.getState())


  const [blogs1, setBlogs1] = useState([])
  const [newLikes, setNewLikes] = useState(0)

  console.log ('what user is ?', user)





  const username = useField('text')
  const password = useField('password') 
  const newTitle = useField('text')
  const newUrl = useField('text')
  const newAuthor = useField('text')


  const notify = (kind , message) => {
    console.log('notify, before store.dispatch', store.getState())
    store.dispatch(createMessage( kind, message))
    console.log('notify, after store.dispatch', store.getState())
    setTimeout(() => store.dispatch(createMessage('success', null )), 5000)
    console.log('notify, after setTimeout', store.getState())
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginService.login({
        username:username.value, password:password.value
      })

      console.log('user...........', user)

      await blogService.setToken(user.token)
      store.dispatch(createUser(user.username, user.name))
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
      setBlogs1(sortBlogs(renewedBlogs))
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

      console.log('changed Blog', changedBlog)

      const id = blog.id

      await blogService.update(id, changedBlog)
      const renewedBlogs = await blogService.getAll()
      console.log('renewedBlogs', renewedBlogs)
      store.dispatch(initializeBlogs(renewedBlogs))

      console.log('blogs1', blogs1)

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
        store.dispatch(initializeBlogs(renewedBlogs))
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

        <Notification store = {store}/>

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
          store.dispatch(setNull())
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