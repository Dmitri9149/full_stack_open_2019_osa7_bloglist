import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { initializeBlogs  } from '../reducers/blogReducer'
import { initializeUsers  } from '../reducers/usersReducer'
import { createMessage } from '../reducers/notificationReducer'


const Blogs = (props) => {

  const blogs = props.blogs
  const user = props.user
  console.log('Blogs', blogs)
  console.log('Blogs, user', user)
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user = {user}
          createMessage = {props.createMessage}
          initializeBlogs = {props.initializeBlogs}
          initializeUsers = {props.initializeUsers}
        />
      )}
    </div>
  )


}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  createMessage,
  initializeBlogs,
  initializeUsers
}


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)

