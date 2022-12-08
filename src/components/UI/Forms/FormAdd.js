import React from 'react'
import Dropdown from '../../Dropdown/Dropdown'
import Footer from '../../Footer/Footer'
import Header from '../../Header/Header'
import Naslov from '../Naslovi/Naslov'
import Podnaslov from '../Naslovi/Podnaslov'
import Wrapper from '../Wrapper'
import './FormAdd.css'

const FormAdd = (props) => {
  console.log(props, "asfasas")
    const title = props.title;
    const subtitle = props.subtitle;



  return (
    <div>
        <Header />
        <Dropdown />
        <Wrapper>
            <Naslov title={title} />
            <Podnaslov subtitle={subtitle} />

        </Wrapper>
        <Footer /> 
    </div>
  )
}

export default FormAdd