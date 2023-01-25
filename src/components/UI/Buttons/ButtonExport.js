import React from "react";
import "./ButtonExport.css";

const ButtonExport = () => {
  const handleClick = () => {
    console.log("bit ce nesto");
  };

  return (
    <button onClick={handleClick} className="button-export-style">
      Export to EXCEL
    </button>
  );
};

export default ButtonExport;
