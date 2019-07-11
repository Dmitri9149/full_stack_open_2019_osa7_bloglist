import React from 'react'
import { connect } from 'react-redux'
import { initializeBlogs  } from '../reducers/blogReducer'
import { initializeUsers  } from '../reducers/usersReducer'
import { createMessage } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'


const Blogs = (props) => {

  const blogs = props.blogs
  const user = props.user
  console.log('Blogs', blogs)
  console.log('Blogs, user', user)
  return (
    <div>
      <ul>
        {blogs.map(blog =>
          <li key = {blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}    {blog.author} </Link>
          </li>
        )}
      </ul>
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

