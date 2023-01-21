import React, { useState, useEffect } from "react";
import "./FormElements.css";
import axios from "axios";

const FormElements = (props) => {
  //console.log(props, "propsssss");

  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/grupe/GetAll"
    );
    setGroups(data);
  };

  const onSubmit = () => {
    window.location.reload();
  };

  useEffect(() => {
    getGroups();
    //console.log(data[0])
  }, []);
  return (
    <>
      {props.title === "Grupe" ? (
        <form onSubmit={onSubmit}>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Naziv:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Naziv"
                onChange={props.handleName}
              ></input>
              <div className="placeholder-div-style">Unesite naziv grupe</div>
            </div>
          </div>
        </form>
      ) : props.title === "Podgrupe" ? (
        <form onSubmit={onSubmit}>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Naziv:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Naziv"
                onChange={props.handleName}
              ></input>
              <div className="placeholder-div-style">
                Unesite naziv podgrupe
              </div>
            </div>
          </div>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style subgroup-label-style">
              Grupa:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <select onChange={props.handleGroup} className="elements-input">
                <option>Odaberi grupu</option>
                {groups.map((group) => {
                  if (group.klijentId === 3) {
                    return (
                      <option
                        key={group.id}
                        //defaultValue={}
                      >
                        {group.naziv}
                      </option>
                    );
                  }
                })}
              </select>
              <div className="placeholder-div-style">
                Odaberite pripadajuću grupu
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-3 element-label-style">
              Ime i prezime:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Ime i prezime"
                onChange={props.handleName}
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
                onChange={props.handleUsername}
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
                onChange={props.handlePassword}
              ></input>
              <div className="placeholder-div-style">Unesite lozinku</div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default FormElements;
