import React from 'react'
import  { useField } from '../hooks/index'
import { createMessage } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createUser } from '../reducers/userReducer'
import { connect } from 'react-redux'

const LoginForm = (props) => {

  const username = useField('text')
  const password = useField('password')

  const notify = (kind , message) => {
    props.createMessage( kind, message)
    setTimeout(() => props.createMessage('success', null ), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginService.login({
        username:username.value, password:password.value
      })

      await blogService.setToken(user.token)
      props.createUser(user.username, user.name)
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
            reset = ''
          />
        </div>
        <div>
          salasana
          <input
            {...password}
            reset =''
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createMessage,
  createUser
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)