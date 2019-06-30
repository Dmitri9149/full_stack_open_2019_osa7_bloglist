
const initialState = { kind: 'success', message:null }

const notificationReducer = (state = initialState, action) => {
  console.log('state in notificationReducer ', state)
  console.log('action notificationREducer', action)

  switch (action.type) {
  case 'SET_MESSAGE':
    return action.data
  default:
    return state
  }
}


export const  createMessage = (kind, message) => {
  return {
    type: 'SET_MESSAGE',
    data:{ kind:kind, message:message }
  }
}



export default notificationReducer