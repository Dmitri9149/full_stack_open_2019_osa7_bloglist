

const userReducer = (state = null, action) => {
  console.log('state in userReducer ', state)
  console.log('action in userReducer', action)

  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'SET_NULL':
    return action.data

  default:
    return state
  }
}


export const  createUser = (username, name) => {
  return {
    type: 'SET_USER',
    data:{ username:username, name:name }
  }
}

export const  setNull = () => {
  return {
    type: 'SET_NULL',
    data:null
  }
}



export default userReducer