import React from "react";
import "./ButtonSearch.css";

const Button = (props) => {
  return (
    <span className="span-button-style">
      <button onClick={props.handleActivityFilter} className="button-style">
        Pretraži
      </button>
    </span>
  );
};

export default Button;
