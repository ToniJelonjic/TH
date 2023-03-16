import React, { useContext, useState, useEffect, useRef } from "react";
import "./TablicaInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import ChangeAdminStatus from "../StatusChange/ChangeAdminStatus";
import axios from "../../../api/axios";

const korisniciGetAllLink = "/korisnici/GetAll";

const Users = ({ rows }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(korisniciGetAllLink);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserId = () => {
    setSelectedUserId(null);
  };

  const handleClick = (id) => {
    if (id === selectedUserId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(id);
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.id !== "toggle-user") {
        setSelectedUserId(null);
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
            if (item.ulogaID === 1) {
              return (
                <tr key={index} id={item.id} className="tr-style">
                  <td className="thead-style">{item.imePrezime}</td>
                  <td className="thead-style">{item.ime}</td>
                  <td className="thead-style">{item.klijent}</td>
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
                      id="toggle-user"
                      className="actions-icon"
                      icon={faEllipsis}
                      value={item.id}
                      onClick={() => handleClick(item.id)}
                    />

                    {parseInt(selectedUserId) === parseInt(item.id) ? (
                      <ChangeAdminStatus
                        userId={selectedUserId}
                        handleUserId={handleUserId}
                        data={item}
                      />
                    ) : null}

                    <Link to={`/korisnici/uredi/${item.id}`}>
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

export default Users;
