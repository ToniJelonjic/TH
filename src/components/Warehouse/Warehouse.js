import React, { useState, useEffect } from "react";
import "./Warehouse.css";
import goodT from "../../images/goodT.png";
import badT from "../../images/badT.png";
import goodH from "../../images/goodH.png";
import badH from "../../images/badH.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Warehouse = () => {
  let klijentID = JSON.parse(localStorage.getItem("klijentID"));

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;
  const [currentCondition, setCurrentCondition] = useState([]);
  const getCurrentCondition = async () => {
    const res = await axios
      .get("https://localhost:44336/api/logeri/TrenutnoStanje", {
        //ispraviti
        //
        //
        data: { klijentID: 3 },
        //
        //
        //
      })
      .then(function(response) {
        setCurrentCondition(response.data);
        //console.log(response.data, "ddd");
      });
  };

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
      {currentItems.map((device) => {
        if (device.idklijenta === klijentID) {
          return (
            <div
              key={device.id}
              className="col-lg-3 col-md-4 col-12 device-styles"
            >
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
                    />
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
