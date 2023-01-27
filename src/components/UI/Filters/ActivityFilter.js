import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ActivityFilter = (props) => {
  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [deviceActivity, setDeviceActivity] = useState();
  const [subGroups, setSubGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  //const [filteredData, setFilteredData] = useState();

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [currentCondition, setCurrentCondition] = useState([]);

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    //console.log(groupValue);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    //console.log(subGroupValue);
  };

  const getCurrentCondition = async () => {
    const res = await axios
      .get("https://localhost:44336/api/Logeri/ProvjeraMjerenja", {
        //ispraviti
        //
        //
        data: {
          klijentID: 3,
          grupaId: groupValue,
          podgrupaId: subGroupValue,
        },
        //
        //
        //
      })
      .then(function(response) {
        setCurrentCondition(response.data);
      });
  };

  const getGroups = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/grupe/GetAll"
    );
    setGroups(data);
  };

  const getSubGroups = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/podgrupe/GetAll"
    );
    setSubGroups(data);
  };

  //   const handleFilteredData = () => {
  //     currentItems.map((device) => {
  //       if (
  //         parseInt(device.grupaid) === parseInt(groupValue) &&
  //         parseInt(device.podgrupaid) === parseInt(subGroupValue)
  //       ) {
  //         setFilteredData(device);
  //         // console.log(device.grupaid, "device");
  //         // console.log(groupValue, "value");
  //       }
  //     });
  //   };

  // const subCategoriesArr = categories.map((category, index) => {
  //   return(
  //     category.categories.map((cat, i) => {
  //       return(
  //         cat.subCategories.filter(val => {
  //           if (val.name.toLowerCase().includes(search.toLowerCase()))
  //             return val
  //         }).map(val => {
  //           return (
  //             <ul key={i} className="remove-bullets">
  //               <li className='company-services'>
  //                 <input
  //                   type='checkbox'
  //                   name={val.name}
  //                   value={val.name}
  //                   className="checkbox-margin"
  //                 />
  //                 {val.name}
  //               </li>
  //             </ul>
  //           )
  //         })
  //       )
  //     })
  //   )
  // })

  const items = currentItems.map((loger) => {
    return (
      <tr
        key={loger.id}
        className={`border-bottom ${loger.valid ? "" : "activity-valid"}`}
      >
        <td className="table-measure-data-name">
          <div className="table-activity-data-name">{loger.naziv}</div>
          <div className="manufactor-label">{loger.klijent}</div>
        </td>
        <td className="table-measure-data">
          {loger.vrijemeMjerenja !== null ? (
            <>
              {loger.vrijemeMjerenja.slice(0, 11).replace("T", " ")}
              {loger.vrijemeMjerenja.slice(11, 19)}
            </>
          ) : (
            ""
          )}
        </td>
        <td className="table-measure-data">{loger.tmin}</td>
        <td className="table-measure-data">{loger.tmax}</td>
        <td className="table-measure-data">{loger.hmin}</td>
        <td className="table-measure-data">{loger.hmax}</td>
      </tr>
    );
  });

  const filteredItems = currentItems.map((loger) => {
    if (
      parseInt(loger.grupaid) === parseInt(groupValue) &&
      parseInt(loger.podgrupaid) === parseInt(subGroupValue)
    ) {
      return (
        <tr
          key={loger.id}
          className={`border-bottom ${loger.valid ? "" : "activity-valid"}`}
        >
          <td className="table-measure-data-name">
            <div className="table-activity-data-name">{loger.naziv}</div>
            <div className="manufactor-label">{loger.klijent}</div>
          </td>
          <td className="table-measure-data">
            {loger.vrijemeMjerenja.slice(0, 11).replace("T", " ")}
            {loger.vrijemeMjerenja.slice(11, 19)}
          </td>
          <td className="table-measure-data">{loger.tmin}</td>
          <td className="table-measure-data">{loger.tmax}</td>
          <td className="table-measure-data">{loger.hmin}</td>
          <td className="table-measure-data">{loger.hmax}</td>
        </tr>
      );
    }
  });

  useEffect(() => {
    getGroups();
    getSubGroups();
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
              if (group.klijentId === 3) {
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
                subGroup.klijentId === 3 &&
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
          <button onClick={getCurrentCondition} className="button-style">
            Pretraži
          </button>
        </span>
      </div>
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

          {groupValue === 0 || subGroupValue === 0 ? items : filteredItems}

          {/* {currentItems.map((loger) => {
            if (loger.idklijenta === 3) {
              if (groupValue === 0 && subGroupValue === 0) {
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
              } else if (
                parseInt(loger.grupaid) === parseInt(groupValue) ||
                parseInt(loger.podgrupaid) === parseInt(subGroupValue)
              ) {
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
            }
          })} */}
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
    </div>
  );
};

export default ActivityFilter;
