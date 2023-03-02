import React, { useState, useEffect, useRef } from "react";
import "./DeviceFilter.css";
import axios from "../../../api/axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ChangeDeviceStatus from "../StatusChange/ChangeDeviceStatus";

const logeriGetAllLink = "/logeri/GetAll";
const groupsGetAllLink = "/grupe/GetAll";
const subgroupsGetAllLink = "/podgrupe/GetAll";

const DeviceFilter = ({ params }) => {
  const [klijentID, setKlijentID] = useState();
  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [subGroups, setSubGroups] = useState([]);
  const [groups, setGroups] = useState([]);

  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  //const deviceRef = useRef();
  const [isClicked, setIsClicked] = useState(false);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [currentCondition, setCurrentCondition] = useState([]);

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    setSubGroupValue(0);
    console.log(e.target.value);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    console.log(e.target.value);
  };

  const getCurrentCondition = async () => {
    await axios
      .get(logeriGetAllLink, {
        params: {
          klijentID: klijentID,
          grupaID: parseInt(groupValue),
          podgrupaID: parseInt(subGroupValue),
        },
      })
      .then(function(response) {
        setCurrentCondition(response.data);
        console.log(response.data);
        //localStorage.setItem("items", JSON.stringify(response.data));
      });
  };

  const getGroups = async () => {
    await axios.get(groupsGetAllLink).then(function(response) {
      setGroups(response.data);
    });
  };

  const getSubGroups = async () => {
    await axios.get(subgroupsGetAllLink).then(function(response) {
      setSubGroups(response.data);
    });
  };

  const handleClick = (deviceId) => {
    console.log(deviceId);
    setIsClicked(true);
    setSelectedDeviceId((prevSelectedDeviceId) => {
      if (prevSelectedDeviceId === deviceId) {
        return null;
      } else {
        return deviceId;
      }
    });
  };

  useEffect(() => {
    getGroups();
    getSubGroups();
    getCurrentCondition();
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
  }, []);

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!deviceRef.current.contains(e.target)) {
  //       setIsClicked(false);
  //       setSelectedDeviceId(null);
  //       //console.log(deviceRef.current);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

  useEffect(() => {
    //let currentCondition = JSON.parse(localStorage.getItem("items"));
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  const handlePageClick = (event) => {
    //let currentCondition = JSON.parse(localStorage.getItem("items"));
    //let currentCondition = localStorage.getItem("items");
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  const items = currentItems
    .sort((a, b) => a.id - b.id)
    .map((item) => {
      if (item.idklijenta === klijentID) {
        return (
          <tr key={item.id}>
            <td className="device-table-info">{item.naziv}</td>
            {/* <td className="device-table-info font">{item.podgrupaid}</td> */}
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
              <div>
                <FontAwesomeIcon
                  title="Promijeni status"
                  className="actions-icon"
                  icon={faEllipsis}
                  onClick={() => handleClick(item.id)}
                />

                {selectedDeviceId === item.id && (
                  <ChangeDeviceStatus
                    setSelectedDeviceId={setSelectedDeviceId}
                    data={item}
                  />
                )}

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
      }
    });

  return (
    <>
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
          <button
            //onClick={() => getCurrentCondition(groupValue, subGroupValue)}
            onClick={getCurrentCondition}
            className="button-style"
          >
            Pretraži
          </button>
        </span>
      </div>
      <div className="table-style">
        <table className="content-style">
          <tbody>
            <tr>
              {params.params.map((parameter) => {
                return (
                  <td className="device-table-info" key={parameter}>
                    {parameter}
                  </td>
                );
              })}
            </tr>
            {items}
          </tbody>
        </table>
      </div>
      <div className="paginate-div-style">
        <ReactPaginate
          breakLabel="..."
          breakClassName="page-num"
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="Previous"
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
