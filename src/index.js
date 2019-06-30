import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import blogService from './services/blogs'

import blogReducer, { initializeBlogs } from './reducers/blogReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
})

const store = createStore(reducer)

blogService.getAll().then(blogs =>
  store.dispatch(initializeBlogs(blogs))
)


const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)