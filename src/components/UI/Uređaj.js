import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Uređaj.css";
import ReactPaginate from "react-paginate";

const Uređaj = (props) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [currentCondition, setCurrentCondition] = useState([]);
  const getCurrentCondition = async () => {
    const res = await axios
      .get(
        props.subtitle === "Pregled mjerenja van opsega"
          ? "https://localhost:44336/api/Mjerenja/GetAllCritical"
          : "https://localhost:44336/api/Logeri/ProvjeraMjerenja",
        {
          //ispraviti
          //
          //
          data:
            props.subtitle === "Pregled mjerenja van opsega"
              ? { klijentID: 3 }
              : { klijentID: 3, grupaId: 0, podgrupaId: 0 },
          //
          //
          //
        }
      )
      .then(function(response) {
        setCurrentCondition(response.data);
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
    <div className="params-style">
      {props.subtitle === "Pregled mjerenja van opsega" ? (
        <>
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

              {currentItems.map((loger) => {
                return (
                  <tr key={loger.id} className="border-bottom">
                    <td className="table-measure-data-name">{loger.loger}</td>
                    <td className="table-measure-data">
                      {loger.vrijeme.slice(0, 11).replace("T", " ")}
                      {loger.vrijeme.slice(11, 19)}
                    </td>
                    <td
                      className={`table-measure-data ${
                        !loger.validTMin || !loger.validTMax
                          ? "out-of-range"
                          : ""
                      }`}
                    >
                      {loger.t}
                    </td>
                    <td className="table-measure-data">{loger.tmin}</td>
                    <td className="table-measure-data">{loger.tmax}</td>
                    <td
                      className={`table-measure-data ${
                        !loger.validHMin || !loger.validHMax
                          ? "out-of-range"
                          : ""
                      }`}
                    >
                      {loger.h}
                    </td>
                    <td className="table-measure-data">{loger.hmin}</td>
                    <td className="table-measure-data">{loger.hmax}</td>
                  </tr>
                );
              })}
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
        </>
      ) : (
        <>
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

              {currentItems.map((loger) => {
                if (loger.idklijenta === 3) {
                  return (
                    <tr
                      key={loger.id}
                      className={`border-bottom ${
                        loger.valid ? "" : "activity-valid"
                      }`}
                    >
                      <td className="table-measure-data-name">
                        <div className="table-activity-data-name">
                          {loger.naziv}
                        </div>
                        <div className="manufactor-label">{loger.klijent}</div>
                      </td>
                      <td className="table-measure-data">
                        {loger.vrijemeMjerenja}
                      </td>
                      <td className="table-measure-data">{loger.tmin}</td>
                      <td className="table-measure-data">{loger.tmax}</td>
                      <td className="table-measure-data">{loger.hmin}</td>
                      <td className="table-measure-data">{loger.hmax}</td>
                    </tr>
                  );
                }
              })}
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
        </>
      )}

      {/*  <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr>

      <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data out-of-range">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr>

      <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr>

      <tr className="border-bottom">
        <td className="table-measure-data-name">MO4</td>
        <td className="table-measure-data">30.09.2022. 15:01:45</td>
        <td className="table-measure-data">20.3</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">25</td>
        <td className="table-measure-data">94.7</td>
        <td className="table-measure-data">10</td>
        <td className="table-measure-data">90</td>
      </tr> */}

      {/* PREGLED AKTIVNOSTI UREDJAJA */}

      {/* <tr className="border-bottom background-activity">
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">CDS-620</div>
            <div className="manufactor-label">Hercegovinalijek</div>
          </td>
          <td className="table-measure-data">30.09.2022. 15:01:45</td>
          <td className="table-measure-data">20.3</td>
          <td className="table-measure-data">10</td>
          <td className="table-measure-data">25</td>
          <td className="table-measure-data">94.7</td>
        </tr>

        <tr className="border-bottom">
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">CDS-620</div>
            <div className="manufactor-label">Hercegovinalijek</div>
          </td>
          <td className="table-measure-data">30.09.2022. 15:01:45</td>
          <td className="table-measure-data">20.3</td>
          <td className="table-measure-data">10</td>
          <td className="table-measure-data">25</td>
          <td className="table-measure-data">94.7</td>
        </tr>

        <tr className="border-bottom">
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">CDS-620</div>
            <div className="manufactor-label">Hercegovinalijek</div>
          </td>
          <td className="table-measure-data">30.09.2022. 15:01:45</td>
          <td className="table-measure-data">20.3</td>
          <td className="table-measure-data">10</td>
          <td className="table-measure-data">25</td>
          <td className="table-measure-data">94.7</td>
        </tr>

        <tr className="border-bottom">
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">CDS-620</div>
            <div className="manufactor-label">Hercegovinalijek</div>
          </td>
          <td className="table-measure-data">30.09.2022. 15:01:45</td>
          <td className="table-measure-data">20.3</td>
          <td className="table-measure-data">10</td>
          <td className="table-measure-data">25</td>
          <td className="table-measure-data">94.7</td>
        </tr> */}
    </div>
  );
};

export default Uređaj;
