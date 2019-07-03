/* eslint-disable no-case-declarations */
const usersReducer = (state = [], action) => {
  console.log('ACTION:', action)
  switch (action.type) {
  case 'INIT_USERS':
    return action.data

  default:
    return state
  }
}

export const initializeBlogs = (users) => {
  return {
    type: 'INIT_USERS',
    data: users
  }
}



export default usersReducer