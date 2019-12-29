import React from 'react'
import  { useField } from '../hooks/index'
import { createMessage } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import { createUser } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { Form, Button, Header } from 'semantic-ui-react'

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

      await blogsService.setToken(user.token)
      props.createUser(user.username, user.name)
    } catch (exception) {
      notify('error', 'wrong username or password')
    }
  }



  return (
    <div>
      <br/>
      <Header as = 'h3' dividing>Login</Header>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <input {...username} reset = ''/>
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input {...password} reset =''/>
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
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