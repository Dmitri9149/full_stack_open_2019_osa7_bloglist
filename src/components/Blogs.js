import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'



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


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  null
)(Blogs)

