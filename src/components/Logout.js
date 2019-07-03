import React from 'react'
import  { useField } from '../hooks/index'
import { setNull } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { connect } from 'react-redux'



const Logout = (props) => {

  const username = useField('text')
  const password = useField('password')
  const user = props.user
  const users = props.users

  console.log('logout users', users)

  return(

    <div>
      <p>{user.name} logged in</p>
      <button onClick = {() => {
        props.setNull()
        username.reset()
        password.reset()
        blogService.setToken(null)
      }}
      >
        logout
      </button>
      <div>
        <h2>
          Users
        </h2>

        <table>
          <tbody>
            <tr>
              <th>
              </th>
              <th>
              blogs created
              </th>
            </tr>
            {
              users.map(user =>
                <tr key = { user.id}>
                  <td>
                    <li key ={user.id}>
                      {user.name}
                    </li>
                  </td>
                  <td>
                    <li key ={user.id}>
                      {user.blogs.length}
                    </li>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>




      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs:state.blogs,
    users:state.users
  }
}


const mapDispatchToProps = {
  setNull
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)