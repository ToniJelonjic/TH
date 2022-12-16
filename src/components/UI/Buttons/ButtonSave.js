import React from "react";
import "./ButtonSave.css";

const ButtonSave = (props) => {
  return (
    <div className="row save-discard-div">
      <div className="col-lg-2"></div>
      <div className="col-lg-6">
        <button className="button-save-style">Spremi</button>
        <button className="button-discard-style">Odbaci</button>
      </div>
    </div>
  );
};

export default ButtonSave;
