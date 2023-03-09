import React, { useEffect, useState } from "react";
import "./Hamburger.css";
//import AuthContext from "../../store/Context";

const Hamburger = ({ onBurgerClick, setIsBurgerClicked }) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id !== "toggle-burger") {
        console.log("burger");
        setIsBurgerClicked(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div id="toggle-burger" className="burger" onClick={onBurgerClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Hamburger;
