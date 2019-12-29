import React from 'react'
import blogsService from '../services/blogs'
import usersService from '../services/users'
import CommentForm from './CommentForm'



const BlogSimple = ({ blog, createMessage, initializeBlogs, initializeUsers  }) => {

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
    createMessage( kind, message)
    setTimeout(() => createMessage('success', null ), 5000)
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
        initializeBlogs(renewedBlogs)
        initializeUsers(renewedUsers)
        notify('success','the blog is deleted')
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
      initializeBlogs(renewedBlogs)
    } catch (exception) {
      notify('error','something is wrong with updates due to likes handling')
    }
  }

  return (
    <div style = {blogStyle}>
      <h2>{blog.title}</h2>
      <div>{blog.author}</div>
      <div>{ blog.url}</div>

      <div>
        <p>
              &ensp;
          {blog.likes}
              &ensp;
              likes
              &ensp;
          <button onClick = {() => handleLikesOf(blog)}>like</button>
        </p>
        <p>
              &ensp;
              added by
              &ensp;
          {blog.user.name}
              &ensp;
        </p>
        <p>
              &ensp;
          <button  onClick = {() => deleteBlogOf(blog.id)}>remove</button>
        </p>
        <ul>
          {blog.comments.map(com => <li key = {com.id}>{com}</li>)}
        </ul>
        <hr />
        <CommentForm blog={blog}/>
        <hr />
      </div>

    </div>
  )
}


export default BlogSimple