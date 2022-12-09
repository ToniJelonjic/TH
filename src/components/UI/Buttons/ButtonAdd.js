import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ButtonAdd.css";

const ButtonAdd = (props) => {
  const {title} = props
  const {subtitle} = props
  const {formInfo} = props
  const [slag, setSlag] = useState('')
  useEffect(() => {
    setSlag(subtitle.toLowerCase())
  }, [])

  return (
    <Link to={`/${slag}/dodaj`} className="link-style" state={{slag:{slag}, title:{title}, subtitle:{subtitle}, formInfo:{formInfo}}} >
      <button className="add-button-style">{props.addButton}</button>
    </Link>
  );
};

export default ButtonAdd;
