import React, { useContext } from "react";
import ButtonAdd from "../Buttons/ButtonAdd";
import ButtonExport from "../Buttons/ButtonExport";
import "./Podnaslov.css";
import Context from "../../../store/Context";

const Podnaslov = (props) => {
  const { title, subtitle, formInfo } = useContext(Context);
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
          <ButtonAdd
            addButton={props.addButton}
            title={title}
            subtitle={subtitle}
            formInfo={formInfo}
          />
        ) : (
          subtitle === "Mjerenja" && <ButtonExport />
        )}
      </div>
    </div>
  );
};

export default Podnaslov;
