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
import blogsService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import usersService from './services/users'
import { initializeUsers } from './reducers/usersReducer'
import { createMessage } from './reducers/notificationReducer'
import BlogSimple from './components/BlogSimple'
import { Menu, Container, Header } from 'semantic-ui-react'




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


  return (
    <Container>
      <div>
        <Router>
          <div>
            <Menu inverted>
              <Menu.Item link>
                <Link style={padding} to="/">home</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link style={padding} to="/blogs">blogs</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link style={padding} to="/users">users</Link>
                {props.user
                  ? <em> {props.user.name} logged in </em>
                  : <Link to="/login">login</Link>
                }
              </Menu.Item>
              <Menu.Item link>
                <Link style={padding} to="/logout">logout</Link>
              </Menu.Item>
            </Menu>

            <Route exact path="/" render={() =>
              <div>
                <h2>Log in to or continue with the application</h2>
              </div>
            }/>

            <Route exact path="/blogs" render={() =>
              props.user
                ?
                <div>
                  <Header as = 'h2' dividing>New Blog</Header>
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
                <BlogSimple blogId={match.params.id} />
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
    </Container>
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





