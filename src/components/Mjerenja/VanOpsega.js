import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./VanOpsega.css";
import ReactPaginate from "react-paginate";

const mjerenjaCriticalLink = "/mjerenja/GetAllCritical";

const VanOpsega = ({ params }) => {
  const klijentID = JSON.parse(localStorage.getItem("klijentID"));

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [currentCondition, setCurrentCondition] = useState([]);
  const getCurrentCondition = async () => {
    await axios
      .get(mjerenjaCriticalLink, {
        data: { klijentID: klijentID },
      })
      .then(function (response) {
        setCurrentCondition(response.data);
      });
  };

  useEffect(() => {
    getCurrentCondition();
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

  return (
    <div className="params-style">
      <>
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

            {currentItems.map((loger, index) => {
              return (
                <tr key={index} className="border-bottom">
                  <td className="thead-style-content">{loger.loger}</td>
                  <td className="thead-style-content">
                    {loger.vrijeme.slice(0, 11).replace("T", " ")}
                    {loger.vrijeme.slice(11, 19)}
                  </td>
                  <td
                    className={`thead-style-content ${
                      !loger.validTMin || !loger.validTMax ? "out-of-range" : ""
                    }`}
                  >
                    {loger.t}
                  </td>
                  <td className="thead-style-content">{loger.tmin}</td>
                  <td className="thead-style-content">{loger.tmax}</td>
                  <td
                    className={`thead-style-content ${
                      !loger.validHMin || !loger.validHMax ? "out-of-range" : ""
                    }`}
                  >
                    {loger.h}
                  </td>
                  <td className="thead-style-content">{loger.hmin}</td>
                  <td className="thead-style-content">{loger.hmax}</td>
                </tr>
              );
            })}
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
      </>
    </div>
  );
};

export default VanOpsega;
