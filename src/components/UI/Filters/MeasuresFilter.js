import React, { useState, useEffect } from "react";
import "./MeasuresFilter.css";
import axios from "../../../api/axios";
import ReactPaginate from "react-paginate";
import ReactExport from "react-data-export";
import ButtonExport from "../Buttons/ButtonExport";

const measuresFilterLink = "/mjerenja/GetAll";
const logeriLink = "/logeri/GetAll";
const groupsLink = "/grupe/GetAll";
const subgroupsLink = "/podgrupe/GetAll";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const MeasuresFilter = ({ params }) => {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [klijentID, setKlijentID] = useState();
  const [subtitle, setSubtitle] = useState("Mjerenja");

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
    const newDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setDateFrom(newDate);
  };

  const onSetDateTo = (event) => {
    const inputDate = event.target.value;
    const dateParts = inputDate.split("-");
    const dateObj = new Date(`${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`);
    const newDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setDateTo(newDate);
  };

  const [data, setData] = useState([]);
  const [deviceValue, setDeviceValue] = useState("");

  const getData = async () => {
    const { data } = await axios.get(logeriLink);
    setData(data);
  };

  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [subGroups, setSubGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
  };

  const handleDeviceValue = (e) => {
    setDeviceValue(e.target.value);
  };

  const getGroups = async () => {
    await axios.get(groupsLink).then(function (response) {
      setGroups(response.data);
    });
  };

  const getSubGroups = async () => {
    await axios.get(subgroupsLink).then(function (response) {
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
      .then(function (response) {
        console.log(response.data, "datatatat");
        setCurrentCondition(response.data);
        setLoading(true);
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
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getGroups();
    getSubGroups();
    getData();
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
    const inputDate = new Date().toDateString();
    const dateParts = inputDate.split("-");
    const dateObj = new Date(`${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`);
    const newDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setDateFrom(newDate);
    setDateTo(newDate);
  }, []);

  return (
    <>
      <div className="subtitle">
        {subtitle}
        <div className="add-button-position">
          {currentCondition.length > 0 && (
            <ExcelFile filename="Mjerenja" element={<ButtonExport />}>
              <ExcelSheet data={currentCondition} name="Mjerenja report">
                <ExcelColumn
                  label="ID"
                  value="int"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Loger ID"
                  value="idlogera"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Uređaj"
                  value="loger"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Vrijeme"
                  value="vrijeme"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Temperatura"
                  value="t"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Minimalna temperatura"
                  value="tmin"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Maksimalna temperatura"
                  value="tmax"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Vlažnost"
                  value="h"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Minimalna vlažnost"
                  value="hmin"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
                <ExcelColumn
                  label="Maksimalna vlažnost"
                  value="hmax"
                  headerStyle={{
                    font: { color: { rgb: "ffffff" } },
                    fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
                    width: { wpx: 125 },
                  }}
                />
              </ExcelSheet>
            </ExcelFile>
          )}
        </div>
      </div>
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
            required="required"
            className="select-style"
            onChange={handleDeviceValue}
          >
            <option hidden defaultValue="Odaberite uređaj">
              Odaberite uređaj
            </option>
            {data
              .sort((a, b) => a.id - b.id)
              .map((device, index) => {
                if (device.idklijenta === klijentID) {
                  if (
                    groupValue === 0 ||
                    parseInt(device.grupaid) === parseInt(groupValue)
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
          <select className="select-style" onChange={handleGroupValue}>
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
          <select className="select-style" onChange={handleSubGroupValue}>
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
      <div className="table-style">
        <table className="content-style">
          <tbody>
            <tr>
              {params.map((parameter, index) => {
                return (
                  <td className="device-table-info" key={index}>
                    {parameter}
                  </td>
                );
              })}
            </tr>
            {loading ? (
              currentItems.length === 0 ? (
                <tr className="no-data">nema podataka</tr>
              ) : (
                currentItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="device-table-info">
                        {item.vrijeme.slice(0, 11).replace("T", " ")}
                        {item.vrijeme.slice(11, 19)}
                      </td>
                      <td className="device-table-info font">{item.loger}</td>
                      <td className="device-table-info font">{item.t}</td>
                      <td className="device-table-info font">{item.h}</td>
                      <td className="device-table-info font">{item.tmin}</td>
                      <td className="device-table-info font">{item.tmax}</td>
                      <td className="device-table-info font">{item.hmin}</td>
                      <td className="device-table-info font">{item.hmax}</td>
                    </tr>
                  );
                })
              )
            ) : (
              ""
            )}
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

export default MeasuresFilter;
