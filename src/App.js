import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import React from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import Blogs from './components/Blogs'
import { connect } from 'react-redux'
import Users from './components/Users'
import Blog from './components/Blog'




const App = (props) => {
  const user = props.user
  const blogs = props.blogs

  const padding = { padding: 5 }

  const blogById = (id) =>
    props.blogs.find(blog => blog.id === Number(id))


  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            {user
              ? <em> {user.name} logged in </em>
              : <Link to="/login">login</Link>
            }
          </div>

          <Route exact path="/" render={() =>
            <div>
              <h2>Log in to application</h2>
              <Notification/>
            </div>
          }/>
          <Route exact path="/blogs" render={() =>
            user
              ?
              <div>
                <h2>New Blog</h2>
                <Togglable buttonLabel="new blog">
                  <BlogForm />
                </Togglable>
                <Blogs />
              </div>
              :<Redirect to="/login" />

          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />}
          />
          <Route path="/users" render={() =>
            user
              ?
              <div>
                {console.log('props.user', user)}
                <h2>blogs</h2>
                <Notification/>
                <Logout/>
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


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  null
)(App)