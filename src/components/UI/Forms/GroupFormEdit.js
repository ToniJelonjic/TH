import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./Forms.css";
import axios from "../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const grupeGetAllLink = "/grupe/GetAll";
const grupeEditLink = "/grupe/Edit";

const GroupFormEdit = () => {
  const subtitle = "Uredi grupu";

  const location = useLocation();
  const navigate = useNavigate();

  let groupId = location.pathname.split("/")[3];
  const [name, setName] = useState("");
  const [status, setStatus] = useState();
  const klijentID = JSON.parse(localStorage.getItem("klijentID"));

  const handleName = (e) => {
    setName(e.target.value);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const getData = async () => {
    await axios
      .get(grupeGetAllLink)
      .then((data) => {
        data.data.filter((group) => {
          if (parseInt(group.id) === parseInt(groupId)) {
            setName(group.naziv);
          }
        });
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const onSave = () => {
    axios
      .post(grupeEditLink, {
        Id: groupId,
        KlijentID: klijentID,
        Naziv: name,
      })
      .then(function (response) {
        setStatus(response.status);
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

export default GroupFormEdit;
