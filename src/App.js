
import React from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import { connect } from 'react-redux'
import Users from './components/Users'



const App = (props) => {


  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <Togglable buttonLabel='login'>
          <LoginForm/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      ---
      <h2>blogs</h2>
      <Notification/>
      <Logout/>
      <Users/>

      <h2>New Blog</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <Blogs />
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  null
)(App)