import React, { useState, useEffect } from "react";
import "./MeasuresFilter.css";
import axios from "../../../api/axios";
import ReactPaginate from "react-paginate";
import TablicaUređaj from "../Tablice/TablicaUređaj";

const measuresFilterLink = "/mjerenja/GetAll";
const logeriLink = "/logeri/GetAll";
const groupsLink = "/grupe/GetAll";
const subgroupsLink = "/podgrupe/GetAll";

const MeasuresFilter = (props) => {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [klijentID, setKlijentID] = useState();

  const getCurrentDateInput = () => {
    const dateObj = new Date();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const shortDate = `${year}-${month}-${day}`;
    return shortDate;
  };

  const onSetDateFrom = (event) => {
    const inputDate = event.target.value;
    const dateParts = inputDate.split("-");
    const dateObj = new Date(`${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`);
    console.log(dateObj, "obj");
    const newDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    console.log(newDate, "new");
    setDateFrom(newDate);
    console.log(newDate);
  };

  const onSetDateTo = (event) => {
    const inputDate = event.target.value;
    console.log(event.target.value);
    const dateParts = inputDate.split("-");
    const dateObj = new Date(`${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`);
    const newDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setDateTo(newDate);
    console.log(newDate);
  };

  const [data, setData] = useState([]);
  const [deviceValue, setDeviceValue] = useState("");

  const getData = async () => {
    const { data } = await axios.get(logeriLink);
    setData(data);
    console.log(data, "Data");
  };

  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [subGroups, setSubGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [logers, setLogers] = useState([]);

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    //console.log(groupValue);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    //console.log(subGroupValue);
  };

  const handleDeviceValue = (e) => {
    setDeviceValue(e.target.value);
    console.log(deviceValue);
  };

  const getGroups = async () => {
    const res = await axios.get(groupsLink).then(function(response) {
      setGroups(response.data);
    });
  };

  const getSubGroups = async () => {
    const res = await axios.get(subgroupsLink).then(function(response) {
      setSubGroups(response.data);
    });
  };

  const getFilteredResults = async () => {
    await axios
      .get(measuresFilterLink, {
        params: {
          datumOd: dateFrom,
          datumDo: dateTo,
          logerID: deviceValue,
          grupaID: groupValue,
          podgrupaID: subGroupValue,
        },
      })
      .then(function(response) {
        console.log(response);
        setLogers(response.data);
        setCurrentCondition(response.data);
      });
  };

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [currentCondition, setCurrentCondition] = useState([]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  const handlePageClick = (event) => {
    let currentCondition = JSON.parse(localStorage.getItem("items"));
    //let currentCondition = localStorage.getItem("items");
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  // const items = currentItems
  // .sort((a, b) => a.id - b.id)
  // .map((item) => {
  //   if (item.idklijenta === klijentID) {
  //     return (
  //       <tr key={item.id}>
  //         <td className="device-table-info">{item.naziv}</td>
  //         <td className="device-table-info font">{item.klijent}</td>
  //         <td className="device-table-info font">{item.email1}</td>
  //         <td className="device-table-info font">{item.email2}</td>
  //         <td className="device-table-info font">{item.tmin}</td>
  //         <td className="device-table-info font">{item.tmax}</td>
  //         <td className="device-table-info font">{item.hmin}</td>
  //         <td className="device-table-info font">{item.hmax}</td>

  //         <td
  //           className={`device-table-info font ${
  //             item.active ? "active-user" : "non-active-user"
  //           }`}
  //         >
  //           {item.active ? "Aktivan" : "Neaktivan"}
  //         </td>
  //         <td className="thead-style">
  //           <Link to={``}></Link>
  //           <div>
  //             <FontAwesomeIcon
  //               title="Promijeni status"
  //               className="actions-icon"
  //               icon={faEllipsis}
  //             />
  //             <Link to={`/uređaji/uredi/${item.id}`}>
  //               <FontAwesomeIcon
  //                 title="Uredi"
  //                 className="actions-icon"
  //                 icon={faEdit}
  //               />
  //             </Link>
  //           </div>
  //         </td>
  //       </tr>
  //     );
  //   }
  // });

  useEffect(() => {
    getGroups();
    getSubGroups();
    getData();
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
  }, []);

  return (
    <>
      <div className="measure-div">
        <span className="dates-style">
          <input
            defaultValue={getCurrentDateInput()}
            onChange={onSetDateFrom}
            type="date"
            className="date-input-style"
          />
          <input
            defaultValue={getCurrentDateInput()}
            onChange={onSetDateTo}
            type="date"
            className="date-input-style"
          />
          <select
            required
            className="select-style"
            onChange={handleDeviceValue}
          >
            <option hidden defaultValue="Odaberite uređaj">
              Odaberite uređaj
            </option>
            {data.map((device, index) => {
              if (device.idklijenta === klijentID) {
                if (groupValue === 0 || subGroupValue === 0) {
                  return (
                    <option value={device.id} key={index}>
                      {device.naziv}
                    </option>
                  );
                } else if (
                  device.grupaid === groupValue ||
                  device.podgrupaid === subGroupValue
                ) {
                  return (
                    <option value={device.id} key={index}>
                      {device.naziv}
                    </option>
                  );
                }
              }
            })}
          </select>
        </span>
        <span>
          <select
            className="select-style"
            onChange={handleGroupValue}
            value={groupValue}
          >
            <option hidden defaultValue="Odaberite grupu">
              Odaberite grupu
            </option>
            {groups.map((group, index) => {
              if (group.klijentId === klijentID) {
                return (
                  <option value={group.id} key={index}>
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
            {subGroups.map((subGroup, index) => {
              if (
                subGroup.klijentId === klijentID &&
                groupValue === subGroup.grupaId.toString()
              ) {
                return (
                  <option value={subGroup.id} key={index}>
                    {subGroup.naziv}
                  </option>
                );
              }
            })}
          </select>
        </span>
        <span className="span-button-style">
          <button onClick={getFilteredResults} className="button-style">
            Pretraži
          </button>
        </span>
      </div>
      {
        //prebaciti tablicu uredjaj
        //u ovu komponentu
      }
      <div className="table-style">
        <tr>
          {props.params.params.map((parameter) => {
            return (
              <td className="device-table-info" key={parameter}>
                {parameter}
              </td>
            );
          })}
        </tr>
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
      FILTER UREDJAJA PO GRUPAMA I PODGRUPAMA
    </>
  );
};

export default MeasuresFilter;
