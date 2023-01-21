import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import "./ButtonAdd.css";

const ButtonAdd = (props) => {
  const { title, subtitle, formInfo, addButton, setIsAddClicked } = useContext(
    Context
  );
  const [slag, setSlag] = useState("");
  useEffect(() => {
    setSlag(subtitle.toLowerCase());
  }, []);

  const handleClick = () => {
    setIsAddClicked(true);
  };

  return (
    <Link
      to={`/${slag}/dodaj`}
      className="link-style"
      state={{
        slag: { slag },
        title: { title },
        subtitle: { subtitle },
        formInfo: { formInfo },
      }}
    >
      <button onClick={handleClick} className="add-button-style">
        {addButton}
      </button>
    </Link>
  );
};

export default ButtonAdd;
