import React, { useState } from 'react'
import blogService from '../services/blogs'
import usersService from '../services/users'
import { connect } from 'react-redux'




const Users = (props) => {




  const [loginVisible, setLoginVisible] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  const showAll = { display: loginVisible ? 'none' : '' }
  const showPartly = { display: loginVisible ? '' : 'none' }

  return (
    <div style = {blogStyle}>
      <div style = {showPartly}>
        <div >
          <div>
            <h2> Users </h2>
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
                  props.users.map(user =>
                    <tr key = { user.id}>
                      <td>
                        <li key ={user.id}  onClick={() => setLoginVisible(false)}>
                          {user.name}
                        </li>
                      </td>
                      <td>
                        <li key ={user.id} >
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
      </div>

      <div style = {showAll}>
        <div onClick={() => setLoginVisible(true)}>
          somethig additional happens
        </div>


      </div>

    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    blogs:state.blogs,
    users:state.users
  }
}


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  null
)(Users)