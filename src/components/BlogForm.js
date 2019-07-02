import React from 'react'
import  { useField } from '../hooks/index'
import blogService from '../services/blogs'
import { initializeBlogs  } from '../reducers/blogReducer'
import { createMessage } from '../reducers/notificationReducer'




const BlogForm = (props) => {

  const store = props.store

  const newTitle = useField('text')
  const newUrl = useField('text')
  const newAuthor = useField('text')

  const notify = (kind , message) => {
    store.dispatch(createMessage( kind, message))
    setTimeout(() => store.dispatch(createMessage('success', null )), 5000)
  }

  const addBlog = async (event) => {
    try {
      event.preventDefault()

      const blogObject = {
        author: newAuthor.value,
        title: newTitle.value,
        url:newUrl.value,
        likes:0
      }

      await blogService.create(blogObject)
      const renewedBlogs = await blogService.getAll()
      store.dispatch(initializeBlogs(renewedBlogs))
      notify('success', `a new blog ${newTitle.value} by ${newAuthor.value} added`)
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    } catch(exception) {
      notify('error','some problems with blog addition')
    }
  }


  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            {...newTitle}
            name= 'newtitle'
            reset = '*'
          />
        </div>
        <div>
          author
          <input
            {...newAuthor}
            reset = '*'
          />
        </div>
        <div>
          url
          <input
            {...newUrl}
            reset ='*'
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )}
export default BlogForm