import React, { useState, useEffect } from "react";
import "./ActivityFilter.css";
import axios from "../../../api/axios";
import ReactPaginate from "react-paginate";

const ProvjeraMjerenjaLink = "/logeri/ProvjeraMjerenja";
const getGrupeLink = "/grupe/GetAll";
const getPodgrupeLink = "/podgrupe/GetAll";

const ActivityFilter = ({ params }) => {
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

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    setSubGroupValue(0);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
  };

  const adminGetCurrentCondition = async () => {
    await axios
      .get(ProvjeraMjerenjaLink, {
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
      .get(ProvjeraMjerenjaLink, {
        params: {
          grupaID: parseInt(groupValue),
          podgrupaID: parseInt(subGroupValue),
        },
      })
      .then(function (response) {
        setCurrentCondition(response.data);
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
    if (role !== 3) {
      getGroups();
      getSubGroups();
      adminGetCurrentCondition();
    }
  }, []);

  useEffect(() => {
    if (role === 3) {
      superadminGetCurrentCondition();
    }
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  const adminItems = currentItems.map((loger) => {
    if (loger.idklijenta === klijentID)
      return (
        <tr
          key={loger.id}
          className={`border-bottom ${loger.valid ? "" : "activity-valid"}`}
        >
          <td className="thead-style-content">
            <div className="table-activity-data-name">{loger.naziv}</div>
            <div className="manufactor-label">{loger.klijent}</div>
          </td>
          <td className="thead-style-content">
            {loger.vrijemeMjerenja == null ? (
              ""
            ) : (
              <>
                {loger.vrijemeMjerenja.slice(0, 11).replace("T", " ")}
                {loger.vrijemeMjerenja.slice(11, 19)}
              </>
            )}
          </td>
          <td className="thead-style-content">{loger.tmin}</td>
          <td className="thead-style-content">{loger.tmax}</td>
          <td className="thead-style-content">{loger.hmin}</td>
          <td className="thead-style-content">{loger.hmax}</td>
        </tr>
      );
  });

  const superAdminItems = currentItems.map((loger) => {
    return (
      <tr
        key={loger.id}
        className={
          role === 3
            ? `border-bottom`
            : role === 1
            ? `border-bottom ${loger.valid ? "" : "activity-valid"}`
            : ""
        }
      >
        <td className="thead-style-content">
          <div className="table-activity-data-name">{loger.naziv}</div>
          <div className="manufactor-label">{loger.klijent}</div>
        </td>
        <td className="thead-style-content">
          {loger.vrijemeMjerenja == null ? (
            ""
          ) : (
            <>
              {loger.vrijemeMjerenja.slice(0, 11).replace("T", " ")}
              {loger.vrijemeMjerenja.slice(11, 19)}
            </>
          )}
        </td>
        <td className="thead-style-content">{loger.tmin}</td>
        <td className="thead-style-content">{loger.tmax}</td>
        <td className="thead-style-content">{loger.hmin}</td>
        <td className="thead-style-content">{loger.hmax}</td>
      </tr>
    );
  });

  return (
    <div className="params-style">
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
            <button onClick={adminGetCurrentCondition} className="button-style">
              Pretraži
            </button>
          </span>
        </div>
      ) : null}
      <table className="table-width">
        <tbody>
          <tr className="border-bottom">
            {params.map((parameter, index) => {
              return (
                <th className="thead-style-header" key={index}>
                  {parameter}
                </th>
              );
            })}
          </tr>

          {role === 1 ? adminItems : role === 3 ? superAdminItems : null}
        </tbody>
      </table>
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
    </div>
  );
};

export default ActivityFilter;
