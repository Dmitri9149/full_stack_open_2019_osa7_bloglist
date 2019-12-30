import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {

  if (props.notification.message === null) {
    return null
  }

  const style = {
    color: props.notification.kind === 'error' ? 'red' : 'green',
    background: 'Orange',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <Message>
      <div style={style}>
        {props.notification.message}
      </div>
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  null
)(Notification)