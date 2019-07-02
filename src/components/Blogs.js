import React from 'react'
import Blog from './Blog'


const Blogs = ({ store }) => {
  const blogs = store.getState().blogs
  const user = store.getState().user

  console.log('Blogs', blogs)
  console.log('Blogs, user', user)
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          store = {store}
          blog={blog}
          user = {user}
        />
      )}
    </div>
  )


}

export default Blogs