import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Location = () => {
  return (
    <div className='w-4 h-4'><FontAwesomeIcon icon={faLocationDot} style={{color: "red",}} /></div>
  )
}

export default Location