import React from "react";
import "./TablicaUređaj.css";

const TablicaUređaj = (props) => {
  return (
    <div className="table-style">
      <table>
        <tr>
          {props.params.params.map((parameter) => {
            return <th className="device-table-info" key={parameter}>{parameter}</th>;
          })}
        </tr>
      </table>
    </div>
  );
};

export default TablicaUređaj;
