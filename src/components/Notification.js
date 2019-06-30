import React from 'react'

const Notification = (props) => {
  const { notification, blogs } = props.store.getState()
  const store = props.store.getState()
  console.log('STORE!!!!!!!', notification)
  if (notification.message === null) {
    return null
  }

  const style = {
    color: store.kind === 'error' ? 'red' : 'green',
    background: 'Orange',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification