import React from "react";
import "./FormElements.css";

const FormElements = (props) => {
  return (
    <>
      {props.title === "Grupe" ? (
        <>
        <div className="row elements-div-style">
          <label className="col-lg-2 col-md-2 col-2 element-label-style">Naziv:</label>
          <div className="col-lg-6 col-md-6 col-9">
            <input
              className="elements-input"
              type="text"
              placeholder="Naziv"
            ></input>
            <div className="placeholder-div-style">Unesite naziv grupe</div>
          </div>
        </div>
        </>
      ) : props.title === "Podgrupe" ? (
        <>
        <div className="row elements-div-style">
          <label className="col-lg-2 col-md-2 col-2 element-label-style">Naziv:</label>
          <div className="col-lg-6 col-md-6 col-9">
            <input
              className="elements-input"
              type="text"
              placeholder="Naziv"
            ></input>
            <div className="placeholder-div-style">Unesite naziv podgrupe</div>
          </div>
        </div>
        <div className="row elements-div-style">
          <label className="col-lg-2 col-md-2 col-2 element-label-style">Grupa:</label>
          <div className="col-lg-6 col-md-6 col-9">
            <select className="elements-input">
              <option>Odaberi grupu</option>
            </select>
            <div className="placeholder-div-style">Odaberite pripadajuću grupu</div>
          </div>
        </div>
        </>
      ) : (
        <>
        <div className="row elements-div-style">
          <label className="col-lg-2 col-md-2 col-3 element-label-style">Ime i prezime:</label>
          <div className="col-lg-6 col-md-6 col-8">
            <input
              className="elements-input"
              type="text"
              placeholder="Ime i prezime"
              /* defaultValue={props.title === "Profil" ? "Admin" : null} */
            ></input>
            <div className="placeholder-div-style">Unesite ime i prezime</div>
          </div>
        </div>
        <div className="row elements-div-style">
          <label className="col-lg-2 col-md-2 col-3 element-label-style">Korisničko ime:</label>
          <div className="col-lg-6 col-md-6 col-8 ">
            <input
              className="elements-input"
              type="text"
              placeholder="Korisničko ime"
            ></input>
            <div className="placeholder-div-style">Unesite korisničko ime</div>
          </div>
        </div>
        <div className="row elements-div-style">
          <label className="col-lg-2 col-md-2 col-3 element-label-style">Lozinka:</label>
          <div className="col-lg-6 col-md-6 col-8">
            <input
              className="elements-input"
              type="text"
              placeholder="Lozinka"
            ></input>
            <div className="placeholder-div-style">Unesite lozinku</div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default FormElements;
