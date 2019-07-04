const userOfInterestReducer = (state = null, action) => {

  switch (action.type) {
  case 'SET_USEROFINTEREST':
    return action.data
  case 'SET_NULLUSER':
    return action.data

  default:
    return state
  }
}


export const  setUserOfInterest = (userOfInterest) => {
  return {
    type: 'SET_USEROFINTEREST',
    data:userOfInterest
  }
}

export const  setNullOfInterest = () => {
  return {
    type: 'SET_NULLUSER',
    data:null
  }
}



export default userOfInterestReducer