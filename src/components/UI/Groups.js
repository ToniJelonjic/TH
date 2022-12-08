import React from "react";
import "./Groups.css";

const Groups = (props) => {
  return (
    <span className="">
      <select
        className="select-style" /* name={props.device.groupName} id={props.device.groupId} */
      >
        <option disabled selected value="">
          Odaberite grupu
        </option>
        {props.groups.groups.map((group) => {
          return <option>{group}</option>;
        })}
      </select>
      <select
        className="select-style"
        /* name={props.device.subGroupName}
              id={props.device.subGroupId} */
      >
        <option disabled selected value="">
          Odaberite podgrupu
        </option>
        {props.groups.subGroups.map((subGroup) => {
          return <option>{subGroup}</option>;
        })}
      </select>
    </span>
  );
};

export default Groups;
