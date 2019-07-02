
import React from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import Blogs from './components/Blogs'



const App = (props) => {

  const  blogs = props.store.getState().blogs
  const user = props.store.getState().user
  console.log('blogs at the App beginnis', blogs)

  const store = props.store

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification store = {store}/>

        <Togglable buttonLabel='login'>
          <LoginForm store = {store} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      ---
      <h2>blogs</h2>

      <Notification store={store} />
      <Logout store = {store} />

      <h2>New Blog</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm store = {store} />
      </Togglable>
      <Blogs store = {store} />
    </div>
  )
}


export default App