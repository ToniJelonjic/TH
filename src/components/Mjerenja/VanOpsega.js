import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./VanOpsega.css";
import ReactPaginate from "react-paginate";

const mjerenjaCriticalLink = "/mjerenja/GetAllCritical";

const VanOpsega = ({ params }) => {
  const [klijentID, setKlijentID] = useState();

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
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
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
    <div className="params-style">
      <>
        <table className="table-width">
          <tbody>
            <tr className="border-bottom">
              {params.map((parameter, index) => {
                return (
                  <th className="th-desc-style" key={index}>
                    {parameter}
                  </th>
                );
              })}
            </tr>

            {currentItems.map((loger, index) => {
              return (
                <tr key={index} className="border-bottom">
                  <td className="table-measure-data-name">{loger.loger}</td>
                  <td className="table-measure-data">
                    {loger.vrijeme.slice(0, 11).replace("T", " ")}
                    {loger.vrijeme.slice(11, 19)}
                  </td>
                  <td
                    className={`table-measure-data ${
                      !loger.validTMin || !loger.validTMax ? "out-of-range" : ""
                    }`}
                  >
                    {loger.t}
                  </td>
                  <td className="table-measure-data">{loger.tmin}</td>
                  <td className="table-measure-data">{loger.tmax}</td>
                  <td
                    className={`table-measure-data ${
                      !loger.validHMin || !loger.validHMax ? "out-of-range" : ""
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
    </div>
  );
};

export default VanOpsega;
