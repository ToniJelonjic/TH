import React from "react";
import ButtonAdd from "../Buttons/ButtonAdd";
import "./Podnaslov.css";

const Podnaslov = ({ subtitle }) => {
  return (
    <div className="subtitle">
      {subtitle}
      <div className="add-button-position">
        {subtitle === "Grupe" ||
        subtitle === "Podgrupe" ||
        subtitle === "Zaposlenici" ||
        subtitle === "Korisnički računi" ||
        subtitle === "Klijenti" ||
        subtitle === "Uređaji" ? (
          <ButtonAdd />
        ) : null}
      </div>
    </div>
  );
};

export default Podnaslov;
