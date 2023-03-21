import React, { useState, useEffect } from "react";
import "./TrenutnoStanje.css";
import goodT from "../../images/goodT.png";
import badT from "../../images/badT.png";
import goodH from "../../images/goodH.png";
import badH from "../../images/badH.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import axios from "../../api/axios";
import ReactExport from "react-data-export";

const logeriTrenutnoStanjeLink = "/logeri/TrenutnoStanje";
const measuresFilterLink = "/mjerenja/GetAll";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Warehouse = () => {
  const [klijentID, setKlijentID] = useState();
  const [todaysDate, setTodaysDate] = useState();
  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [deviceValue, setDeviceValue] = useState();
  const [dataExport, setDataExport] = useState();

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;
  const [currentCondition, setCurrentCondition] = useState([]);
  const getCurrentCondition = async () => {
    await axios
      .get(logeriTrenutnoStanjeLink, {
        data: { klijentID: klijentID },
      })
      .then(function (response) {
        setCurrentCondition(response.data);
      });
  };

  const exportData = async (id) => {
    await axios
      .get(measuresFilterLink, {
        params: {
          datumOd: todaysDate,
          datumDo: todaysDate,
          logerID: id,
          grupaID: groupValue,
          podgrupaID: subGroupValue,
        },
      })
      .then(function (response) {
        setDataExport(response.data);
        setTimeout(() => {
          document.getElementById("export").click();
        }, 700);
      });
  };

  useEffect(() => {
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
    const inputDate = new Date().toDateString();
    const dateParts = inputDate.split("-");
    const dateObj = new Date(`${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`);
    const newDate = dateObj.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    setTodaysDate(newDate);
  }, []);

  useEffect(() => {
    getCurrentCondition();
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="row devices-padding">
      {currentItems.map((device, index) => {
        if (device.idklijenta === klijentID) {
          return (
            <div key={index} className="col-lg-3 col-md-4 col-12 device-styles">
              <div className="">
                <div className="row">
                  <h4 className="col-lg-10 col-md-10 col-10 device-title">
                    {device.naziv}
                  </h4>
                  <div className="col-lg-2 col-md-2 col-2 download-style">
                    <FontAwesomeIcon
                      title="Export u Excel"
                      className="download-icon-style"
                      icon={faDownload}
                      value={device.id}
                      onClick={() => exportData(device.id)}
                    />
                    <ExcelFile
                      filename={`Mjerenja_${todaysDate}`}
                      element={
                        <button id="export" className="display-none">
                          Download
                        </button>
                      }
                      data={dataExport}
                    >
                      <ExcelSheet data={dataExport} name="Mjerenja report">
                        <ExcelColumn
                          label="ID"
                          value="int"
                          style={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Loger ID"
                          value="idlogera"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Uređaj"
                          value="loger"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Vrijeme"
                          value="vrijeme"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Temperatura"
                          value="t"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Minimalna temperatura"
                          value="tmin"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Maksimalna temperatura"
                          value="tmax"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Vlažnost"
                          value="h"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Minimalna vlažnost"
                          value="hmin"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                        <ExcelColumn
                          label="Maksimalna vlažnost"
                          value="hmax"
                          headerStyle={{
                            font: { color: { rgb: "ffffff" } },
                            fill: {
                              patternType: "solid",
                              fgColor: { rgb: "3461eb" },
                            },
                            width: { wpx: 125 },
                          }}
                        />
                      </ExcelSheet>
                    </ExcelFile>
                  </div>
                </div>
                <span className="device-date">
                  {device.vrijemeMjerenja.slice(0, 11).replace("T", " ")}
                  {device.vrijemeMjerenja.slice(11, 19)}
                </span>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-6 align-items">
                    <div>
                      <img
                        className="t-style"
                        src={device.validT ? goodT : badT}
                        alt=""
                      ></img>
                    </div>

                    <div className="device-temp-style">{device.t}</div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-6 align-items">
                    <div>
                      <img
                        className="t-style"
                        src={device.validH ? goodH : badH}
                        alt=""
                      ></img>
                    </div>
                    <div className="device-temp-style">{device.h}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="align-items col-lg-6 col-md-6 col-6">
                    Raspon (T)
                  </div>
                  <div className="align-items col-lg-6 col-md-6 col-6">
                    Raspon (H)
                  </div>
                </div>
                <div className="row">
                  <div className="align-items col-lg-6 col-md-6 col-6">
                    {device.tmin} - {device.tmax}
                  </div>
                  <div className="align-items col-lg-6 col-md-6 col-6">
                    {device.hmin} - {device.hmax}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
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

export default Warehouse;
