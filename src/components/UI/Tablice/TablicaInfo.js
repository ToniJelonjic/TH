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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);

  const handleEmployeeId = () => {
    setSelectedEmployeeId(0);
  };

  const handleClick = (employeeId) => {
    console.log("Employee ID:", employeeId);
    setSelectedEmployeeId((prevState) =>
      prevState === employeeId ? 0 : employeeId
    );
  };

  const employeeRef = useRef(null);

  const outside = (event, ref) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      selectedEmployeeId !== null
    ) {
      setSelectedEmployeeId(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      outside(event, employeeRef);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [employeeRef]);

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
                  <tr key={index} id={item.id} className="tr-style">
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
                        className="actions-icon"
                        icon={faEllipsis}
                        value={item.id}
                        ref={employeeRef}
                        onClick={() => {
                          handleClick(parseInt(item.id));
                        }}
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
