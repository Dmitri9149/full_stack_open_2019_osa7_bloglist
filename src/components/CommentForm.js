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
      event.prevent.default()

      const changedBlog = {
        title:blog.title,
        author:blog.author,
        url:blog.url,
        likes:blog.likes,
        comments:blog.comments.concat({ content:newComment.value }),
        user:blog.user.id
      }
      const id = blog.id

      await blogsService.update(id, changedBlog)
      const renewedBlogs = await blogsService.getAll()
      console.log('renewedBlogs', renewedBlogs)
      initializeBlogs(renewedBlogs)
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

const mapStateToProps = (state, ownProps) => {
  return {
    blog:ownProps.blog
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