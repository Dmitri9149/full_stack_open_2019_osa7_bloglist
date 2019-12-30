import React from 'react'
import blogsService from '../services/blogs'
import usersService from '../services/users'
import { withRouter } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { createMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import BlogComments from './BlogComments'
import { Header, Button } from 'semantic-ui-react'




const BlogSimpleNoHist = props => {

  const blog = props.blogs.find(blog => blog.id === props.blogId)

  if(blog === undefined) {
    return (null)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const notify = (kind , message) => {
    props.createMessage( kind, message)
    setTimeout(() => props.createMessage('success', null ), 5000)
  }

  const deleteBlogOf = async () => {
    try {
      if (window.confirm(`Poistetaanko   "${blog.title}"  ?`)) {
        console.log('blog.id', blog.id)
        const res = await blogsService.del(blog.id)
        console.log('after delete method', res)
        const renewedBlogs = await blogsService.getAll()
        const renewedUsers = await usersService.getAll()
        console.log(renewedBlogs)
        console.log(renewedUsers)
        props.initializeBlogs(renewedBlogs)
        props.initializeUsers(renewedUsers)
        notify('success','the blog is deleted')
        props.history.push('/')
      }
    } catch (exception) {
      notify('error', 'something is wrong with deliting of the blog')
    }
  }

  const handleLikesOf = async (blog) => {
    try {

      const changedBlog = {
        title:blog.title,
        author:blog.author,
        url:blog.url,
        likes:blog.likes +1,
        comments:blog.comments,
        user:blog.user.id
      }
      const id = blog.id

      await blogsService.update(id, changedBlog)
      const renewedBlogs = await blogsService.getAll()
      console.log('renewedBlogs', renewedBlogs)
      props.initializeBlogs(renewedBlogs)
    } catch (exception) {
      notify('error','something is wrong with updates due to likes handling')
    }
  }

  return (
    <div style = {blogStyle}>
      <Header as = 'h2' dividing>Blog App</Header>
      <Header as = 'h2' dividing>{blog.title}</Header>
      <div>{blog.author}</div>
      <div>{ blog.url}</div>

      <div>
        <p>
          &ensp;
          {blog.likes}
          &ensp;
          Likes
          &ensp;
          <Button onClick = {() => handleLikesOf(blog)}>like</Button>
        </p>
        <p>
          &ensp;
          added by
          &ensp;
          {blog.user.name} {props.user.name}
          &ensp;
        </p>
        <p>
          &ensp;
          {
            blog.user.name === props.user.name
              ? <Button  onClick = {() => deleteBlogOf(blog.id)}>remove</Button>
              :null
          }
        </p>
        <div>
          <hr />
          <CommentForm blog={blog}/>
          <hr />
          <BlogComments blog = {blog}/>
          <hr/>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  createMessage
}


// eksportoidaan suoraan connectin palauttama komponentti
const BlogSimple = withRouter(BlogSimpleNoHist)
export default connect(mapStateToProps,
  mapDispatchToProps
)(BlogSimple)

