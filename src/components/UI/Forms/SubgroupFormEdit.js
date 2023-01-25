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
import { useLocation } from "react-router-dom";

const SubgroupFormEdit = () => {
  const location = useLocation();
  let subgroupId = location.pathname.split("/")[3];
  const [subgroups, setSubgroups] = useState([]);
  const getSubgroups = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/podgrupe/GetAll"
    );
    setSubgroups(data);
  };

  useEffect(() => {
    getSubgroups();
  }, []);

  const title = "Podrupe";
  const subtitle = "Nova podgrupa";

  const [name, setName] = useState("");
  const [groupId, setGroupId] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleGroupId = (e) => {
    setGroupId(e.target.value);
  };

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/podgrupe/Edit`, {
        KlijentId: 3,
        Naziv: name,
        GrupaId: groupId,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const nesto = subgroups.forEach((subgroup) => {
    if (parseInt(subgroup.id) === parseInt(subgroupId)) {
      return [subgroup.naziv, subgroup.grupaId];
    }
  });

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
                {subgroups.map((group) => {
                  if (group.klijentId === 3) {
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
            <button className="button-discard-style">Odbaci</button>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default SubgroupFormEdit;
