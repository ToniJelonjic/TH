import React, { useState, useEffect } from "react";
import "./Warehouse.css";
import goodT from "../../images/goodT.png";
import badT from "../../images/badT.png";
import goodH from "../../images/goodH.png";
import badH from "../../images/badH.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Warehouse = (props) => {
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
      });
  };

  useEffect(() => {
    getCurrentCondition();
    //console.log(currentCondition, "current");
  }, []);

  return (
    <div className="row devices-padding">
      {currentCondition.map((device) => {
        return (
          <div className="col-lg-3 col-md-4 col-12 device-styles">
            <div className="">
              <div className="row">
                <h4 className="col-lg-10 col-md-10 col-10 device-title">
                  {device.naziv}
                </h4>
                <div className="col-lg-2 col-md-2 col-2 download-style">
                  <FontAwesomeIcon className="icons-style" icon={faDownload} />
                </div>
              </div>
              <span className="device-date">{device.vrijemeMjerenja}</span>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-6 align-items">
                  {/* if temp > blabla ? goodt : badt */}
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
              <div className="row"></div>
              <div className="device-status">Pregledaj stanje</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Warehouse;
