import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUserOfInterest, setNullOfInterest   } from '../reducers/userOfInterestReducer'




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
                      <li key ={user.id}  onClick={() =>
                      {
                        props.setUserOfInterest(user)
                        return(setLoginVisible(false))
                      }
                      }>
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

      <div style = {showAll}>
        <div onClick={() =>
        {
          props.setNullOfInterest()
          return(setLoginVisible(true))
        }
        }>
          <h2>
            {console.log('Users user ', props.userOfInterest)}
            {props.userOfInterest === null ? '' : props.userOfInterest.name}
          </h2>
          <h4>
            added blogs
          </h4>
          {
            props.userOfInterest === null
              ? ''
              :props.userOfInterest.blogs.map(
                blog => <li key = {blog.id}>
                  {blog.title}
                </li>
              )
          }
        </div>
      </div>

    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    blogs:state.blogs,
    userOfInterest:state.userOfInterest,
    users:state.users
  }
}

const mapDispatchToProps = {
  setUserOfInterest,
  setNullOfInterest
}


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)