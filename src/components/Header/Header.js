import React, { useState, useEffect } from "react";
import "./Header.css";
import user from "../../images/user.jpg";
import Hamburger from "../UI/Hamburger";

const Header = ({
  onUserClick,
  onBurgerClick,
  setIsUserClicked,
  setIsBurgerClicked,
}) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id !== "toggle-user-card") {
        console.log("bla");
        setIsUserClicked(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="header-style">
      <div className="burger" onClick={onBurgerClick}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="toggle-user-card" onClick={onUserClick} className="user-img-div">
        <img id="toggle-user-card" className="user-img-style" src={user}></img>
      </div>
    </div>
  );
};

export default Header;
