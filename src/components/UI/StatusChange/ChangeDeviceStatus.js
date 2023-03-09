import React, { useState, useEffect, useRef } from "react";
import axios from "../../../api/axios";

const changeStatusLink = "/logeri/ChangeStatus";

const ChangeDeviceStatus = ({ data, setSelectedDeviceId }) => {
  const [newStatus, setNewStatus] = useState();

  useEffect(() => {
    if (data.active === false) {
      setNewStatus(true);
    } else if (data.active === true) {
      setNewStatus(false);
    }
  }, [data]);

  const onChangeStatus = () => {
    axios
      .post(changeStatusLink, {
        Id: data.id,
        Active: newStatus,
        Naziv: data.naziv,
        Idklijenta: data.idklijenta,
        Idposlovnice: data.idposlovnice,
        Tmin: data.tmin,
        Tmax: data.tmax,
        Hmin: data.hmin,
        Hmax: data.hmax,
        Email1: data.email1,
        Email2: data.email2,
        Grupaid: data.grupaid,
        Podgrupaid: data.podgrupaid,
        SifraUredjaja: data.sifraUredjaja,
      })
      .then(function (response) {
        console.log(response);
        //setIsClicked(false);
        setSelectedDeviceId(null);
        window.location.reload(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div onClick={onChangeStatus} className="status-change">
        Promijeni status
      </div>
    </>
  );
};

export default ChangeDeviceStatus;
