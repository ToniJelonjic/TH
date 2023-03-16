import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import Wrapper from "../Wrapper";
import Podnaslov from "../Naslovi/Podnaslov";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const userEditUrl = "/korisnici/Edit";
const clientsGetAllLink = "/klijenti/GetAll";
const usersGetAllLink = "/korisnici/GetAll";

const UsersFormAdd = () => {
  const location = useLocation();
  let userId = location.pathname.split("/")[3];

  const [imePrezime, setImePrezime] = useState();
  const [korisnickoIme, setKorisnickoIme] = useState();
  const [password, setPassword] = useState("");
  const [klijent, setKlijent] = useState();
  const [userStatus, setUserStatus] = useState();
  const [status, setStatus] = useState();
  const [active, setActive] = useState();

  const navigate = useNavigate();

  const subtitle = "Uredi korisnika";

  const handleImePrezime = (e) => {
    setImePrezime(e.target.value);
    console.log(e.target.value, "imepr");
  };

  const handleKorisnickoIme = (e) => {
    setKorisnickoIme(e.target.value);
    console.log(e.target.value, "korime");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value, "pass");
  };

  const handleKlijent = (e) => {
    setKlijent(e.target.value);
    console.log(e.target.value, "klijent");
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const getUser = async () => {
    await axios
      .get(usersGetAllLink)
      .then((response) => {
        response.data.filter((user) => {
          if (parseInt(user.id) === parseInt(userId)) {
            setImePrezime(user.imePrezime.trimEnd());
            setKorisnickoIme(user.ime.trimEnd());
            setActive(user.active);
            setKlijent(user.firma);
            setUserStatus(user.status);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(clientsGetAllLink);
    setData(data);
  };

  useEffect(() => {
    getData();
    getUser();
  }, []);

  const onSave = async (e) => {
    e.preventDefault();
    await axios
      .post(userEditUrl, {
        Id: userId,
        Ime: korisnickoIme,
        ImePrezime: imePrezime,
        Lozinka: password,
        UlogaID: 1,
        Firma: klijent,
        Active: active,
        Status: userStatus,
        Poslovnica: 1,
      })
      .then(function (response) {
        console.log(response);
        setPassword("");
        setStatus(response.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
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
                onChange={handleImePrezime}
                value={imePrezime}
              ></input>
              <div className="placeholder-div-style">Unesite ime i prezime</div>
            </div>
          </div>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style subgroup-label-style">
              Klijent:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <select onChange={handleKlijent} className="elements-input">
                <option hidden>Odaberi klijenta</option>
                {data.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      selected={parseInt(item.id) === parseInt(klijent)}
                    >
                      {item.naziv}
                    </option>
                  );
                })}
              </select>
              <div className="placeholder-div-style">Odaberite klijenta</div>
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
                onChange={handleKorisnickoIme}
                value={korisnickoIme}
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
                value={password}
                required
              ></input>
              <div className="placeholder-div-style">Unesite lozinku</div>
            </div>
          </div>
        </form>
        <div className="row save-discard-div">
          <div className="col-lg-2"></div>
          <div className="col-lg-6">
            <button
              type="submit"
              onClick={onSave}
              className="button-save-style"
            >
              Spremi
            </button>
            <button onClick={navigateBack} className="button-discard-style">
              Odbaci
            </button>
          </div>
        </div>
        {status == 200 && (
          <div className="success-div">Uspješno ste uredili podatke.</div>
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

export default UsersFormAdd;
