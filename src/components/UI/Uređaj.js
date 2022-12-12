import React from "react";
import "./Uređaj.css";

const Uređaj = (props) => {
  return (
    <div className="params-style">
    <table>
      <tr>
      {props.params.params.map((parameter) => {
        return <th className="th-desc-style" key={parameter.toString()}>{parameter}</th>;
      })}
      </tr>
    </table>
    </div>

    /* {
      typeof props.device.parameters === 'object' ? 
      props.subtitle === "Pregled mjerenja van opsega" ?
      props.device.parameters.first.map((firstParam) => {
        return <span key={props.device.id}>{firstParam}</span>
      })
      :
      props.device.parameters.second.map((secondParam) => {
        return <span key={props.device.id}>{secondParam}</span>
      })
      : typeof props.device.parameters === Array ?
      props.device.parameters.map((parameter) => {
        return <span key={parameter.deviceId}>{parameter}</span>
      }) : null
    } */
  );
};

export default Uređaj;
