import React from 'react'
import  { useField } from '../hooks/index'
import blogService from '../services/blogs'
import { initializeBlogs  } from '../reducers/blogReducer'
import { createMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'





const BlogForm = (props) => {

  const newTitle = useField('text')
  const newUrl = useField('text')
  const newAuthor = useField('text')

  const notify = (kind , message) => {
    props.createMessage( kind, message)
    setTimeout(() => props.createMessage('success', null ), 5000)
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
      props.initializeBlogs(renewedBlogs)
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


const mapDispatchToProps = {
  createMessage,
  initializeBlogs
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  null,
  mapDispatchToProps
)(BlogForm)