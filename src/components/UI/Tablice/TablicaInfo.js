import React from "react";
import "./TablicaInfo.css";

const TablicaGrupe = (props) => {
  return (
    <div className="info-table-style">
      <table className="groups-table-style">
        <tr className="tr-style">
          {props.rows.map((row) => {
            return <th className="thead-style">{row}</th>;
          })}
        </tr>
      </table>
    </div>
  );
};

export default TablicaGrupe;
