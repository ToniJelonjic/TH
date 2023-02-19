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

const SubgroupFormEdit = () => {
  const location = useLocation();
  let subgroupId = location.pathname.split("/")[3];

  let klijentID = JSON.parse(localStorage.getItem("klijentID"));

  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    await axios
      .get("https://localhost:44336/api/grupe/GetAll")
      .then((response) => {
        setGroups(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect(() => {
    getGroups();
    getData();
  }, []);

  //const [data, setData] = useState([]);
  const getData = async () => {
    await axios
      .get("https://localhost:44336/api/podgrupe/GetAll")
      .then((response) => {
        response.data.filter((subgroup) => {
          if (parseInt(subgroup.id) === parseInt(subgroupId)) {
            setName(subgroup.naziv);
            setGroupId(subgroup.grupaId);
            //console.log(subgroup.naziv);
          }
        });
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const title = "Podrupe";
  const subtitle = "Uredi podgrupu";

  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState();
  const [status, setStatus] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleGroupId = (e) => {
    setGroupId(e.target.value);
  };

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/podgrupe/Edit`, {
        Id: subgroupId,
        KlijentId: 3,
        Naziv: name,
        GrupaId: groupId,
      })
      .then(function(response) {
        setStatus(response.status);
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const [isUserClicked, setIsUserClicked] = useState(false);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  };

  return (
    <div>
      <Header onClick={handleUserClick} />
      <Dropdown />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
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
        <div className="row save-discard-div">
          <div className="col-lg-2"></div>
          <div className="col-lg-6">
            <button onClick={onSave} className="button-save-style">
              Spremi
            </button>
            <Link to="/podgrupe">
              <button className="button-discard-style">Odbaci</button>
            </Link>
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
