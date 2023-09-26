import React, { useState, useEffect, useRef } from "react";
import "./MeasuresFilter.css";
import axios from "../../../api/axios";
import ReactPaginate from "react-paginate";
import ReactExport from "react-data-export";
import ButtonExport from "../Buttons/ButtonExport";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/fontawesome-free-solid";

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
  const [dataExport, setDataExport] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Attach event listener when the component mounts
    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (evt) => {
    const flyoutElement = document.getElementById("myMultiselect");
    let targetElement = evt.target; // Clicked element

    do {
      if (targetElement === flyoutElement) {
        // Click inside the multiselect. Do nothing, just return.
        return;
      }

      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);

    // Click outside the multiselect.
    //toggleCheckboxArea(true);
  };

  const checkboxStatusChange = () => {
    // Update selectedValues based on checked checkboxes
    const checkboxes = document.getElementById("mySelectOptions");
    const checkedCheckboxes = checkboxes.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    const values = Array.from(checkedCheckboxes).map((item) =>
      item.getAttribute("value")
    );

    const dropdownValue =
      values.length > 0 ? values.join(", ") : "Nothing is selected";

    setSelectedValues(values);

    // Update the text in the select box
    const multiselectOption = document
      .getElementById("mySelectLabel")
      .getElementsByTagName("option")[0];
    multiselectOption.innerText = dropdownValue;
  };

  // const toggleCheckboxArea = (onlyHide = false) => {
  //   const checkboxes = document.getElementById("mySelectOptions");
  //   const displayValue = checkboxes.style.display;

  //   if (displayValue !== "block") {
  //     if (!onlyHide) {
  //       checkboxes.style.display = "block";
  //     }
  //   } else {
  //     checkboxes.style.display = "none";
  //   }
  // };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    // Update the selected values state with the selected options
    setSelectedValues(selectedOptions);
  };

  const klijentID = JSON.parse(localStorage.getItem("klijentID"));
  const subtitle = "Mjerenja";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const multiselect = document.getElementById("myMultiselect");
    if (multiselect && !multiselect.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const handleCheckboxChange = (value) => {
    const isSelected = selectedValues.includes(value);
    if (isSelected) {
      setSelectedValues(
        selectedValues.filter((selectedValue) => selectedValue !== value)
      );
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  // const checkboxStatusChange = () => {
  //   return selectedValues.length > 0
  //     ? selectedValues.join(", ")
  //     : "Nothing is selected";
  // };

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
  const [deviceValues, setDeviceValues] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(logeriLink);
    setData(data);
  };

  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [subGroups, setSubGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleCheckboxChange = (e, id) => {
  //   console.log(e.target.checked);
  //   const checked = e.target.checked;
  //   if (checked) {
  //     // Add the ID to the selectedIds array if it's checked
  //     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
  //   } else {
  //     // Remove the ID from the selectedIds array if it's unchecked
  //     setSelectedIds((prevSelectedIds) =>
  //       prevSelectedIds.filter((selectedId) => selectedId !== id)
  //     );
  //   }
  // };

  // const handleSelected = (id) => {
  //   // Check if the ID is already in the selectedIds array
  //   const isSelected = selectedIds.includes(id);

  //   // If it's selected, remove it; if it's not selected, add it
  //   if (isSelected) {
  //     setSelectedIds((prevSelectedIds) =>
  //       prevSelectedIds.filter((selectedId) => selectedId !== id)
  //     );
  //   } else {
  //     setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
  //   }
  // };

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    console.log(e.target.value);
  };

  const handleDeviceValue = (e) => {
    setDeviceValue(e.target.value);
    console.log(e.target.value);
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
    const queryParams = new URLSearchParams({
      datumOd: dateFrom,
      datumDo: dateTo,
      grupaID: groupValue,
      podgrupaID: subGroupValue,
    });

    selectedValues.forEach((id) => {
      queryParams.append("logerID", id);
    });

    const measuresFilterLinkWithQuery = `${measuresFilterLink}?${queryParams.toString()}`;

    try {
      setLoading(true);
      console.log(loading, "true");
      const response = await axios.get(measuresFilterLinkWithQuery);
      console.log(response.data, "data");
      setCurrentCondition(response.data);
      setDataExport(response.data);
      //generateChartData(response.data);
      setLoading(false);
      console.log(loading, "false");
    } catch (error) {
      console.error(error);
      setErrMsg("Niste odabrali nijedan uređaj.");
    }
  };

  // const getFilteredResults = async () => {
  //   await axios
  //     .get(measuresFilterLink, {
  //       params: {
  //         datumOd: dateFrom,
  //         datumDo: dateTo,
  //         logerID: selectedIds,
  //         grupaID: groupValue,
  //         podgrupaID: subGroupValue,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(params, "params then");
  //       console.log(response.data, "data");
  //       setCurrentCondition(response.data);
  //       setDataExport(response.data);
  //       setLoading(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setErrMsg("Niste odabrali nijedan uređaj.");
  //     });
  // };

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [currentCondition, setCurrentCondition] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(currentCondition.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(currentCondition.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentCondition]);

  useEffect(() => {
    console.log(selectedValues, "ids");
  }, [selectedValues]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentCondition.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getGroups();
    getSubGroups();
    getData();
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
    console.log(newDate);
  }, []);

  const styles = {
    header: {
      fill: {
        fgColor: {
          rgb: "3461eb",
        },
      },
      font: {
        color: {
          rgb: "ffffff",
        },
        sz: 14,
        bold: true,
      },
    },
  };

  const PDFexport = async () => {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.autoTable({
      html: "#my-table",
    });
    doc.save(`Mjerenja_od_${dateFrom}_do_${dateTo}`);
  };

  const chartData = dataExport || []; // Make sure chartData is an array

  const firstTimestamp =
    chartData.length > 0 ? chartData[chartData.length - 1].vrijeme : "";
  const lastTimestamp = chartData.length > 0 ? chartData[0].vrijeme : "";

  const startingDate = new Date(firstTimestamp);
  const endingDate = new Date(lastTimestamp);

  const formattedStartingDate = `${startingDate.toLocaleDateString()} ${startingDate.toLocaleTimeString()}`;
  const formattedEndingDate = `${endingDate.toLocaleDateString()} ${endingDate.toLocaleTimeString()}`;
  return (
    <>
      {/* <table className="table table-bordered display-none" id="my-table">
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
      <div className="subtitle">
        {subtitle}
        <div className="add-button-position">
          {dataExport.length > 0 && (
            <>
              <button onClick={PDFexport} className="button-pdf-style">
                Download PDF
              </button>
              <ExcelFile
                filename={`Mjerenja_${dateFrom}_${dateTo}`}
                element={<ButtonExport />}
              >
                <ExcelSheet
                  headerStyle={styles.header}
                  data={dataExport}
                  name="Mjerenja report"
                >
                  <ExcelColumn className="excel-style" label="ID" value="int" />
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
            </>
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
        <span className="span-button-style">
          <button onClick={getFilteredResults} className="button-style">
            Pretraži
          </button>
        </span>
      </div>
      <div className="params-style">
        <table className="content-style table-width">
          <tbody>
            <tr className="tr-style">
              {params.map((parameter, index) => {
                return (
                  <td className="thead-style-header" key={index}>
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
                    <tr className="tr-style" key={index}>
                      <td className="thead-style-content">
                        {item.vrijeme.slice(0, 11).replace("T", " ")}
                        {item.vrijeme.slice(11, 19)}
                      </td>
                      <td className="thead-style-content">{item.loger}</td>
                      <td className="thead-style-content">{item.t}</td>
                      <td className="thead-style-content">{item.tmin}</td>
                      <td className="thead-style-content">{item.tmax}</td>
                      <td className="thead-style-content">{item.h}</td>
                      <td className="thead-style-content">{item.hmin}</td>
                      <td className="thead-style-content">{item.hmax}</td>
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
      {deviceValue ? (
        ""
      ) : (
        <div className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</div>
      )}

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
      </div> */}
      {
        //break
      }
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
            dataExport
              .slice()
              .sort((a, b) => a.idlogera - b.idlogera)
              .map((item) => {
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
      <div className="subtitle row">
        <div className="col-6 col-lg-10">{subtitle}</div>
        <div className="col-6 col-lg-2 ">
          {dataExport.length > 0 && (
            <>
              <div className="row">
                <div className="col-6 col-lg-6 buttons-right">
                  <button onClick={PDFexport} className="button-pdf-style">
                    PDF
                    <FontAwesomeIcon
                      className="download-icon-style"
                      icon={faDownload}
                    />
                  </button>
                </div>
                <div className="col-6 col-lg-6 buttons-right">
                  <ExcelFile
                    filename={`Mjerenja_od_${dateFrom}_do_${dateTo}`}
                    element={<ButtonExport />}
                  >
                    <ExcelSheet
                      headerStyle={styles.header}
                      data={dataExport}
                      name="Mjerenja report"
                    >
                      <ExcelColumn
                        className="excel-style"
                        label="ID"
                        value="int"
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
            </>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 measure-div">
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
          </span>
          <div className="mt-10">
            <span>
              <select className="measures-select" onChange={handleGroupValue}>
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
                className="measures-select"
                onChange={handleSubGroupValue}
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

              {/* <div className="form-group col-sm-8">
            <label htmlFor="myMultiselect">BS custom multiselect</label>
            <div id="myMultiselect" className="multiselect">
              <div
                id="mySelectLabel"
                className={`selectBox ${isOpen ? "open" : ""}`}
                onClick={toggleDropdown}
              >
                <select className="form-select">
                  <option>{checkboxStatusChange()}</option>
                </select>
                <div className="overSelect"></div>
              </div>
              <div
                id="mySelectOptions"
                className={`options ${isOpen ? "open" : ""}`}
              >
                {data.map((option, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={option}
                      onChange={() => handleCheckboxChange(option)}
                      checked={selectedValues.includes(option)}
                    />{" "}
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div> */}

              {/* <div className={`multiselect ${isOpen ? "open" : ""}`}>
            <div className="selectBox" onClick={toggleDropdown}>
              <select className="form-select">
                <option>
                  {selectedValues.length > 0
                    ? selectedValues.join(", ")
                    : "Nothing is selected"}
                </option>
              </select>
              <div className="overSelect"></div>
            </div>
            <div id="mySelectOptions">
              {data
                .filter(
                  (device) =>
                    device.idklijenta === klijentID &&
                    (!groupValue ||
                      parseInt(device.grupaid) === parseInt(groupValue)) &&
                    (!subGroupValue ||
                      parseInt(device.podgrupaid) === parseInt(subGroupValue))
                )
                .sort((a, b) => a.id - b.id)
                .map((device, index) => {
                  return (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={device.id}
                        onChange={() => handleCheckboxChange(device.id)}
                        checked={selectedValues.includes(device.id)}
                      />{" "}
                      {device.naziv}
                    </label>
                  );
                })}
            </div>
          </div> */}

              {/* <div className="form-group col-sm-8">
            <label htmlFor="myMultiselect"></label>
            <div
              id="myMultiselect"
              className={`multiselect ${isOpen ? "open" : ""}`}
            >
              <div
                id="mySelectLabel"
                className="selectBox"
                onClick={toggleDropdown}
              >
                <select className="form-select">
                  <option>{checkboxStatusChange()}</option>
                </select>
                <div className="overSelect"></div>
              </div>
              <div
                id="mySelectOptions"
                className={`options ${isOpen ? "open" : ""}`}
              >
                {data
                  .filter(
                    (device) =>
                      device.idklijenta === klijentID &&
                      (!groupValue ||
                        parseInt(device.grupaid) === parseInt(groupValue)) &&
                      (!subGroupValue ||
                        parseInt(device.podgrupaid) === parseInt(subGroupValue))
                  )
                  .sort((a, b) => a.id - b.id)
                  .map((device, index) => {
                    return (
                      <label key={index}>
                        <input
                          type="checkbox"
                          value={device.id}
                          onChange={() => handleCheckboxChange(device.id)}
                          checked={selectedValues.includes(device.id)}
                        />{" "}
                        {device.naziv}
                      </label>
                    );
                  })}
              </div>
            </div>
          </div> */}
              <div>
                <select
                  className="devices-select"
                  multiple
                  onChange={(e) => handleSelectChange(e)}
                  value={selectedValues}
                >
                  <option className="devices-label-style" value="" disabled>
                    Uređaji
                  </option>
                  {data
                    .filter(
                      (device) =>
                        device.idklijenta === klijentID &&
                        (!groupValue ||
                          parseInt(device.grupaid) === parseInt(groupValue)) &&
                        (!subGroupValue ||
                          parseInt(device.podgrupaid) ===
                            parseInt(subGroupValue))
                    )
                    .sort((a, b) => a.id - b.id)
                    .map((device, index) => (
                      <option key={index} value={device.id}>
                        {device.naziv}
                      </option>
                    ))}
                </select>
              </div>
              {/* {data
            .filter(
              (device) =>
                device.idklijenta === klijentID &&
                (!groupValue ||
                  parseInt(device.grupaid) === parseInt(groupValue)) &&
                (!subGroupValue ||
                  parseInt(device.podgrupaid) === parseInt(subGroupValue))
            )
            .sort((a, b) => a.id - b.id)
            .map((device, index) => {
              if (index % 6 === 0) {
                return (
                  <div className="row" key={index}>
                    {data.slice(index, index + 6).map((device, innerIndex) => (
                      <div className="col-lg-2 col-6" key={innerIndex}>
                        <label className="devices-checkbox">
                          <div>
                            <input
                              type="checkbox"
                              value={device.id}
                              onChange={(e) =>
                                handleCheckboxChange(e, device.id)
                              }
                            />
                            {device.naziv}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                );
              }
            })} */}
            </span>
          </div>
          <div className="div-button-style">
            <button
              onClick={getFilteredResults}
              className="search-button-style"
            >
              Pretraži
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6 bg-fff">
          {dataExport && dataExport.length > 0 && (
            <div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={800}
                    height={400}
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="loger"
                      name="Loger"
                      stroke="#008000"
                    />
                    <Line
                      type="monotone"
                      dataKey="t"
                      name="Temperatura"
                      stroke="#FF5733"
                    />
                    <Line
                      type="monotone"
                      dataKey="h"
                      name="Vlažnost"
                      stroke="#3366FF"
                    />
                    {/* <Line
                      type="monotone"
                      dataKey="vrijeme"
                      name="Vrijeme"
                      stroke="#3366FF"
                    /> */}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="content-center">
                <p>Od: {formattedStartingDate}</p>
                <p>Do: {formattedEndingDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="params-style">
        <table className="content-style table-width">
          <tbody>
            <tr className="tr-style">
              {params.map((parameter, index) => {
                return (
                  <td className="thead-style-header" key={index}>
                    {parameter}
                  </td>
                );
              })}
            </tr>
            {!loading ? (
              currentItems.length === 0 ? (
                <tr className="no-data">nema podataka</tr>
              ) : (
                currentItems
                  .slice()
                  .sort((a, b) => a.idlogera - b.idlogera)
                  .map((item, index) => (
                    <tr className="tr-style" key={index}>
                      <td className="thead-style-content">
                        {item.vrijeme.slice(0, 11).replace("T", " ")}
                        {item.vrijeme.slice(11, 19)}
                      </td>
                      <td className="thead-style-content">{item.loger}</td>
                      <td className="thead-style-content">{item.t}</td>
                      <td className="thead-style-content">{item.tmin}</td>
                      <td className="thead-style-content">{item.tmax}</td>
                      <td className="thead-style-content">{item.h}</td>
                      <td className="thead-style-content">{item.hmin}</td>
                      <td className="thead-style-content">{item.hmax}</td>
                    </tr>
                  ))
              )
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>

      {deviceValue ? (
        ""
      ) : (
        <div className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</div>
      )}

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

export default MeasuresFilter;
