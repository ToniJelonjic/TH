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

const GroupFormEdit = () => {
  const location = useLocation();
  let groupId = location.pathname.split("/")[3];
  const [data, setData] = useState([]);
  //const [nesto, setNesto] = useState("");
  const [name, setName] = useState("");
  const getData = async () => {
    await axios
      .get("https://localhost:44336/api/grupe/GetAll")
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

  useEffect(() => {
    getData();
  }, []);

  const title = "Grupe";
  const subtitle = "Uredi grupu";

  const [nameValue, setNameValue] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/grupe/Edit`, {
        Id: groupId,
        KlijentID: 3,
        Naziv: name,
      })
      .then(function(response) {
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
            <Link to="/grupe">
              <button onClick={onSave} className="button-save-style">
                Spremi
              </button>
            </Link>
            <Link to="/grupe">
              <button className="button-discard-style">Odbaci</button>
            </Link>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default GroupFormEdit;
