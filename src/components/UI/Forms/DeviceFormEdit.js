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

const DeviceFormEdit = () => {
  const location = useLocation();
  let deviceId = location.pathname.split("/")[3];

  //const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [groups, setGroups] = useState([]); //u zahtjevu
  const [subgroups, setSubgroups] = useState([]); //u zahtjevu
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minH, setMinH] = useState("");
  const [maxH, setMaxH] = useState("");
  const [deviceCode, setDeviceCode] = useState("");
  const [users, setUsers] = useState([]);
  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [groupId, setGroupId] = useState();
  const [subgroupId, setSubgroupId] = useState();
  const [status, setStatus] = useState();

  const title = "Uređaji";
  const subtitle = "Uredi uređaj";

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail1 = (e) => {
    setEmail1(e.target.value);
  };

  const handleEmail2 = (e) => {
    setEmail2(e.target.value);
  };

  const handleMinTemp = (e) => {
    setMinTemp(e.target.value);
  };

  const handleMaxTemp = (e) => {
    setMaxTemp(e.target.value);
  };

  const handleMinH = (e) => {
    setMinH(e.target.value);
  };

  const handleMaxH = (e) => {
    setMaxH(e.target.value);
  };

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    console.log(e.target.value);
  };

  const getData = async () => {
    await axios
      .get("https://localhost:44336/api/logeri/GetAll", {
        //ispraviti
        //
        //
        params: {
          klijentID: 3,
          grupaID: groupValue,
          podgrupaID: subGroupValue,
        },
        //
        //
        //
      })
      .then(function(response) {
        //setData(response.data);
        response.data.filter((device) => {
          if (parseInt(device.id) === parseInt(deviceId)) {
            setName(device.naziv.trim());
            setGroupId(device.grupaid);
            setSubgroupId(device.podgrupaid);
            console.log(device.grupaid, "grupa");
            console.log(device.podgrupaid, "podgrupa");
            setEmail1(device.email1.trim());
            setEmail2(device.email2.trim());
            setMinTemp(device.tmin);
            setMaxTemp(device.tmax);
            setMinH(device.hmin);
            setMaxH(device.hmax);
            setUsers(device.korisnici);
            setDeviceCode(device.sifraUredjaja);
          }
        });

        //console.log(response.data, "dddd");

        //localStorage.setItem("items", JSON.stringify(response.data));
      });
  };

  const getGroups = async () => {
    await axios
      .get("https://localhost:44336/api/grupe/GetAll")
      .then(function(response) {
        setGroups(response.data);
      });
  };

  const getSubgroups = async () => {
    await axios
      .get("https://localhost:44336/api/podgrupe/GetAll")
      .then(function(response) {
        setSubgroups(response.data);
      });
  };

  useEffect(() => {
    getGroups();
    getSubgroups();
    getData();
  }, []);

  // data.forEach((device) => {
  //   if (device.id == deviceId) {
  //     device.korisnici.forEach((user) => {
  //       console.log(user.ime);
  //     });
  //   }
  // });

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/logeri/Edit`, {
        //ispraviti
        //dummy
        //podatke
        //kada
        //se uradi
        //login
        Id: parseInt(deviceId),
        Naziv: name,
        Idklijenta: 3,
        Idposlovnice: null,
        Tmin: parseFloat(minTemp),
        Tmax: parseFloat(maxTemp),
        Hmin: parseFloat(minH),
        Hmax: parseFloat(maxH),
        Email1: email1,
        Email2: email2,
        Grupaid: parseInt(groupValue),
        Podgrupaid: parseInt(subGroupValue),
        Active: true, //?????????
        SifraUredjaja: deviceCode,
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
                value={name}
                onChange={handleName}
              ></input>
              <div className="placeholder-div-style">Unesite naziv uređaja</div>
            </div>
          </div>
          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style subgroup-label-style">
              Grupa:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <select
                value={groupId}
                onChange={handleGroupValue}
                className="elements-input"
              >
                <option hidden>Odaberi grupu</option>
                {groups.map((group) => {
                  if (group.klijentId === 3) {
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

          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style subgroup-label-style">
              Podgrupa:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <select
                className="elements-input"
                onChange={handleSubGroupValue}
                value={subgroupId}
              >
                <option hidden defaultValue="Odaberite podgrupu">
                  Odaberite podgrupu
                </option>
                {subgroups.map((subGroup) => {
                  if (subGroup.klijentId === 3) {
                    return (
                      <option
                        selected={subGroup.id == subgroupId}
                        value={subGroup.id}
                        key={subGroup.id}
                      >
                        {subGroup.naziv}
                      </option>
                    );
                  }
                })}
              </select>
              <div className="placeholder-div-style">Odaberite podgrupu</div>
            </div>
          </div>

          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Email 1:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Email 1"
                value={email1}
                onChange={handleEmail1}
              ></input>
              <div className="placeholder-div-style">Unesite email</div>
            </div>
          </div>

          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Email 2:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Email 2"
                value={email2}
                onChange={handleEmail2}
              ></input>
              <div className="placeholder-div-style">Unesite email</div>
            </div>
          </div>

          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Min. temp.:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Minimalna temperatura"
                value={minTemp}
                onChange={handleMinTemp}
              ></input>
              <div className="placeholder-div-style">
                Unesite minimalnu temperaturu
              </div>
            </div>
          </div>

          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Max. temp.:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Maksimalna temperatura"
                value={maxTemp}
                onChange={handleMaxTemp}
              ></input>
              <div className="placeholder-div-style">
                Unesite maksimalnu temperaturu
              </div>
            </div>
          </div>

          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Min. vlažnost:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Minimalna vlažnost"
                value={minH}
                onChange={handleMinH}
              ></input>
              <div className="placeholder-div-style">
                Unesite minimalnu vlažnost
              </div>
            </div>
          </div>

          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Max. vlažnost:
            </label>
            <div className="col-lg-6 col-md-6 col-10">
              <input
                className="elements-input"
                type="text"
                placeholder="Maksimalna vlažnost"
                value={maxH}
                onChange={handleMaxH}
              ></input>
              <div className="placeholder-div-style">
                Unesite maksimalnu vlažnost
              </div>
            </div>
          </div>

          <div className="row elements-div-style">
            <label className="col-lg-2 col-md-2 col-2 element-label-style">
              Korisnici:
            </label>
            <div className="col-lg-6 col-md-6 col-10 mt-2">
              {users.map((user) => {
                return (
                  <>
                    <input
                      checked={user.checked}
                      className="check"
                      type="checkbox"
                    />
                    <span className="users-style">{user.ime}</span>
                  </>
                );
              })}
            </div>
          </div>
        </form>
        <div className="row save-discard-div">
          <div className="col-lg-2"></div>
          <div className="col-lg-6">
            <button onClick={onSave} className="button-save-style">
              Spremi
            </button>
            <Link to="/uređaji">
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

export default DeviceFormEdit;
