import React, { useState, useEffect } from "react";
import "./DeviceFilter.css";
import axios from "../../../api/axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const logeriGetAllLink = "/logeri/GetAll";
const groupsGetAllLink = "/grupe/GetAll";
const klijentiGetAllLink = "/klijenti/GetAll";
const subgroupsGetAllLink = "/podgrupe/GetAll";
const changeStatusLink = "/logeri/ChangeStatus";

const DeviceFilter = ({ params }) => {
  const role = JSON.parse(localStorage.getItem("role"));
  const klijentID = JSON.parse(localStorage.getItem("klijentID"));
  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [subGroups, setSubGroups] = useState([]);
  const [groups, setGroups] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [currentCondition, setCurrentCondition] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState();

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    setSubGroupValue(0);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
  };

  const handleClient = (e) => {
    setSelectedClient(e.target.value);
  };

  const adminGetCurrentCondition = async () => {
    await axios
      .get(logeriGetAllLink, {
        params: {
          klijentID: klijentID,
          grupaID: parseInt(groupValue),
          podgrupaID: parseInt(subGroupValue),
        },
      })
      .then(function (response) {
        setCurrentCondition(response.data);
      });
  };

  const superadminGetCurrentCondition = async () => {
    await axios
      .get(logeriGetAllLink, {
        params: {
          klijentID: selectedClient,
          grupaID: parseInt(groupValue),
          podgrupaID: parseInt(subGroupValue),
        },
      })
      .then(function (response) {
        setCurrentCondition(response.data);
      });
  };

  const getAllLogers = async () => {
    await axios.get(logeriGetAllLink, {}).then(function (response) {
      setCurrentCondition(response.data);
    });
  };

  const getGroups = async () => {
    await axios.get(groupsGetAllLink).then(function (response) {
      setGroups(response.data);
    });
  };

  const getSubGroups = async () => {
    await axios.get(subgroupsGetAllLink).then(function (response) {
      setSubGroups(response.data);
    });
  };

  const getAllClients = async () => {
    await axios.get(klijentiGetAllLink).then(function (response) {
      setClients(response.data);
    });
  };

  useEffect(() => {
    getGroups();
    getSubGroups();
    if (role === 1) {
      adminGetCurrentCondition();
    }
    if (role === 3) {
      getAllLogers();
      getAllClients();
      superadminGetCurrentCondition();
    }
  }, []);

  const onChangeStatus = (data) => {
    const newStatus = !data.active;
    axios
      .post(changeStatusLink, {
        Id: data.id,
        Active: newStatus,
        Naziv: data.naziv,
        Idklijenta: data.idklijenta,
        Idposlovnice: data.idposlovnice,
        Tmin: data.tmin,
        Tmax: data.tmax,
        Hmin: data.hmin,
        Hmax: data.hmax,
        Email1: data.email1,
        Email2: data.email2,
        Grupaid: data.grupaid,
        Podgrupaid: data.podgrupaid,
        SifraUredjaja: data.sifraUredjaja,
      })
      .then(function (response) {
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  const adminItems = currentItems
    .sort((a, b) => a.id - b.id)
    .map((item) => {
      if (item.idklijenta === klijentID) {
        return (
          <tr key={item.id}>
            <td className="device-table-info">{item.naziv}</td>
            <td className="device-table-info font">{item.klijent}</td>
            <td className="device-table-info font">{item.email1}</td>
            <td className="device-table-info font">{item.email2}</td>
            <td className="device-table-info font">{item.tmin}</td>
            <td className="device-table-info font">{item.tmax}</td>
            <td className="device-table-info font">{item.hmin}</td>
            <td className="device-table-info font">{item.hmax}</td>

            <td
              className={`device-table-info font ${
                item.active ? "active-user" : "non-active-user"
              }`}
            >
              {item.active ? "Aktivan" : "Neaktivan"}
            </td>
            <td className="thead-style">
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

                <Link to={`/uređaji/uredi/${item.id}`}>
                  {/* <FontAwesomeIcon
                    title="Uredi"
                    className="actions-icon"
                    icon={faEdit}
                  /> */}
                  <button title="Uredi" className="edit-button">
                    Uredi
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        );
      }
    });

  const superAdminItems = currentItems
    .sort((a, b) => a.id - b.id)
    .map((item) => {
      return (
        <tr key={item.id}>
          <td className="device-table-info">{item.naziv}</td>
          <td className="device-table-info font">{item.klijent}</td>
          <td className="device-table-info font">{item.email1}</td>
          <td className="device-table-info font">{item.email2}</td>
          <td className="device-table-info font">{item.tmin}</td>
          <td className="device-table-info font">{item.tmax}</td>
          <td className="device-table-info font">{item.hmin}</td>
          <td className="device-table-info font">{item.hmax}</td>

          <td
            className={`device-table-info font ${
              item.active ? "active-user" : "non-active-user"
            }`}
          >
            {item.active ? "Aktivan" : "Neaktivan"}
          </td>
          <td className="thead-style">
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

              <Link to={`/uređaji/uredi/${item.id}`}>
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
    });

  return (
    <>
      {role !== 3 ? (
        <div className="select-div">
          <span>
            <select
              className="select-style"
              onChange={handleGroupValue}
              value={groupValue}
            >
              <option hidden defaultValue="Odaberite grupu">
                Odaberite grupu
              </option>
              {groups.map((group) => {
                if (parseInt(group.klijentId) === parseInt(klijentID)) {
                  return (
                    <option value={group.id} key={group.id}>
                      {group.naziv}
                    </option>
                  );
                }
              })}
            </select>
            <select
              className="select-style"
              onChange={handleSubGroupValue}
              value={subGroupValue}
            >
              <option hidden defaultValue="Odaberite podgrupu">
                Odaberite podgrupu
              </option>
              {subGroups.map((subGroup) => {
                if (
                  subGroup.klijentId === klijentID &&
                  groupValue === subGroup.grupaId.toString()
                ) {
                  return (
                    <option value={subGroup.id} key={subGroup.id}>
                      {subGroup.naziv}
                    </option>
                  );
                }
              })}
            </select>
          </span>
          <span className="span-button-style">
            <button onClick={adminGetCurrentCondition} className="button-style">
              Pretraži
            </button>
          </span>
        </div>
      ) : (
        <div className="select-div">
          <span>
            <select className="select-style" onChange={handleClient}>
              <option hidden defaultValue="Odaberite klijenta">
                Odaberite klijenta
              </option>
              {clients.map((client) => {
                if (client.active) {
                  return (
                    <option value={client.id} key={client.id}>
                      {client.naziv}
                    </option>
                  );
                }
              })}
            </select>
          </span>
          <span className="span-button-style">
            <button
              onClick={superadminGetCurrentCondition}
              className="button-style"
            >
              Pretraži
            </button>
          </span>
        </div>
      )}
      <div className="table-style">
        <table className="content-style">
          <tbody>
            <tr>
              {params.map((parameter) => {
                return (
                  <td className="device-table-info" key={parameter}>
                    {parameter}
                  </td>
                );
              })}
            </tr>
            {role === 3 ? superAdminItems : adminItems}
          </tbody>
        </table>
      </div>
      <div className="paginate-div-style">
        <ReactPaginate
          breakLabel="..."
          breakClassName="page-num"
          nextLabel="Sljedeća"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="Prethodna"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active-page"
        />
      </div>
    </>
  );
};

export default DeviceFilter;
