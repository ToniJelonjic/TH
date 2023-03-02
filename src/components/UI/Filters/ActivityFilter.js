import React, { useState, useEffect } from "react";
import "./ActivityFilter.css";
import axios from "../../../api/axios";
import ReactPaginate from "react-paginate";

const ProvjeraMjerenjaLink = "/logeri/ProvjeraMjerenja";
const getGrupeLink = "/grupe/GetAll";
const getPodgrupeLink = "/podgrupe/GetAll";

const ActivityFilter = (props) => {
  const [klijentID, setKlijentID] = useState();
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
    setSubGroupValue(0);
    console.log(e.target.value);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    console.log(e.target.value);
  };

  const getCurrentCondition = async () => {
    await axios
      .get(ProvjeraMjerenjaLink, {
        params: {
          klijentID: klijentID,
          grupaID: parseInt(groupValue),
          podgrupaID: parseInt(subGroupValue),
        },
      })
      .then(function(response) {
        setCurrentCondition(response.data);
        //localStorage.setItem("items", JSON.stringify(response.data));
      });
  };

  const getGroups = async () => {
    const { data } = await axios.get(getGrupeLink);
    setGroups(data);
  };

  const getSubGroups = async () => {
    const { data } = await axios.get(getPodgrupeLink);
    setSubGroups(data);
  };

  useEffect(() => {
    getGroups();
    getSubGroups();
    getCurrentCondition();
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
  }, []);

  useEffect(() => {
    //let currentCondition = JSON.parse(localStorage.getItem("items"));
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  const items = currentItems.map((loger) => {
    return (
      <tr
        key={loger.id}
        className={`border-bottom ${loger.valid ? "" : "activity-valid"}`}
      >
        <td className="table-measure-data-name">
          <div className="table-activity-data-name">{loger.naziv}</div>
          <div className="manufactor-label">{loger.klijent}</div>
        </td>
        <td className="table-measure-data">
          {loger.vrijemeMjerenja == null ? (
            ""
          ) : (
            <>
              {/* {loger.vrijemeMjerenja} */}
              {loger.vrijemeMjerenja.slice(0, 11).replace("T", " ")}
              {loger.vrijemeMjerenja.slice(11, 19)}
            </>
          )}
        </td>
        <td className="table-measure-data">{loger.tmin}</td>
        <td className="table-measure-data">{loger.tmax}</td>
        <td className="table-measure-data">{loger.hmin}</td>
        <td className="table-measure-data">{loger.hmax}</td>
      </tr>
    );
  });

  return (
    <div className="params-style">
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
              if (group.klijentId === klijentID) {
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
          <button onClick={getCurrentCondition} className="button-style">
            Pretraži
          </button>
        </span>
      </div>
      <table className="table-width">
        <tbody>
          <tr className="border-bottom">
            {props.params.params.map((parameter) => {
              return (
                <th className="th-desc-style" key={parameter.toString()}>
                  {parameter}
                </th>
              );
            })}
          </tr>

          {items}
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
  );
};

export default ActivityFilter;
