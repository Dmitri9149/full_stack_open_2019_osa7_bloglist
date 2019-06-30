import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import { createMessage } from './reducers/notificationReducer'
import { createStore } from 'redux'

const store = createStore(notificationReducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)