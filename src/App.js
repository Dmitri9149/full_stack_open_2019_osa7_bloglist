import loginService from './services/login'
import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { createUser, setNull } from './reducers/userReducer'
import  { useField } from './hooks/index'
import { createMessage } from './reducers/notificationReducer'
import { initializeBlogs  } from './reducers/blogReducer'




const App = (props) => {

  const  blogs = props.store.getState().blogs
  const user = props.store.getState().user
  console.log('blogs at the App beginnis', blogs)

  const store = props.store

  const username = useField('text')
  const password = useField('password')


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
      store.dispatch(createUser(user.username, user.name))
    } catch (exception) {
      notify('error', 'wrong username or password')
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
      console.log('renewedBlogs', renewedBlogs)
      store.dispatch(initializeBlogs(renewedBlogs))


    } catch (exception) {
      notify('error','something is wrong with updates due to likes handling')
    }

  }


  const deleteBlogOf = async (id) => {
    try {
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
          store = {store}
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