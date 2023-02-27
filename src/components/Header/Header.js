import React, { useState, useEffect } from "react";
import "./Header.css";
import user from "../../images/user.jpg";
import Hamburger from "../UI/Hamburger";

const Header = ({ onClick, onBurger }) => {
  return (
    <div className="header-style">
      <Hamburger onBurger={onBurger} />
      <div onClick={onClick} className="user-img-div">
        <img className="user-img-style" src={user}></img>
      </div>
    </div>
  );
};

export default Header;
