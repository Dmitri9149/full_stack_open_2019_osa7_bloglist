
const initialState ={ type: 'success',message:null }

const notificationReducer = (state = initialState, action) => {
  console.log('state filter ', state)
  console.log('action filter', action)

  switch (action.type) {
  case 'SET_MESSAGE':
    return action.message
  default:
    return state
  }
}


export const  createMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}



export default notificationReducer