import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Groups.css";

const Groups = (props) => {

  const [groupValue, setGroupValue] = useState("")
  const [subGroupValue, setSubGroupValue] = useState("")

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value)
    console.log(groupValue)
  }

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value)
    console.log(subGroupValue)
  }


  const [groups, setGroups] = useState([])
  const getGroups = async() => {
    const {data} = await axios.get("https://localhost:44336/api/grupe/GetAll")
    setGroups(data)
  }

  const [subGroups, setSubGroups] = useState([])
  const getSubGroups = async() => {
    const {data} = await axios.get("https://localhost:44336/api/podgrupe/GetAll")
    setSubGroups(data)
  }

  
  useEffect(() => {
    getGroups()
    getSubGroups()
    //console.log(data[0])
  }, [])

  return (
    <span className="">
      <select
        className="select-style" /* name={props.device.groupName} id={props.device.groupId} */
        onChange={handleGroupValue}
        value={groupValue}
      >
        <option disabled selected value="">
          Odaberite grupu
        </option>
        {groups.map((group) => {
          return <option key={group.id}>{group.naziv}</option>;
        })}
      </select>
      <select
        className="select-style"
        onChange={handleSubGroupValue}
        value={subGroupValue}
        /* name={props.device.subGroupName}
              id={props.device.subGroupId} */
      >
        <option disabled selected value="">
          Odaberite podgrupu
        </option>
        {subGroups.map((subGroup) => {
          return <option key={subGroup.id}>{subGroup.naziv}</option>;
        })}
      </select>
    </span>
  );
};

export default Groups;
