import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const profileEditUrl = "/korisnici/Edit";

const ProfileForm = () => {
  const [imePrezime, setImePrezime] = useState();
  const [korisnickoIme, setKorisnickoIme] = useState();
  const [password, setPassword] = useState("");
  const [id, setId] = useState();
  const [role, setRole] = useState();
  const [klijentID, setKlijentID] = useState();
  const [status, setStatus] = useState();

  const navigate = useNavigate();

  const handleImePrezime = (e) => {
    setImePrezime(e.target.value);
  };

  const handleKorisnickoIme = (e) => {
    setKorisnickoIme(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setImePrezime(localStorage.getItem("imePrezime").trim());
    setKorisnickoIme(localStorage.getItem("korisnickoIme").trim());
    setId(localStorage.getItem("id"));
    setRole(localStorage.getItem("role"));
    setKlijentID(localStorage.getItem("klijentID"));
  }, []);

  const onSave = async (e) => {
    e.preventDefault();
    await axios
      .post(profileEditUrl, {
        Id: id,
        imePrezime: imePrezime,
        ime: korisnickoIme,
        Lozinka: password,
        UlogaID: role,
        Firma: klijentID,
      })
      .then(function (response) {
        setPassword("");
        setStatus(response.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
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
            <div className="placeholder-div-style">Unesite korisničko ime</div>
          </div>
        </div>
        <div className="row elements-div-style">
          <label className="col-lg-2 col-md-2 col-3 element-label-style">
            Lozinka:
          </label>
          <div className="col-lg-6 col-md-6 col-10">
            <input
              className="elements-input"
              type="password"
              placeholder="Lozinka"
              onChange={handlePassword}
              value={password}
            ></input>
            <div className="placeholder-div-style">Unesite lozinku</div>
          </div>
        </div>
      </form>
      <div className="row save-discard-div">
        <div className="col-lg-2"></div>
        <div className="col-lg-6">
          <button type="submit" onClick={onSave} className="button-save-style">
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
    </>
  );
};

export default ProfileForm;
