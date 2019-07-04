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

export const initializeUsers = (user) => {
  return {
    type: 'INIT_USERS',
    data: user
  }
}



export default usersReducer