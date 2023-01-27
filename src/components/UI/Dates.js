import React, { useState } from "react";
import "./Dates.css";

const Dates = (props) => {
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());

  const [date, setDate] = useState(defaultDate);

  const onSetDate = (event) => {
    setDate(new Date(event.target.value));
  };

  //CDS-605
  //primjer

  return (
    <span className="dates-style">
      <input
        value={date.toLocaleDateString("en-CA")}
        onChange={onSetDate}
        type="date"
        className="date-input-style"
      />
      <input
        value={date.toLocaleDateString("en-CA")}
        onChange={onSetDate}
        type="date"
        className="date-input-style"
      />
      <select
        className="select-style"
        /* name={props.device.subGroupName}
              id={props.device.subGroupId} */
      >
        <option hidden defaultValue="Odaberite uređaj">
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
