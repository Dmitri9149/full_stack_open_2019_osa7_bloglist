import React from 'react'
import  { useField } from '../hooks/index'
import blogsService from '../services/blogs'
import { initializeBlogs  } from '../reducers/blogReducer'
import { createMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeUsers  } from '../reducers/usersReducer'




const CommentForm = (props) => {

  const newComment = useField('text')

  const notify = (kind , message) => {
    props.createMessage( kind, message)
    setTimeout(() => props.createMessage('success', null ), 5000)
  }


  const blog = props.blog

  const addComment = async (event) => {
    console.log('blog in addComment', blog)
    try {
      event.preventDefault()

      const changedBlog = { ...blog,
        comments: [...blog.comments, newComment.value]
      }

      const id = blog.id

      await blogsService.update(id, changedBlog)
      const renewedBlogs = await blogsService.getAll()
      console.log('renewedBlogs', renewedBlogs)
      props.initializeBlogs(renewedBlogs)
      newComment.reset()
    } catch (exception) {
      notify('error','something is wrong with adding of new comment')
    }
  }

  return(
    <div>
      <form onSubmit={addComment}>
        <div>
          comment
          <input
            {...newComment}
            name= 'newComment'
            reset = '*'
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )}


const mapDispatchToProps = {
  createMessage,
  initializeBlogs,
  initializeUsers
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(null,
  mapDispatchToProps
)(CommentForm)