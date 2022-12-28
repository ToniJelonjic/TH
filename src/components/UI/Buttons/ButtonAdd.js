import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../../store/Context";
import "./ButtonAdd.css";

const ButtonAdd = (props) => {
  const { title, subtitle, formInfo } = useContext(Context);
  const [slag, setSlag] = useState("");
  useEffect(() => {
    setSlag(subtitle.toLowerCase());
  }, []);

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
      <button className="add-button-style">{props.addButton}</button>
    </Link>
  );
};

export default ButtonAdd;
