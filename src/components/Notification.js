import React from 'react'
import { connect } from 'react-redux'

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
    <div style={style}>
      {props.notification.message}
    </div>
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