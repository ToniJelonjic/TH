import React from "react";
import ButtonAdd from "../Buttons/ButtonAdd";
import ButtonExport from "../Buttons/ButtonExport";
import "./Podnaslov.css";

const Podnaslov = (props) => {
  const {title} = props
  const {subtitle} = props
  const {formInfo} = props
  const {addButton} = props
  return (
    <div className="subtitle">
      {props.subtitle}
      <div className="add-button-position">
        {props.subtitle === "Grupe" ||
        props.subtitle === "Podgrupe" ||
        props.subtitle === "Zaposlenici" ? (
          <ButtonAdd addButton={addButton} title={title} subtitle={subtitle} formInfo={formInfo} />
        ) : props.subtitle === "Mjerenja" && <ButtonExport />
        }
      </div>
    </div>
  );
};

export default Podnaslov;
