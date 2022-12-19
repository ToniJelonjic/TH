import React, { useContext, useState } from 'react'
import './Hamburger.css'
import AuthContext from '../../store/auth-context'

const Hamburger = () => {
  const {isOpen, handleIsOpen} = useContext(AuthContext)
  //console.log(isOpen)
  const [a, setA] = useState(false)
  const handleA = () => {
    setA(!a)
    console.log(a)
  }
  

  return (
    <div className='burger' onClick={handleA}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default Hamburger