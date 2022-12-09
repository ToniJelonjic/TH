import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Dropdown from '../../Dropdown/Dropdown'
import Footer from '../../Footer/Footer'
import Header from '../../Header/Header'
import Naslov from '../Naslovi/Naslov'
import Podnaslov from '../Naslovi/Podnaslov'
import Wrapper from '../Wrapper'
import './FormAdd.css'

const FormAdd = (props) => {
  const location = useLocation()
  const {title} = location.state.title
  const {subtitle} = location.state.subtitle
  const {slag} = location.state.slag
  const {formInfo} = location.state.formInfo

  useEffect(()=> {
  }, [])


  return (
    <div>
        <Header />
        <Dropdown />
        <Wrapper>
            <Naslov title={title} />
            <Podnaslov subtitle={formInfo.subtitle} />

        </Wrapper>
        <Footer /> 
    </div>
  )
}

export default FormAdd