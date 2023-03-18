import React, { useContext } from "react";
import "./Tablice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";

const Subgroups = (props) => {
  const { data } = useContext(Context);
  const klijentID = JSON.parse(localStorage.getItem("klijentID"));
  return (
    <div className="info-table-style">
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
    </div>
  );
};

export default Subgroups;
