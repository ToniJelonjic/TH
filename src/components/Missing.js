import React from "react";
import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <button onClick={navigateBack}>Nazad</button>
    </div>
  );
};

export default Missing;
