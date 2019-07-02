
import React from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { setNull } from './reducers/userReducer'
import blogService from './services/blogs'
import  { useField } from './hooks/index'


const App = (props) => {

  const  blogs = props.store.getState().blogs
  const user = props.store.getState().user
  console.log('blogs at the App beginnis', blogs)

  const store = props.store

  const username = useField('text')
  const password = useField('password')



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
        <BlogForm store = {store} />
      </Togglable>
      <Blogs store = {store} />
      
    </div>
  )
}


export default App