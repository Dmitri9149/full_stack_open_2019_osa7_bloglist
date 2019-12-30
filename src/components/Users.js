import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Header } from 'semantic-ui-react'
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
          <Table striped celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
              blogs created
                </Table.Cell>
              </Table.Row>
              {props.users.map(user =>
                <Table.Row key = { user.id}>
                  <Table.Cell>
                    <li key ={user.id}  onClick={() =>
                    {
                      props.setUserOfInterest(user)
                      return(setLoginVisible(false))
                    }
                    }>
                      {user.name}
                    </li>
                  </Table.Cell>
                  <Table.Cell>
                    <li key ={user.id} >
                      {user.blogs.length}
                    </li>
                  </Table.Cell>
                </Table.Row>
              )
              }
            </Table.Body>
          </Table>
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