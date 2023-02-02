import React, { useState, useEffect } from "react";
import "./Dropdown.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faGaugeHigh } from "@fortawesome/free-solid-svg-icons";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

const Dropdown = (props) => {
  const { isClicked, handleBurgerClick } = props;

  return (
    <div
      className={`${isClicked ? "dropdown-style-mobile" : "dropdown-style"}`}
    >
      <nav>
        <NavLink
          onClick={handleBurgerClick}
          to="/naslovnica"
          className="link-style"
        >
          <FontAwesomeIcon className="icons-style" icon={faChartLine} />
          Naslovnica
        </NavLink>

        <NavLink
          onClick={handleBurgerClick}
          to="/uređaji"
          className="link-style"
        >
          <FontAwesomeIcon className="icons-style" icon={faComputer} />
          Uređaji
        </NavLink>

        <NavLink
          onClick={handleBurgerClick}
          to="/mjerenja"
          className="link-style"
        >
          <FontAwesomeIcon className="icons-style" icon={faGaugeHigh} />
          Mjerenja
        </NavLink>

        <NavLink onClick={handleBurgerClick} to="/grupe" className="link-style">
          <FontAwesomeIcon className="icons-style" icon={faGripHorizontal} />
          Grupe
        </NavLink>

        <NavLink
          onClick={handleBurgerClick}
          to="/podgrupe"
          className="link-style"
        >
          <FontAwesomeIcon className="icons-style" icon={faTableList} />
          Podgrupe
        </NavLink>

        <NavLink
          onClick={handleBurgerClick}
          to="/zaposlenici"
          className="link-style"
        >
          <FontAwesomeIcon className="icons-style" icon={faUserTie} />
          Zaposlenici
        </NavLink>
      </nav>
    </div>
  );
};

export default Dropdown;
