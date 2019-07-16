import React from 'react'
import  { useField } from '../hooks/index'
import blogsService from '../services/blogs'
import { initializeBlogs  } from '../reducers/blogReducer'
import { createMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeUsers  } from '../reducers/usersReducer'
import usersService from '../services/users'
import commentsService from '../services/comments'





const CommentForm = (props) => {

  const newComment = useField('text')

  const notify = (kind , message) => {
    props.createMessage( kind, message)
    setTimeout(() => props.createMessage('success', null ), 5000)
  }

  const addComment = async (event) => {
    try {
      event.preventDefault()

      const commentObject = {
        content:newComment.value
      }
      console.log('we are in addComment')
      console.log('id + commentObject', props.id, commentObject)
      await commentsService.create(props.id, commentObject)
      console.log('await comment Service')
      const renewedBlogs = await blogsService.getAll()
      const renewedUsers = await usersService.getAll()
      const renewedComments = await commentsService.getAll(props.id)
      console.log('renewedComments', renewedComments)
      props.initializeBlogs(renewedBlogs)
      props.initializeUsers(renewedUsers)
      notify('success, a new comment is added')
      newComment.reset()
    } catch(exception) {
      notify('error','some problems with comment addition')
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

const mapStateToProps = (state, ownProps) => {
  return {
    id:ownProps.id
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
)(CommentForm)