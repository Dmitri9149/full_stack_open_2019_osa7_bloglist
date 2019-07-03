import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import usersService from '../services/users'



const Blog = ({ blog, user, createMessage, initializeBlogs, initializeUsers  }) => {


  const notify = (kind , message) => {
    createMessage( kind, message)
    setTimeout(() => createMessage('success', null ), 5000)
  }

  const deleteBlogOf = async () => {
    try {
      if (window.confirm(`Poistetaanko   "${blog.title}"  ?`)) {
        const res = await blogService.del(blog.id)
        console.log('after delete method', res)
        const renewedBlogs = await blogService.getAll()
        const renewedUsers = await usersService.getAllUsers()
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

      await blogService.update(id, changedBlog)
      const renewedBlogs = await blogService.getAll()
      console.log('renewedBlogs', renewedBlogs)
      initializeBlogs(renewedBlogs)
    } catch (exception) {
      notify('error','something is wrong with updates due to likes handling')
    }
  }

  const determineWhenVisible =  (blog, user) => {
    const condition = (blog.user.username === user.username)
    return { display: condition ? '' : 'none' }
  }



  const [loginVisible, setLoginVisible] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired
  }


  const showAll = { display: loginVisible ? 'none' : '' }
  const showPartly = { display: loginVisible ? '' : 'none' }

  return (
    <div style = {blogStyle}>
      <div style = {showPartly} className = 'partlyVisible' >
        <div onClick={() => setLoginVisible(false)} className = 'clickWhenPartlyVisible'>
          {blog.title} {blog.author}
        </div>
      </div>

      <div style = {showAll} className = 'allAreVisible'>
        <div onClick={() => setLoginVisible(true)} className = 'clickWhenAllAreVisible'>
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
          <div style = {determineWhenVisible(blog, user )} >
            <p>
                &ensp;
              <button  onClick = {() => deleteBlogOf(blog.id)}>
                  remove
              </button>
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}


export default Blog