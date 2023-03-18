import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const changeStatusLink = "/klijenti/ChangeStatus";

const ChangeAdminStatus = ({ data, handleClientId }) => {
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
        Naziv: "",
        Active: newStatus,
      })
      .then(function (response) {
        handleClientId();
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

export default ChangeAdminStatus;
