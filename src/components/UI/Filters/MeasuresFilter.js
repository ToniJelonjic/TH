import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const MeasuresFilter = () => {
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());

  const [date, setDate] = useState(defaultDate);

  const onSetDate = (event) => {
    setDate(new Date(event.target.value));
  };

  const [data, setData] = useState([]);
  const [deviceValue, setDeviceValue] = useState("");
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/logeri/GetAll"
    );
    setData(data);
  };

  const [groupValue, setGroupValue] = useState("");
  const [subGroupValue, setSubGroupValue] = useState("");
  const [subGroups, setSubGroups] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    //console.log(groupValue);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    //console.log(subGroupValue);
  };

  const handleDeviceValue = (e) => {
    setDeviceValue(e.target.value);
  };

  const getGroups = async () => {
    const res = await axios
      .get("https://localhost:44336/api/grupe/GetAll")
      .then(function(response) {
        setGroups(response.data);
      });
  };

  const getSubGroups = async () => {
    const res = await axios
      .get("https://localhost:44336/api/podgrupe/GetAll")
      .then(function(response) {
        setSubGroups(response.data);
      });
  };

  useEffect(() => {
    getGroups();
    getSubGroups();
    getData();
  }, []);

  return (
    <>
      <div className="measure-div">
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
          <select className="select-style">
            <option hidden defaultValue="Odaberite uređaj">
              Odaberite uređaj
            </option>
            {data.map((device) => {
              return (
                <option value={device.id} key={device}>
                  {device.naziv}
                </option>
              );
            })}
          </select>
        </span>
        <span>
          <select
            className="select-style"
            onChange={handleGroupValue}
            value={groupValue}
          >
            <option hidden defaultValue="Odaberite grupu">
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
            onChange={handleSubGroupValue}
            value={subGroupValue}
          >
            <option hidden defaultValue="Odaberite podgrupu">
              Odaberite podgrupu
            </option>
            {subGroups.map((subGroup) => {
              if (
                subGroup.klijentId === 3 &&
                groupValue === subGroup.grupaId.toString()
              ) {
                return (
                  <option value={subGroup.id} key={subGroup.id}>
                    {subGroup.naziv}
                  </option>
                );
              }
            })}
          </select>
        </span>
        <span className="span-button-style">
          <button /*onClick={getData}*/ className="button-style">
            Pretraži
          </button>
        </span>
      </div>

      {
        //prebaciti tablicu uredjaj
        //u ovu komponentu
      }
    </>
  );
};

export default MeasuresFilter;
