import React, { useState, useEffect } from "react";
import "./Header.css";
import user from "../../images/user.jpg";
import Hamburger from "../UI/Hamburger";
import UserCard from "../UI/UserCard";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id !== "toggle-user-card") {
        setIsUserClicked(false);
      } else if (event.target.id !== "toggle-burger") {
        setIsBurgerClicked(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
    if (isUserClicked) {
      setIsBurgerClicked(false);
    }
    console.log(isUserClicked, "user");
  };

  const handleBurgerClick = () => {
    if (window.innerWidth <= 1000) {
      setIsBurgerClicked(!isBurgerClicked);
    }
    if (isBurgerClicked) {
      setIsUserClicked(false);
    }
    console.log(isBurgerClicked, "burger");
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1000) {
        setIsBurgerClicked(false);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="header-style">
        <div id="toggle-burger" className="burger" onClick={handleBurgerClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div
          id="toggle-user-card"
          onClick={handleUserClick}
          className="user-img-div"
        >
          <img
            id="toggle-user-card"
            className="user-img-style"
            src={user}
          ></img>
        </div>
      </div>
      {isUserClicked ? <UserCard setIsUserClicked={setIsUserClicked} /> : null}
      <Dropdown
        isClicked={isBurgerClicked}
        handleBurgerClick={handleBurgerClick}
      />
    </>
  );
};

export default Header;
