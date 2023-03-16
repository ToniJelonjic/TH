import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
//import Naslov from "../Naslovi/Naslov";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./Forms.css";
import axios from "../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const clientsGetAllLink = "/klijenti/GetAll";
const clientsEditLink = "/klijenti/Edit";

const ClientsFormEdit = () => {
  //const title = "Grupe";
  const subtitle = "Uredi grupu";

  const location = useLocation();
  const navigate = useNavigate();

  let klijentId = location.pathname.split("/")[3];
  const [name, setName] = useState("");
  const [active, setActive] = useState();
  const [status, setStatus] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const getData = async () => {
    await axios
      .get(clientsGetAllLink)
      .then((response) => {
        response.data.filter((client) => {
          if (parseInt(client.id) === parseInt(klijentId)) {
            setName(client.naziv);
            setActive(client.active);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSave = () => {
    axios
      .post(clientsEditLink, {
        Id: klijentId,
        Naziv: name,
        Active: active,
      })
      .then(function (response) {
        setStatus(response.status);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <Wrapper>
        {/* <Naslov title={title} /> */}
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
                value={name}
                onChange={handleName}
              ></input>
              <div className="placeholder-div-style">
                Unesite naziv klijenta
              </div>
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
          <div className="success-div">Uspješno ste uredili podatke.</div>
        )}
      </Wrapper>
      <Footer />
    </div>
  );
};

export default ClientsFormEdit;
