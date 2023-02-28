import React, { useState, useEffect } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
//import Naslov from "../Naslovi/Naslov";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./Forms.css";
import UserCard from "../UserCard";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const korisniciInsertLink = "/korisnici/Insert";

const EmployeeFormAdd = (props) => {
  //const title = "Zaposlenici";
  const subtitle = "Novi zaposlenik";

  const navigate = useNavigate();

  const [klijentID, setKlijentID] = useState();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState();
  const [isUserClicked, setIsUserClicked] = useState(false);

  useEffect(() => {
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
  }, []);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const onSave = () => {
    axios
      .post(korisniciInsertLink, {
        Ime: username,
        Lozinka: password,
        Status: true,
        imePrezime: name,
        Firma: klijentID,
        Poslovnica: 0,
        UlogaID: 2,
        Active: true,
      })
      .then(function(response) {
        console.log(response);
        //console.log(response.status);
        setStatus(response.status);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Header onClick={handleUserClick} />
      <Dropdown />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        {/* <Naslov title={title} /> */}
        <Podnaslov subtitle={subtitle} />
        <form>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-3 element-label-style">
              Ime i prezime:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Ime i prezime"
                onChange={handleName}
                /* defaultValue={props.title === "Profil" ? "Admin" : null} */
              ></input>
              <div className="placeholder-div-style">Unesite ime i prezime</div>
            </div>
          </div>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-3 element-label-style">
              Korisničko ime:
            </label>
            <div className="col-lg-6 col-md-6 col-10 ">
              <input
                className="elements-input"
                type="text"
                placeholder="Korisničko ime"
                onChange={handleUsername}
              ></input>
              <div className="placeholder-div-style">
                Unesite korisničko ime
              </div>
            </div>
          </div>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-3 element-label-style">
              Lozinka:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Lozinka"
                onChange={handlePassword}
              ></input>
              <div className="placeholder-div-style">Unesite lozinku</div>
            </div>
          </div>
        </form>
        <div className="row save-discard-div">
          <div className="col-lg-2"></div>
          <div className="col-lg-6">
            <button onClick={onSave} className="button-save-style">
              Spremi
            </button>
            <button onClick={navigateBack} className="button-discard-style">
              Odbaci
            </button>
          </div>
        </div>
        {status == 200 && (
          <div className="success-div">
            Uspješno ste dodali novog zaposlenika.
          </div>
        )}
      </Wrapper>
      <Footer />
    </div>
  );
};

export default EmployeeFormAdd;
