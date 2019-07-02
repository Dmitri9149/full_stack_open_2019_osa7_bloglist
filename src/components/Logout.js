import React from 'react'
import  { useField } from '../hooks/index'
import { setNull } from '../reducers/userReducer'
import blogService from '../services/blogs'

const Logout = ({ store }) => {

  const username = useField('text')
  const password = useField('password')
  const user = store.getState().user

  return(

    <div>
      <p>{user.name} logged in</p>
      <button onClick = {() => {
        store.dispatch(setNull())
        username.reset()
        password.reset()
        blogService.setToken(null)
      }}
      >
        logout
      </button>
    </div>
  )
}

export default Logout