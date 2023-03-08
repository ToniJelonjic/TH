import React, { useState, useEffect } from "react";
import "./Header.css";
import user from "../../images/user.jpg";
import Hamburger from "../UI/Hamburger";

const Header = ({ onUserClick, onBurgerClick }) => {
  return (
    <div className="header-style">
      <div className="burger" onClick={onBurgerClick}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div onClick={onUserClick} className="user-img-div">
        <img className="user-img-style" src={user}></img>
      </div>
    </div>
  );
};

export default Header;
