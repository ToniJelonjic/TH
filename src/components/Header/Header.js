import React, { useState } from "react";
import "./Header.css";
import user from "../../images/user.jpg";

const Header = (props) => {

  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
  }

  return (
    <div className="header-style">
      <div onClick={handleClick} className="user-img-div">
        <img className="user-img-style" src={user}></img>
      </div>
    </div>
  );
};

export default Header;
