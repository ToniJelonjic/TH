import React, { useContext } from "react";
import "./Tablice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import axios from "../../../api/axios";

const changeStatusLink = "/korisnici/ChangeStatus";

const Employees = (props) => {
  const { data } = useContext(Context);
  const klijentID = JSON.parse(localStorage.getItem("klijentID"));

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
      <table className="groups-table-style">
        <tbody>
          <tr className="tr-style">
            {props.rows.map((row) => {
              return (
                <th key={row} className="thead-style-header">
                  {row}
                </th>
              );
            })}
          </tr>

          {data.map((item, index) => {
            if (item.ulogaID === 2 && item.firma === klijentID) {
              return (
                <tr key={item.id} id={item.id} className="tr-style">
                  <td className="thead-style-content">{item.imePrezime}</td>
                  <td className="thead-style-content">{item.ime}</td>
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

                      <Link to={`/zaposlenici/uredi/${item.id}`}>
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

export default Employees;
