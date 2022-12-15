import React from "react";
import "./TablicaUređaj.css";

const TablicaUređaj = (props) => {
  return (
    <div className="table-style">
      <table>
        <tr>
          {props.params.params.map((parameter) => {
            return <td className="device-table-info" key={parameter}>{parameter}</td>;
          })}
        </tr>
      </table>
    </div>
  );
};

export default TablicaUređaj;
