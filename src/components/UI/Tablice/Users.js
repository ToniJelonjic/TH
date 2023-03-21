import React, { useState, useEffect } from "react";
import "./Tablice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";

const korisniciGetAllLink = "/korisnici/GetAll";
const changeStatusLink = "/korisnici/ChangeStatus";

const Users = ({ rows }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(korisniciGetAllLink);
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
            if (item.ulogaID === 1) {
              return (
                <tr key={index} id={item.id} className="tr-style">
                  <td className="thead-style-content">{item.imePrezime}</td>
                  <td className="thead-style-content">{item.ime}</td>
                  <td className="thead-style-content">{item.klijent}</td>
                  <td className="thead-style-content">{item.uloga}</td>
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
                      <Link to={`/korisnici/uredi/${item.id}`}>
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
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
