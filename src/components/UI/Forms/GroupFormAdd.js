import React, { useState, useEffect } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Naslov from "../Naslovi/Naslov";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./FormAdd.css";
import FormElements from "./FormElements";
import UserCard from "../UserCard";
import { Link } from "react-router-dom";
import axios from "axios";

const GroupFormAdd = (props) => {
  const title = "Grupe";
  const subtitle = "Nova grupa";

  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/grupe/Insert`, {
        KlijentID: 3,
        Naziv: name,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        <form>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Naziv:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Naziv"
                onChange={handleName}
              ></input>
              <div className="placeholder-div-style">Unesite naziv grupe</div>
            </div>
          </div>
        </form>
        <div className="row save-discard-div">
          <div className="col-lg-2"></div>
          <div className="col-lg-6">
            <button onClick={onSave} className="button-save-style">
              Spremi
            </button>
            <button className="button-discard-style">Odbaci</button>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default GroupFormAdd;
