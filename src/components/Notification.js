import React from 'react'

const Notification = (props) => {
  const store = props.store
  console.log('STORE!!!!!!!', store.getState())
  if (store.getState().message === null) {
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
      {store.getState().message}
    </div>
  )
}

export default Notification