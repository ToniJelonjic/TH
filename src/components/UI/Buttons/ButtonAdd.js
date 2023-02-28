import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import "./ButtonAdd.css";

const ButtonAdd = () => {
  const { subtitle, addButton } = useContext(Context);

  return (
    <>
      {subtitle === "Grupe" ? (
        <Link to={`/grupe/dodaj`} className="link-style">
          <button className="add-button-style">{addButton}</button>
        </Link>
      ) : subtitle === "Podgrupe" ? (
        <Link to={`/podgrupe/dodaj`} className="link-style">
          <button className="add-button-style">{addButton}</button>
        </Link>
      ) : (
        <Link to={`/zaposlenici/dodaj`} className="link-style">
          <button className="add-button-style">{addButton}</button>
        </Link>
      )}
    </>
  );
};

export default ButtonAdd;
