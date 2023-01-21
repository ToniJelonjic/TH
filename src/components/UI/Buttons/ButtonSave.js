import React, { useContext } from "react";
import "./ButtonSave.css";
import Context from "../../../store/Context";

const ButtonSave = () => {
  const { onSave } = useContext(Context);
  const handleDiscard = () => {
    console.log("works");
  };

  return (
    <div className="row save-discard-div">
      <div className="col-lg-2"></div>
      <div className="col-lg-6">
        <button onClick={onSave} className="button-save-style">
          Spremi
        </button>
        <button onClick={handleDiscard} className="button-discard-style">
          Odbaci
        </button>
      </div>
    </div>
  );
};

export default ButtonSave;
