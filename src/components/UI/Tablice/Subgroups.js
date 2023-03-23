import React, { useContext } from "react";
import "./Tablice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";

const Subgroups = ({ rows }) => {
  const { data } = useContext(Context);
  const klijentID = JSON.parse(localStorage.getItem("klijentID"));
  return (
    <div className="info-table-style">
      <table className="groups-table-style">
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

          {data.map((item) => {
            if (item.klijentId === klijentID) {
              return (
                <tr key={item.id} id={item.id} className="tr-style">
                  <td className="thead-style-content">{item.naziv}</td>
                  <td className="thead-style-content">{item.grupa}</td>
                  <td className="thead-style-content">
                    <Link to={`/podgrupe/uredi/${item.id}`}>
                      <button title="Uredi" className="edit-button">
                        Uredi
                      </button>
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
