import React from 'react'
import './ButtonLogOut.css'
import { Link } from 'react-router-dom'

const ButtonLogOut = () => {
  return (
    <Link className="link-profile-style" to={`/prijava`}>
      <button className='logout-button-style'>Odjava</button>
    </Link>
    
  )
}

export default ButtonLogOut