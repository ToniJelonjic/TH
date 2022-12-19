import React from "react";
import "./Warehouse.css";
import goodT from "../../images/goodT.png";
import badT from "../../images/badT.png";
import goodH from "../../images/goodH.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsDownToLine } from "@fortawesome/free-solid-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";


const Warehouse = (props) => {
  return (
    <div className="row devices-padding">
      <div className="col-lg-3 col-md-4 col-12 device-styles">
        <div className="row">
          <h4 className="col-lg-10 col-md-10 col-10 device-title">CDS-601</h4>
          <div className="col-lg-2 col-md-2 col-2 download-style">
            <img src={faArrowsDownToLine}></img>
          </div>
        </div>
        <span className="device-date">5.7.2021. 21:15:59</span>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-6 align-items">
            {/* if temp > blabla ? goodt : badt */}
            <div>
              <img className="t-style" src={goodT} alt=""></img>
            </div>

            <div className="device-temp-style">5.0</div>
          </div>
          <div className="col-lg-6 col-md-6 col-6 align-items">
            <div>
              <img className="t-style" src={goodH} alt=""></img>
            </div>
            <div className="device-temp-style">99.9</div>
          </div>
        </div>
        <div className="row"></div>
        <div className="device-status">Pregledaj stanje</div>
      </div>

      <div className="col-lg-3 col-md-4 col-12 device-styles">
        <div className="row">
          <h4 className="col-lg-10 col-md-10 col-10 device-title">CDS-601</h4>
          <div className="col-lg-2 col-md-2 col-2 download-style">
            <img src={faComputer}></img>
          </div>
        </div>
        <span className="device-date">5.7.2021. 21:15:59</span>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-6 align-items">
            {/* if temp > blabla ? goodt : badt */}
            <div>
              <img className="t-style" src={goodT} alt=""></img>
            </div>

            <div className="device-temp-style">5.0</div>
          </div>
          <div className="col-lg-6 col-md-6 col-6 align-items">
            <div>
              <img className="t-style" src={goodH} alt=""></img>
            </div>
            <div className="device-temp-style">99.9</div>
          </div>
        </div>
        <div className="row"></div>
        <div className="device-status">Pregledaj stanje</div>
      </div>

      <div className="col-lg-3 col-md-4 col-12 device-styles">
        <div className="row">
          <h4 className="col-lg-10 col-md-10 col-10 device-title">CDS-601</h4>
          <div className="col-lg-2 col-md-2 col-2 download-style">
            <img src={faArrowsDownToLine}></img>
          </div>
        </div>
        <span className="device-date">5.7.2021. 21:15:59</span>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-6 align-items">
            {/* if temp > blabla ? goodt : badt */}
            <div>
              <img className="t-style" src={goodT} alt=""></img>
            </div>

            <div className="device-temp-style">5.0</div>
          </div>
          <div className="col-lg-6 col-md-6 col-6 align-items">
            <div>
              <img className="t-style" src={goodH} alt=""></img>
            </div>
            <div className="device-temp-style">99.9</div>
          </div>
        </div>
        <div className="row"></div>
        <div className="device-status">Pregledaj stanje</div>
      </div>

      <div className="col-lg-3 col-md-4 col-12 device-styles">
        <div className="row">
          <h4 className="col-lg-10 col-md-10 col-10 device-title">CDS-601</h4>
          <div className="col-lg-2 col-md-2 col-2 download-style">
            <img src={faArrowsDownToLine}></img>
          </div>
        </div>
        <span className="device-date">5.7.2021. 21:15:59</span>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-6 align-items">
            {/* if temp > blabla ? goodt : badt */}
            <div>
              <img className="t-style" src={goodT} alt=""></img>
            </div>

            <div className="device-temp-style">5.0</div>
          </div>
          <div className="col-lg-6 col-md-6 col-6 align-items">
            <div>
              <img className="t-style" src={goodH} alt=""></img>
            </div>
            <div className="device-temp-style">99.9</div>
          </div>
        </div>
        <div className="row"></div>
        <div className="device-status">Pregledaj stanje</div>
      </div>



    </div>
  );
};

export default Warehouse;
