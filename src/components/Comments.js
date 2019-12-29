import React from 'react';
//import Heading from './Heading';
//import { ListGroup } from 'react-bootstrap'

const Comments = props => {
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {
          props.blog.comments.length
            ? props.blog.comments.map((comment, i) => <li key={`${i}-comment`}>{comment}</li>)
            : <li>No Comments Yet, Leave One!</li>
        }
      </ul>
    </div>
  )
}

export default Comments