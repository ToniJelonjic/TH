import React, { useState, useEffect } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Naslov from "../Naslovi/Naslov";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./FormAdd.css";
import UserCard from "../UserCard";
import { Link } from "react-router-dom";
import axios from "axios";

const SubgroupFormAdd = (props) => {
  const title = "Podrupe";
  const subtitle = "Nova podgrupa";

  let klijentID = JSON.parse(localStorage.getItem("klijentID"));

  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState();
  const [status, setStatus] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleGroupId = (e) => {
    setGroupId(e.target.value);
  };

  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/grupe/GetAll"
    );
    setGroups(data);
  };

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/podgrupe/Insert`, {
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

  useEffect(() => {
    getGroups();
  }, []);

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
                <option>Odaberi grupu</option>
                {groups.map((group) => {
                  if (group.klijentId === klijentID) {
                    return (
                      <option
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
        {status === 200 && (
          <div className="success-div">Uspješno ste dodali novu podgrupu.</div>
        )}
      </Wrapper>
      <Footer />
    </div>
  );
};

export default SubgroupFormAdd;
