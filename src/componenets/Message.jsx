import React from 'react'

const Message = ({children }) => {
  return (
  <div>
    <span className="font-medium">{children}</span>
  </div>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
