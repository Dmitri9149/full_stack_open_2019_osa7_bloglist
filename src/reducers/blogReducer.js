/* eslint-disable no-case-declarations */
const blogReducer = (state = [], action) => {
  console.log('ACTION:', action)

  const sort = (state) => state.sort((b,a) => (a.likes-b.likes))
  switch (action.type) {
  case 'INIT_BLOGS':
    return sort(action.data)
  case 'CREATE_COMMENT':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)


  default:
    return state

  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const createComment = (blog) => {
  return {
    type:'CREATE_COMMENT',
    data:blog
  }
}



export default blogReducer