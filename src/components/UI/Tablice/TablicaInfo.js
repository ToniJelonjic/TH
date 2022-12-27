import React from "react";
import "./TablicaInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TablicaInfo = (props) => {
  //console.log(props, "info");
  const { title } = props;
  const { subtitle } = props;
  const { editFormInfo } = props;
  return (
    <div className="info-table-style">
      {props.title === "Grupe" ? (
        <table className="groups-table-style">
          <tr className="tr-style">
            {props.rows.map((row) => {
              return (
                <th key={row} className="thead-style">
                  {row}
                </th>
              );
            })}
          </tr>

          {props.data.map((data) => {
            return (
              <tr key={data.id} id={data.id} className="tr-style">
                <td className="thead-style">{data.naziv}</td>
                <td className="thead-style">
                  <Link
                    to={`uredi/${data.id}`}
                    state={{
                      title: { title },
                      subtitle: { subtitle },
                      editFormInfo: { editFormInfo },
                    }}
                  >
                    <FontAwesomeIcon className="actions-icon" icon={faEdit} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      ) : props.title === "Podgrupe" ? (
        <table className="groups-table-style">
          <tr className="tr-style">
            {props.rows.map((row) => {
              return (
                <th key={row} className="thead-style">
                  {row}
                </th>
              );
            })}
          </tr>

          {props.data.map((data) => {
            return (
              <tr key={data.id} id={data.id} className="tr-style">
                <td className="thead-style">{data.naziv}</td>
                <td className="thead-style">{data.grupa}</td>
                <td className="thead-style">
                  <Link
                    to={`uredi/${data.id}`}
                    state={{
                      title: { title },
                      subtitle: { subtitle },
                      editFormInfo: { editFormInfo },
                    }}
                  >
                    <FontAwesomeIcon className="actions-icon" icon={faEdit} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        <table className="groups-table-style">
          <tr className="tr-style">
            {props.rows.map((row) => {
              return (
                <th key={row} className="thead-style">
                  {row}
                </th>
              );
            })}
          </tr>

          {props.data.map((data) => {
            if (
              data.uloga === "Zaposlenik" &&
              data.klijent.includes("Hercegovina")
            ) {
              return (
                <tr key={data.id} id={data.id} className="tr-style">
                  <td className="thead-style">{data.imePrezime}</td>
                  <td className="thead-style">{data.ime}</td>
                  <td className="thead-style">{data.klijent}</td>
                  <td className="thead-style">{data.uloga}</td>
                  <td
                    className={`thead-style ${
                      data.status ? "active-user" : "non-active-user"
                    }`}
                  >
                    {data.status ? "Aktivan" : "Neaktivan"}
                  </td>
                  <td className="thead-style">
                    <FontAwesomeIcon
                      className="actions-icon"
                      icon={faEllipsis}
                    />
                    <Link
                      to={`uredi/${data.id}`}
                      state={{
                        title: { title },
                        subtitle: { subtitle },
                        editFormInfo: { editFormInfo },
                      }}
                    >
                      <FontAwesomeIcon className="actions-icon" icon={faEdit} />
                    </Link>
                  </td>
                </tr>
              );
            }
          })}
        </table>
      )}
    </div>
  );
};

export default TablicaInfo;
