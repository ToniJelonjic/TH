import React from "react";
import "./TablicaUređaj.css";

const TablicaUređaj = (props) => {
  //console.log(props.data, "tablica")
  return (
    <div className="table-style">
      {props.title === "Uređaji" ? <table>
        <tr>
          {props.params.params.map((parameter) => {
            return <td className="device-table-info" key={parameter}>{parameter}</td>;
          })}
        </tr>
        {props.data.map((data) => {
          return(
            <tr key={data.id}>
              <td className="device-table-info">{data.naziv}</td>
              <td className="device-table-info font">{data.klijent}</td>
              <td className="device-table-info font">{data.email1}</td>
              <td className="device-table-info font">{data.email2}</td>
              <td className="device-table-info font">{data.tmin}</td>
              <td className="device-table-info font">{data.tmax}</td>
              <td className="device-table-info font">{data.hmin}</td>
              <td className="device-table-info font">{data.hmax}</td>
              <td className={`device-table-info font ${data.active ? "active-user" : "non-active-user"}`}>{data.active ? "Aktivan" : "Neaktivan"}</td>
            </tr>
          )
        })}
      </table> : <tr>
          {props.params.params.map((parameter) => {
            return <td className="device-table-info" key={parameter}>{parameter}</td>;
          })}
        </tr>}
      
    </div>
  );
};

export default TablicaUređaj;
