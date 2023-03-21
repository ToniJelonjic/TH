import React, { useState, useEffect } from "react";
import "./Tablice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";

const klijentiGetAllLink = "/klijenti/GetAll";
const changeStatusLink = "/klijenti/ChangeStatus";

const Clients = ({ rows }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(klijentiGetAllLink);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeStatus = (data) => {
    const newStatus = !data.active;
    axios
      .post(changeStatusLink, {
        Id: data.id,
        Naziv: "",
        Active: newStatus,
      })
      .then(function (response) {
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="info-table-style">
      <table className="users-table-style">
        <tbody>
          <tr className="tr-style">
            {rows.map((row) => {
              return (
                <th key={row} className="thead-style-header">
                  {row}
                </th>
              );
            })}
          </tr>

          {data.map((item, index) => {
            return (
              <tr key={index} id={item.id} className="tr-style">
                <td className="thead-style-content">{item.naziv}</td>
                <td
                  className={`thead-style-content ${
                    item.active ? "active-user" : "non-active-user"
                  }`}
                >
                  {item.active ? "Aktivan" : "Neaktivan"}
                </td>
                <td className="thead-style-content">
                  <div className="center-items">
                    <button
                      title="Promijeni status"
                      className={`change-status-button ${
                        item.active ? "deaktiviraj" : "aktiviraj"
                      }`}
                      id="toggle-device"
                      onClick={() => {
                        onChangeStatus(item);
                      }}
                    >
                      {item.active ? "Deaktiviraj" : "Aktiviraj"}
                    </button>
                    <Link to={`/klijenti/uredi/${item.id}`}>
                      <FontAwesomeIcon
                        title="Uredi"
                        className="actions-icon"
                        icon={faEdit}
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
