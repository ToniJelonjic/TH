import React, { useState, useEffect } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Naslov from "../Naslovi/Naslov";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./FormAdd.css";
import UserCard from "../UserCard";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const EmployeeFormEdit = () => {
  const location = useLocation();
  let employeeId = location.pathname.split("/")[3];
  const [data, setData] = useState([]);
  const getData = async () => {
    await axios
      .get("https://localhost:44336/api/korisnici/GetAll")
      .then((response) => {
        response.data.filter((employee) => {
          if (parseInt(employee.id) === parseInt(employeeId)) {
            setName(employee.imePrezime.trimEnd());
            setUsername(employee.ime.trimEnd());
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const title = "Zaposlenici";
  const subtitle = "Uredi zaposlenika";

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/korisnici/Edit`, {
        //ispraviti
        //dummy
        //podatke
        //kada
        //se uradi
        //login
        Id: employeeId,
        Ime: username,
        Lozinka: password,
        Status: true,
        imePrezime: name,
        Firma: 3,
        Poslovnica: 0,
        UlogaID: 2,
        Active: false,
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
            <label className="col-lg-2 col-md-2 col-3 element-label-style">
              Ime i prezime:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Ime i prezime"
                onChange={handleName}
                value={name}
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
                value={username}
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
            <Link to="/zaposlenici">
              <button onClick={onSave} className="button-save-style">
                Spremi
              </button>
            </Link>
            <Link to="/zaposlenici">
              <button className="button-discard-style">Odbaci</button>
            </Link>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default EmployeeFormEdit;
