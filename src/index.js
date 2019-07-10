import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import userOfInterestReducer from './reducers/userOfInterestReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user:userReducer,
  users:usersReducer,
  userOfInterest:userOfInterestReducer
})

const store = createStore(reducer)

console.log('store created')




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)