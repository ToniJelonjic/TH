import React from "react";
import "./Dates.css";

const Dates = (props) => {
  return (
    <span className="dates-style">
      <input type="date" className="date-input-style" />
      <input type="date" className="date-input-style" />
      <select
        className="select-style"
        /* name={props.device.subGroupName}
              id={props.device.subGroupId} */
      >
        <option disabled defaultValue="Odaberite uređaj">
          Odaberite uređaj
        </option>
        {props.devices.map((device) => {
          return <option key={device}>{device.naziv}</option>;
        })}
      </select>
    </span>
  );
};

export default Dates;
