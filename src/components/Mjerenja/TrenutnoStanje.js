import React, { useState, useEffect } from "react";
import "./TrenutnoStanje.css";
import goodT from "../../images/goodT.png";
import badT from "../../images/badT.png";
import goodH from "../../images/goodH.png";
import badH from "../../images/badH.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import axios from "../../api/axios";
import ReactExport from "react-data-export";
import jsPDF from "jspdf";
import "jspdf-autotable";

const logeriTrenutnoStanjeLink = "/logeri/TrenutnoStanje";
const measuresFilterLink = "/mjerenja/GetAll";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Warehouse = () => {
  const klijentID = JSON.parse(localStorage.getItem("klijentID"));
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

  const exportCSVData = async (id) => {
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
          document.getElementById("csv").click();
        }, 700);
      });
  };

  const exportPDFData = async (id) => {
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
          document.getElementById("pdf").click();
        }, 700);
      });
  };

  useEffect(() => {
    getCurrentCondition();
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
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  const PDFexport = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.autoTable({
      html: "#my-table",
    });
    doc.save(`Mjerenja_${todaysDate}`);
  };

  return (
    <div className="row devices-padding">
      <table className="table table-bordered display-none" id="my-table">
        <thead style={{ background: "yellow" }}>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Loger ID</th>
            <th scope="col">Uredjaj</th>
            <th scope="col">Vrijeme</th>
            <th scope="col">Temperatura</th>
            <th scope="col">Minimalna temperatura</th>
            <th scope="col">Maksimalna temperatura</th>
            <th scope="col">Vlažnost</th>
            <th scope="col">Minimalna vlažnost</th>
            <th scope="col">Maksimalna vlažnost</th>
          </tr>
        </thead>
        <tbody>
          {dataExport &&
            dataExport.map((item) => {
              return (
                <tr key={item.int}>
                  <td>{item.int}</td>
                  <td>{item.idlogera}</td>
                  <td>{item.loger}</td>
                  <td>
                    {item.vrijeme.slice(0, 11).replace("T", " ")}
                    {item.vrijeme.slice(11, 19)}
                  </td>
                  <td>{item.t}</td>
                  <td>{item.tmin}</td>
                  <td>{item.tmax}</td>
                  <td>{item.h}</td>
                  <td>{item.hmin}</td>
                  <td>{item.hmax}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {currentItems.map((device, index) => {
        if (device.idklijenta === klijentID) {
          return (
            <div key={index} className="col-lg-3 col-md-4 col-12 device-styles">
              <div className="">
                <div className="row">
                  <h4 className="col-lg-9 col-md-9 col-9 device-title">
                    {device.naziv}
                  </h4>
                  <div className="col-lg-3 col-md-3 col-3 download-style">
                    <FontAwesomeIcon
                      title="Export PDF"
                      className="download-pdf-icon-style"
                      value={device.id}
                      icon={faFilePdf}
                      onClick={() => exportPDFData(device.id)}
                    />

                    <button
                      className="display-none"
                      id="pdf"
                      onClick={PDFexport}
                    >
                      Download PDF
                    </button>
                    <FontAwesomeIcon
                      title="Export CSV"
                      className="download-csv-icon-style"
                      icon={faFileCsv}
                      value={device.id}
                      onClick={() => exportCSVData(device.id)}
                    />
                    <ExcelFile
                      filename={`Mjerenja_${todaysDate}`}
                      element={
                        <button id="csv" className="display-none">
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
      <div className="paginate-div-style-devices">
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

export default Warehouse;
