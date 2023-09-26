import React from "react";
import "./ButtonExport.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/fontawesome-free-solid";

const ButtonExport = () => {
  return (
    <button className="button-export-style">
      CSV <FontAwesomeIcon className="download-icon-style" icon={faDownload} />
    </button>
  );
};

export default ButtonExport;
