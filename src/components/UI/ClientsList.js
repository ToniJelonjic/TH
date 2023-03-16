import React from "react";
import "./ClientsList.css";
import axios from "../../api/axios";
import { useState } from "react";
import { useEffect } from "react";

const logeriPoKlijentuLink = "/klijenti/CountLogeraPoKlijentu";

const ClientsList = () => {
  const [loggers, setLoggers] = useState([]);

  const getLoggers = () => {
    axios.get(logeriPoKlijentuLink).then(function (response) {
      setLoggers(response.data);
    });
  };

  useEffect(() => {
    getLoggers();
  }, []);

  return (
    <>
      <div className="row">
        {loggers.map((loger, index) => {
          return (
            <div key={index} className="col-lg-4">
              <table className="bgw">
                <tr>
                  <td className="client-name">{loger.naziv}</td>
                  <td rowSpan="2" className="device-num">
                    {loger.brojLogera}
                  </td>
                </tr>
                <tr>
                  <td className="device-num-text"> Ukupan broj uređaja:</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {loger.brojLogera < 2 ? (
                      <div className="line1"></div>
                    ) : loger.brojLogera > 1 && loger.brojLogera < 10 ? (
                      <div className="line2"></div>
                    ) : loger.brojLogera > 40 ? (
                      <div className="line3"></div>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ClientsList;
