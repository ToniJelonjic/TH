import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ButtonAdd.css";

const ButtonAdd = (props) => {

  const [slag, setSlag] = useState('')
  useEffect(() => {
    setSlag(props.subtitle.toLowerCase())
    //console.log(props.subtitle)
  }, [])

  return (
    <Link to={`/${slag}/dodaj`} className="link-style">
      <button className="add-button-style">{props.addButton}</button>
    </Link>
  );
};

export default ButtonAdd;
