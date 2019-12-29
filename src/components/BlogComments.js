import React from 'react'

const BlogComments = props => {
  return (
    <div>
      <h2>BlogComments</h2>
      <ul>
        {
          props.blog.comments.length
            ? props.blog.comments.map((comment, i) => <li key={`${i}-comment`}>{comment}</li>)
            : <li>Still no comments!</li>
        }
      </ul>
    </div>
  )
}

export default BlogComments