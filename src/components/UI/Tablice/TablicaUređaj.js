import React from "react";
import "./TablicaUređaj.css";

const TablicaUređaj = (props) => {
  return (
    <div className="table-style">
      {props.params.params.map((parameter) => {
        return <span key={parameter.id}>{parameter}</span>;
      })}
    </div>
  );
};

export default TablicaUređaj;
