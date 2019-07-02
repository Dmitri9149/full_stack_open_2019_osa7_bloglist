import React from 'react'
import  { useField } from '../hooks/index'
import { createMessage } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createUser } from '../reducers/userReducer'

const LoginForm = (props) => {

  const store = props.store

  const username = useField('text')
  const password = useField('password')

  const notify = (kind , message) => {
    store.dispatch(createMessage( kind, message))
    setTimeout(() => store.dispatch(createMessage('success', null )), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginService.login({
        username:username.value, password:password.value
      })

      await blogService.setToken(user.token)
      store.dispatch(createUser(user.username, user.name))
    } catch (exception) {
      notify('error', 'wrong username or password')
    }
  }



  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input
            {...username}
            reset = '*'
          />
        </div>
        <div>
          salasana
          <input
            {...password}
            reset ='*'
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

}

export default LoginForm