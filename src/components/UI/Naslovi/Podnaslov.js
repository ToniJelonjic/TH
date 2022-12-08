import React from "react";
import ButtonAdd from "../Buttons/ButtonAdd";
import ButtonExport from "../Buttons/ButtonExport";
import "./Podnaslov.css";

const Podnaslov = (props) => {
  const subtitle = props.subtitle;
  return (
    <div className="subtitle">
      {props.subtitle}
      <div className="add-button-position">
        {props.subtitle === "Grupe" ||
        props.subtitle === "Podgrupe" ||
        props.subtitle === "Zaposlenici" ? (
          <ButtonAdd addButton={props.addButton} subtitle={subtitle} />
        ) : props.subtitle === "Mjerenja" && <ButtonExport />
        }
      </div>
    </div>
  );
};

export default Podnaslov;
