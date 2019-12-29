import React from 'react'
import  { useField } from '../hooks/index'
import blogsService from '../services/blogs'
import { initializeBlogs  } from '../reducers/blogReducer'
import { createMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeUsers  } from '../reducers/usersReducer'
import usersService from '../services/users'
import { Form, Button } from 'semantic-ui-react'





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

      await blogsService.create(blogObject)
      const renewedBlogs = await blogsService.getAll()
      const renewedUsers = await usersService.getAll()
      props.initializeBlogs(renewedBlogs)
      props.initializeUsers(renewedUsers)
      notify('success', `a new blog ${newTitle.value} by ${newAuthor.value} added`)
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    } catch(exception) {
      notify('error','some problems with blog addition')
    }
  }

  return(
    <Form onSubmit={addBlog}>
      <Form.Field>
        <label>title</label>
        <input {...newTitle} name= 'newtitle' reset = '*' />
      </Form.Field>
      <Form.Field>
        <label>author</label>
        <input {...newAuthor} reset = '*' />
      </Form.Field>
      <Form.Field>
        <label>url</label>
        <input {...newUrl} reset ='*' />
      </Form.Field>
      <Button type="submit">create</Button>
    </Form>
  )}


const mapDispatchToProps = {
  createMessage,
  initializeBlogs,
  initializeUsers
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  null,
  mapDispatchToProps
)(BlogForm)