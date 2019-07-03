import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import blogService from './services/blogs'
import { Provider } from 'react-redux'

import blogReducer, { initializeBlogs } from './reducers/blogReducer'
import usersReducer, { initializeUsers } from './reducers/usersReducer'
import userReducer from './reducers/userReducer'
import usersService from './services/users'


const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user:userReducer,
  users:usersReducer
})

const store = createStore(reducer)

console.log('store created')


blogService.getAll().then(blogs => {
  console.log('blogService.getAll()')
  store.dispatch(initializeBlogs(blogs))}
)

usersService.getAllUsers().then(users => {
  console.log('usersService.getAllUsers()', users)
  store.dispatch(initializeUsers(users))}
)



const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)