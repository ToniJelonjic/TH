import React, { useContext, useState, useEffect, useRef } from "react";
import "./TablicaInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import ChangeEmployeeStatus from "../StatusChange/ChangeEmployeeStatus";

const TablicaInfo = (props) => {
  const { title, data } = useContext(Context);

  const klijentID = JSON.parse(localStorage.getItem("klijentID"));
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleEmployeeId = () => {
    setSelectedEmployeeId(null);
  };

  const handleClick = (id) => {
    if (id === selectedEmployeeId) {
      setSelectedEmployeeId(null);
    } else {
      setSelectedEmployeeId(id);
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id !== "toggle-employee") {
        setSelectedEmployeeId(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="info-table-style">
      {title === "Grupe" ? (
        <table className="groups-table-style">
          <tbody>
            <tr className="tr-style">
              {props.rows.map((row) => {
                return (
                  <th key={row} className="thead-style">
                    {row}
                  </th>
                );
              })}
            </tr>

            {data.map((item) => {
              if (item.klijentId === klijentID) {
                return (
                  <tr key={item.id} id={item.id} className="tr-style">
                    <td className="thead-style">{item.naziv}</td>
                    <td className="thead-style">
                      <Link to={`/grupe/uredi/${item.id}`}>
                        <FontAwesomeIcon
                          title="Uredi"
                          className="actions-icon"
                          icon={faEdit}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      ) : title === "Podgrupe" ? (
        <table className="groups-table-style">
          <tbody>
            <tr className="tr-style">
              {props.rows.map((row) => {
                return (
                  <th key={row} className="thead-style">
                    {row}
                  </th>
                );
              })}
            </tr>

            {data.map((item) => {
              if (item.klijentId === klijentID) {
                return (
                  <tr key={item.id} id={item.id} className="tr-style">
                    <td className="thead-style">{item.naziv}</td>
                    <td className="thead-style">{item.grupa}</td>
                    <td className="thead-style">
                      <Link to={`/podgrupe/uredi/${item.id}`}>
                        <FontAwesomeIcon
                          title="Uredi"
                          className="actions-icon"
                          icon={faEdit}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      ) : title === "Zaposlenici" ? (
        <table className="groups-table-style">
          <tbody>
            <tr className="tr-style">
              {props.rows.map((row) => {
                return (
                  <th key={row} className="thead-style">
                    {row}
                  </th>
                );
              })}
            </tr>

            {data.map((item, index) => {
              if (item.ulogaID === 2 && item.firma === klijentID) {
                return (
                  <tr key={item.id} id={item.id} className="tr-style">
                    <td className="thead-style">{item.imePrezime}</td>
                    <td className="thead-style">{item.ime}</td>
                    <td className="thead-style">{item.uloga}</td>
                    <td
                      className={`thead-style ${
                        item.active ? "active-user" : "non-active-user"
                      }`}
                    >
                      {item.active ? "Aktivan" : "Neaktivan"}
                    </td>
                    <td className="thead-style">
                      <FontAwesomeIcon
                        title="Promijeni status"
                        id="toggle-employee"
                        className="actions-icon"
                        icon={faEllipsis}
                        value={item.id}
                        onClick={() => handleClick(item.id)}
                      />

                      {parseInt(selectedEmployeeId) === parseInt(item.id) ? (
                        <ChangeEmployeeStatus
                          employeeId={selectedEmployeeId}
                          handleEmployeeId={handleEmployeeId}
                          data={item}
                        />
                      ) : null}

                      <Link to={`/zaposlenici/uredi/${item.id}`}>
                        <FontAwesomeIcon
                          title="Uredi"
                          className="actions-icon"
                          icon={faEdit}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default TablicaInfo;
