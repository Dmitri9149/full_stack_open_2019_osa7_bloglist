import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import { connect } from 'react-redux'
import Users from './components/Users'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import usersService from './services/users'
import { initializeUsers } from './reducers/usersReducer'
import { createMessage } from './reducers/notificationReducer'
import BlogSimple from './components/BlogSimple'




const App = (props) => {
  useEffect(() => {
    blogsService
      .getAll().then(blogs => props.initializeBlogs(blogs))
  },[])

  useEffect(() => {
    usersService
      .getAll().then(users => props.initializeUsers(users))
  },[])


  const padding = { padding: 5 }

  const blogById = (id) => {
    console.log( props.blogs.find(blog => blog.id === id))
    return(
      props.blogs.find(blog => blog.id === id)
    )
  }


  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            {props.user
              ? <em> {props.user.name} logged in </em>
              : <Link to="/login">login</Link>
            }
            <Link style={padding} to="/logout">logout</Link>
          </div>

          <Route exact path="/" render={() =>
            <div>
              <h2>Log in to or continue with the application</h2>
            </div>
          }/>
          <Route exact path="/blogs" render={() =>
            props.user
              ?
              <div>
                <h2>New Blog</h2>
                <Notification/>
                <Togglable buttonLabel="new blog">
                  <BlogForm />
                </Togglable>
                <Blogs />
              </div>
              :<Redirect to="/login" />

          } />

          <Route path="/blogs/:id" render={({ match }) =>

            <div>
              <Notification/>
              <BlogSimple
                blog={blogById(match.params.id)}
                createMessage = {props.createMessage}
                initializeBlogs = {props.initializeBlogs}
                initializeUsers = {props.initializeUsers}
              />
            </div>
          }/>

          <Route path="/users" render={() =>
            props.user
              ?
              <div>
                <h2>blogs</h2>
                <Notification/>
                <Users/>
              </div>

              : <Redirect to="/login" />
          } />

          <Route path="/login" render={() =>
            <div>
              <Notification/>
              <LoginForm/>

            </div>
          }
          />
          <Route path="/logout" render={() =>
            props.user
              ?
              <div>
                <Logout/>
              </div>
              :<Redirect to="/" />
          } />
        </div>
      </Router>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs:state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  createMessage
}


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)





