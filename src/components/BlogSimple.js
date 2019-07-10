import React from 'react'
import PropTypes from 'prop-types'
import blogsService from '../services/blogs'
import usersService from '../services/users'



const BlogSimple = ({ blog, createMessage, initializeBlogs, initializeUsers  }) => {

  if(blog === undefined) {
    return (null)
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
    <div>
      <div>
        {blog.title} {blog.author}
      </div>

      <div>
        { blog.url}
      </div>

      <div>
        <p>
              &ensp;
          {blog.likes}
              &ensp;
              likes
              &ensp;
          <button onClick = {() => handleLikesOf(blog)}>
                like
          </button>
        </p>
        <p>
              &ensp;
              added by
              &ensp;
          {blog.user.name}
              &ensp;
        </p>
        <div>
          <p>
                &ensp;
            <button  onClick = {() => deleteBlogOf(blog.id)}>
                  remove
            </button>
          </p>
        </div>
      </div>

    </div>
  )
}


export default BlogSimple