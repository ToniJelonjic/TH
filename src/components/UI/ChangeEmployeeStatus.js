import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const changeStatusLink = "/korisnici/ChangeStatus";

const ChangeStatus = ({ data, setEmployeeId }) => {
  console.log(data, "data");

  const [newStatus, setNewStatus] = useState();

  useEffect(() => {
    if (data.active === false) {
      setNewStatus(true);
    } else if (data.active === true) {
      setNewStatus(false);
    }
  }, []);

  const onChangeStatus = () => {
    axios
      .post(changeStatusLink, {
        Id: data.id,
        Naziv: "",
        Active: newStatus,
      })
      .then(function(response) {
        console.log(response);
        setEmployeeId(null);
        window.location.reload(true);
      })
      .catch(function(error) {
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
