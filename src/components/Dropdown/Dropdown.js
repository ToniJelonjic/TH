import React, { useState } from "react";
import "./Dropdown.css";
import Naslovnica from "./Naslovnica";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dropdown = (props) => {
  const [isActive, setIsActive] = useState(false)

  const handleIsActive = () => {
    setIsActive(true)
  }


  return (
    <div className="dropdown-style">
      <ul>
        <Link to="/naslovnica" onClick={handleIsActive} className="link-style">
          <li className="">
          {/* <i class="fa-brands fa-facebook-f"></i> */}
            Naslovnica
            </li>
        </Link>

        <Link to="/uređaji" className="link-style">
          <li>Uređaji</li>
        </Link>

        <Link to="/mjerenja" className="link-style">
          <li>Mjerenja</li>
        </Link>

        <Link to="/grupe" className="link-style">
          <li>Grupe</li>
        </Link>

        <Link to="/podgrupe" className="link-style">
          <li>Podgrupe</li>
        </Link>

        <Link to="/zaposlenici" className="link-style">
          <li>Zaposlenici</li>
        </Link>
      </ul>
    </div>
  );
};

export default Dropdown;
