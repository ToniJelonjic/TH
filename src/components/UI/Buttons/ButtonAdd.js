import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import "./ButtonAdd.css";

const ButtonAdd = (props) => {
  const { subtitle, addButton, handleIsAddClicked } = useContext(Context);

  return (
    <>
      {subtitle === "Grupe" ? (
        <Link to={`/grupe/dodaj`} className="link-style">
          <button onClick={handleIsAddClicked} className="add-button-style">
            {addButton}
          </button>
        </Link>
      ) : subtitle === "Podgrupe" ? (
        <Link to={`/podgrupe/dodaj`} className="link-style">
          <button onClick={handleIsAddClicked} className="add-button-style">
            {addButton}
          </button>
        </Link>
      ) : (
        <Link to={`/zaposlenici/dodaj`} className="link-style">
          <button onClick={handleIsAddClicked} className="add-button-style">
            {addButton}
          </button>
        </Link>
      )}
    </>
  );
};

export default ButtonAdd;
