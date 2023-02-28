import React /*{ useContext, useState }*/ from "react";
import "./Hamburger.css";
//import AuthContext from "../../store/Context";

const Hamburger = (props) => {
  const { onBurger } = props;

  return (
    <div className="burger" onClick={onBurger}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Hamburger;
