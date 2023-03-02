import React, { useEffect, useState } from "react";
import "./TablicaUređaj.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

const TablicaUređaj = (props) => {
  const { data } = props;
  const [klijentID, setKlijentID] = useState();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
  });

  return (
    <div className="table-style">
      {props.title === "Uređaji" ? (
        <>
          <table className="content-style">
            <tbody>
              <tr>
                {props.params.params.map((parameter) => {
                  return (
                    <td className="device-table-info" key={parameter}>
                      {parameter}
                    </td>
                  );
                })}
              </tr>
              {currentItems.map((item) => {
                if (item.idklijenta === klijentID) {
                  return (
                    <tr key={data.id}>
                      <td className="device-table-info">{item.naziv}</td>
                      <td className="device-table-info font">{item.klijent}</td>
                      <td className="device-table-info font">{item.email1}</td>
                      <td className="device-table-info font">{item.email2}</td>
                      <td className="device-table-info font">{item.tmin}</td>
                      <td className="device-table-info font">{item.tmax}</td>
                      <td className="device-table-info font">{item.hmin}</td>
                      <td className="device-table-info font">{item.hmax}</td>

                      <td
                        className={`device-table-info font ${
                          item.active ? "active-user" : "non-active-user"
                        }`}
                      >
                        {item.active ? "Aktivan" : "Neaktivan"}
                      </td>
                      <td className="thead-style">
                        <Link
                          to={``}
                          // state={{
                          //   name: data.imePrezime,
                          //   username: data.ime,
                          //   title: { title },
                          //   subtitle: { subtitle },
                          //   editFormInfo: { editFormInfo },
                          // }}
                        ></Link>
                        <div>
                          <FontAwesomeIcon
                            title="Promijeni status"
                            className="actions-icon"
                            icon={faEllipsis}
                          />
                          <FontAwesomeIcon
                            title="Uredi"
                            className="actions-icon"
                            icon={faEdit}
                          />
                        </div>
                      </td>
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
      ) : (
        <tr>
          {props.params.params.map((parameter) => {
            return (
              <td className="device-table-info" key={parameter}>
                {parameter}
              </td>
            );
          })}
        </tr>
      )}
    </div>
  );
};

export default TablicaUređaj;
