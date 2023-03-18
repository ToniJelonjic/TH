import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const changeStatusLink = "/korisnici/ChangeStatus";

const ChangeStatus = ({ data, handleEmployeeId }) => {
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
        handleEmployeeId();
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

export default ChangeStatus;
