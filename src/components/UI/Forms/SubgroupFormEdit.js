import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./Forms.css";
import axios from "../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const grupeGetAllLink = "/grupe/GetAll";
const podgrupeGetAllLink = "/podgrupe/GetAll";
const podgrupeEditLink = "/podgrupe/Edit";

const SubgroupFormEdit = () => {
  const subtitle = "Uredi podgrupu";

  const location = useLocation();
  const navigate = useNavigate();

  let subgroupId = location.pathname.split("/")[3];

  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState();
  const [status, setStatus] = useState();
  const klijentID = JSON.parse(localStorage.getItem("klijentID"));

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleGroupId = (e) => {
    setGroupId(e.target.value);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const getGroups = async () => {
    await axios
      .get(grupeGetAllLink)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    await axios
      .get(podgrupeGetAllLink)
      .then((response) => {
        response.data.filter((subgroup) => {
          if (parseInt(subgroup.id) === parseInt(subgroupId)) {
            setName(subgroup.naziv);
            setGroupId(subgroup.grupaId);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSave = () => {
    axios
      .post(podgrupeEditLink, {
        Id: subgroupId,
        KlijentId: klijentID,
        Naziv: name,
        GrupaId: groupId,
      })
      .then(function (response) {
        setStatus(response.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getGroups();
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
                onChange={handleName}
                value={name}
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
              <select onChange={handleGroupId} className="elements-input">
                <option hidden>Odaberi grupu</option>
                {groups.map((group) => {
                  if (group.klijentId === klijentID) {
                    return (
                      <option
                        selected={group.id == groupId}
                        key={group.id}
                        value={group.id}
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

export default SubgroupFormEdit;
