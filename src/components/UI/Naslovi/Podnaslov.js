import React, { useContext } from "react";
import ButtonAdd from "../Buttons/ButtonAdd";
import ButtonExport from "../Buttons/ButtonExport";
import "./Podnaslov.css";
import Context from "../../../store/Context";

const Podnaslov = (props) => {
  const { subtitle } = props;
  console.log(subtitle, "podnaslov");
  //console.log(subtitle, "podn");
  //const {title} = props
  // const { subtitle } = props;
  // const { formInfo } = props;
  // const { addButton } = props;
  return (
    <div className="subtitle">
      {subtitle}
      <div className="add-button-position">
        {subtitle === "Grupe" ||
        subtitle === "Podgrupe" ||
        subtitle === "Zaposlenici" ? (
          <ButtonAdd />
        ) : (
          subtitle === "Mjerenja" && <ButtonExport />
        )}
      </div>
    </div>
  );
};

export default Podnaslov;
