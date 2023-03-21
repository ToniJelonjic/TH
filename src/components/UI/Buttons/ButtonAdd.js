import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import "./ButtonAdd.css";

const ButtonAdd = () => {
  const { subtitle, addButton } = useContext(Context);
  const role = JSON.parse(localStorage.getItem("role"));

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
      ) : subtitle === "Zaposlenici" ? (
        <Link to={`/zaposlenici/dodaj`} className="link-style">
          <button className="add-button-style">{addButton}</button>
        </Link>
      ) : subtitle === "Korisnici" ? (
        <Link to={`/korisnici/dodaj`} className="link-style">
          <button className="add-button-style">{addButton}</button>
        </Link>
      ) : subtitle === "Klijenti" ? (
        <Link to={`/klijenti/dodaj`} className="link-style">
          <button className="add-button-style">{addButton}</button>
        </Link>
      ) : subtitle === "Uređaji" && role === 3 ? (
        <Link to={`/uređaji/dodaj`} className="link-style">
          <button className="add-button-style">{addButton}</button>
        </Link>
      ) : null}
    </>
  );
};

export default ButtonAdd;
