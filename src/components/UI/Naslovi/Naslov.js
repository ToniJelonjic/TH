import React from 'react'
import './Naslov.css'

const Naslov = (props) => {
  return (
    <div className='title'>
        <h2>{props.title}</h2>
    </div>
  )
}

export default Naslov