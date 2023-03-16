import React, { useContext, useState, useEffect, useRef } from "react";
import "./TablicaInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import ChangeClientStatus from "../StatusChange/ChangeClientStatus";
import axios from "../../../api/axios";

const klijentiGetAllLink = "/klijenti/GetAll";

const Clients = ({ rows }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(klijentiGetAllLink);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleClientId = () => {
    setSelectedClientId(null);
  };

  const handleClick = (id) => {
    if (id === selectedClientId) {
      setSelectedClientId(null);
    } else {
      setSelectedClientId(id);
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id !== "toggle-client") {
        setSelectedClientId(null);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="info-table-style">
      <table className="users-table-style">
        <tbody>
          <tr className="tr-style">
            {rows.map((row) => {
              return (
                <th key={row} className="thead-style">
                  {row}
                </th>
              );
            })}
          </tr>

          {data.map((item, index) => {
            return (
              <tr key={index} id={item.id} className="tr-style">
                <td className="thead-style">{item.naziv}</td>
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
                    id="toggle-client"
                    className="actions-icon"
                    icon={faEllipsis}
                    value={item.id}
                    onClick={() => handleClick(item.id)}
                  />

                  {parseInt(selectedClientId) === parseInt(item.id) ? (
                    <ChangeClientStatus
                      clientId={selectedClientId}
                      handleClientId={handleClientId}
                      data={item}
                    />
                  ) : null}

                  <Link to={`/klijenti/uredi/${item.id}`}>
                    <FontAwesomeIcon
                      title="Uredi"
                      className="actions-icon"
                      icon={faEdit}
                    />
                  </Link>
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
