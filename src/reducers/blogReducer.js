/* eslint-disable no-case-declarations */
const blogReducer = (state = [], action) => {
  console.log('ACTION:', action)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    const sortBlogs = (blogs) => blogs.sort((b,a) => (a.likes-b.likes))
    return sortBlogs(action.data)

  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}


export default blogReducer