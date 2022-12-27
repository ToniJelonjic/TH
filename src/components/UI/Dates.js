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
        <option disabled selected value="">
          Odaberite uređaj
        </option>
        {props.devices.map((device) => {
          return <option>{device.naziv}</option>;
        })}
      </select>
    </span>
  );
};

export default Dates;
