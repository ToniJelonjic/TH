import React, { useContext, useState, useRef, useEffect } from "react";
import "./TablicaInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import ChangeEmployeeStatus from "../StatusChange/ChangeEmployeeStatus";

const TablicaInfo = (props) => {
  const { title, data } = useContext(Context);

  const [isClicked, setIsClicked] = useState(false);
  const [statusId, setStatusId] = useState();
  const [employeeId, setEmployeeId] = useState(null);
  const [klijentID, setKlijentID] = useState();
  const [role, setRole] = useState();

  const employeeRef = useRef();

  const handleClick = (employeeId) => {
    console.log(employeeId);
    setIsClicked(true);
    setEmployeeId((prevSelectedEmployeeId) => {
      if (prevSelectedEmployeeId === employeeId) {
        return null;
      } else {
        return employeeId;
      }
    });
  };

  useEffect(() => {
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
    setRole(JSON.parse(localStorage.getItem("role")));
  });

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!employeeRef.current.contains(e.target)) {
  //       setIsClicked(false);
  //       console.log(employeeRef.current);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

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
                        onClick={() => handleClick(item.id)}
                        ref={employeeRef}
                      />

                      {employeeId === item.id && (
                        <ChangeEmployeeStatus
                          setEmployeeId={setEmployeeId}
                          data={item}
                        />
                      )}

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
