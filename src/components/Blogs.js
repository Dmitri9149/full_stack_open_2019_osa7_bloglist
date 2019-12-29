import React from 'react'
import { connect } from 'react-redux'
import { initializeBlogs  } from '../reducers/blogReducer'
import { initializeUsers  } from '../reducers/usersReducer'
import { createMessage } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Table, Header } from 'semantic-ui-react'

const Blogs = (props) => {

  const blogs = props.blogs
  const user = props.user
  console.log('Blogs', blogs)
  console.log('Blogs, user', user)
  return (
    <div>
      <Header as = 'h3' dividing>Blogs</Header>
      <Table striped celled>
        <Table.Body>
          {blogs.map(blog =>
            <Table.Row key = {blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {blog.author}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
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
)(Blogs)

