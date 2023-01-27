import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DeviceFilter = (props) => {
  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [subGroups, setSubGroups] = useState([]);
  const [groups, setGroups] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [currentCondition, setCurrentCondition] = useState([]);

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    //console.log(groupValue);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    //console.log(subGroupValue);
  };

  const getCurrentCondition = async () => {
    const res = await axios
      .get("https://localhost:44336/api/Logeri/GetAll", {
        //ispraviti
        //
        //
        data: {
          klijentID: 3,
          grupaId: groupValue,
          podgrupaId: subGroupValue,
        },
        //
        //
        //
      })
      .then(function(response) {
        setCurrentCondition(response.data);
      });
  };

  const getGroups = async () => {
    const res = await axios
      .get("https://localhost:44336/api/grupe/GetAll")
      .then(function(response) {
        setGroups(response.data);
      });
  };

  const getSubGroups = async () => {
    const res = await axios
      .get("https://localhost:44336/api/podgrupe/GetAll")
      .then(function(response) {
        setSubGroups(response.data);
      });
  };

  useEffect(() => {
    getGroups();
    getSubGroups();
    getCurrentCondition();
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  const items = currentItems.map((item) => {
    if (item.idklijenta === 3) {
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
            <Link
              to={``}
              // state={{
              //   name: data.imePrezime,
              //   username: data.ime,
              //   title: { title },
              //   subtitle: { subtitle },
              //   editFormInfo: { editFormInfo },
              // }}
            ></Link>
            <div>
              <FontAwesomeIcon
                title="Promijeni status"
                className="actions-icon"
                icon={faEllipsis}
              />
              <FontAwesomeIcon
                title="Uredi"
                className="actions-icon"
                icon={faEdit}
              />
            </div>
          </td>
        </tr>
      );
    }
  });

  const filteredItems = currentItems.map((item) => {
    if (item.idklijenta === 3) {
      if (
        parseInt(item.grupaid) === parseInt(groupValue) &&
        parseInt(item.podgrupaid) === parseInt(subGroupValue)
      ) {
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
              <Link
                to={``}
                // state={{
                //   name: data.imePrezime,
                //   username: data.ime,
                //   title: { title },
                //   subtitle: { subtitle },
                //   editFormInfo: { editFormInfo },
                // }}
              ></Link>
              <div>
                <FontAwesomeIcon
                  title="Promijeni status"
                  className="actions-icon"
                  icon={faEllipsis}
                />
                <FontAwesomeIcon
                  title="Uredi"
                  className="actions-icon"
                  icon={faEdit}
                />
              </div>
            </td>
          </tr>
        );
      }
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
              if (group.klijentId === 3) {
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
                subGroup.klijentId === 3 &&
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
          <button onClick={getCurrentCondition} className="button-style">
            Pretraži
          </button>
        </span>
      </div>
      <div className="table-style">
        <table className="content-style">
          <tbody>
            <tr>
              {props.params.params.map((parameter) => {
                return (
                  <td className="device-table-info" key={parameter}>
                    {parameter}
                  </td>
                );
              })}
            </tr>

            {groupValue === 0 || subGroupValue === 0 ? items : filteredItems}
          </tbody>
        </table>
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
      </div>
    </>
  );
};

export default DeviceFilter;
