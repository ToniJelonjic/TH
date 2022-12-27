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

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="dropdown-style">
      <nav>
        <NavLink to="/naslovnica" className="link-style">
          <FontAwesomeIcon className="icons-style" icon={faChartLine} />
          Naslovnica
        </NavLink>

        <NavLink to="/uređaji" className="link-style">
          <FontAwesomeIcon className="icons-style" icon={faComputer} />
          Uređaji
        </NavLink>

        <NavLink to="/mjerenja" className="link-style">
          <FontAwesomeIcon className="icons-style" icon={faGaugeHigh} />
          Mjerenja
        </NavLink>

        <NavLink to="/grupe" className="link-style">
          <FontAwesomeIcon className="icons-style" icon={faGripHorizontal} />
          Grupe
        </NavLink>

        <NavLink to="/podgrupe" className="link-style">
          <FontAwesomeIcon className="icons-style" icon={faTableList} />
          Podgrupe
        </NavLink>

        <NavLink to="/zaposlenici" className="link-style">
          <FontAwesomeIcon className="icons-style" icon={faUserTie} />
          Zaposlenici
        </NavLink>
      </nav>
    </div>
  );
};

export default Dropdown;
