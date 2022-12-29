import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Groups.css";

const Groups = (props) => {
  //console.log(props, "c");

  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/grupe/GetAll"
    );
    setGroups(data);
  };

  const [subGroups, setSubGroups] = useState([]);
  const getSubGroups = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/podgrupe/GetAll"
    );
    setSubGroups(data);
  };

  useEffect(() => {
    getGroups();
    getSubGroups();
    //console.log(data[0])
  }, []);

  return (
    <span>
      <select
        className="select-style" /* name={props.device.groupName} id={props.device.groupId} */
        onChange={props.handleGroupValue}
        value={props.groupValue}
      >
        <option disabled selected value="">
          Odaberite grupu
        </option>
        {groups.map((group) => {
          if (group.klijentId === 3) {
            return (
              <option value={group.id} key={group.id}>
                {group.naziv}
              </option>
            );
          }
        })}
      </select>
      <select
        className="select-style"
        onChange={props.handleSubGroupValue}
        value={props.subGroupValue}
        /* name={props.device.subGroupName}
              id={props.device.subGroupId} */
      >
        <option disabled selected value="">
          Odaberite podgrupu
        </option>
        {subGroups.map((subGroup) => {
          if (subGroup.klijentId === 3) {
            return (
              <option value={subGroup.id} key={subGroup.id}>
                {subGroup.naziv}
              </option>
            );
          }
        })}
      </select>
    </span>
  );
};

export default Groups;
