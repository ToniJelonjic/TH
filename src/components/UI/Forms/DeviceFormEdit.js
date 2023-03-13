import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
//import Naslov from "../Naslovi/Naslov";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./Forms.css";
import axios from "../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const logeriGetAllLink = "/logeri/GetAll";
const grupeGetAllLink = "/grupe/GetAll";
const podgrupeGetAllLink = "/podgrupe/GetAll";
const editLogeriKorisniciLink = "/logeri/EditLogeriKorisnici";

const DeviceFormEdit = () => {
  const location = useLocation();
  let deviceId = location.pathname.split("/")[3];

  const navigate = useNavigate();

  //const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [groups, setGroups] = useState([]); //u zahtjevu
  const [subgroups, setSubgroups] = useState([]); //u zahtjevu
  const [filteredSubgroups, setFilteredSubgroups] = useState([]);
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
  const [active, setActive] = useState();
  const [klijentID, setKlijentID] = useState();

  //const title = "Uređaji";
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

  const handleGroupId = (e) => {
    setGroupId(e.target.value);
  };

  const handleSubgroupId = (e) => {
    setSubgroupId(e.target.value);
  };

  const navigateBack = () => {
    navigate(-1);
  };

  const getData = async () => {
    await axios
      .get(logeriGetAllLink, {
        params: {
          klijentID: klijentID,
          grupaID: groupValue,
          podgrupaID: subGroupValue,
        },
      })
      .then(function (response) {
        response.data.map((device) => {
          if (parseInt(device.id) === parseInt(deviceId)) {
            console.log(device, "data");
            setName(device.naziv.trim());
            setGroupId(device.grupaid);
            setSubgroupId(device.podgrupaid);
            setEmail1(device.email1.trim());
            setEmail2(device.email2.trim());
            setMinTemp(device.tmin);
            setMaxTemp(device.tmax);
            setMinH(device.hmin);
            setMaxH(device.hmax);
            setDeviceCode(device.sifraUredjaja);
            setActive(device.active);
            setUsers(device.korisnici);
          }
        });
      });
  };

  const handleIsChecked = (event, user) => {
    const checked = event.target.checked;
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, checked } : u
    );
    setUsers(updatedUsers);
  };

  const getGroups = async () => {
    await axios.get(grupeGetAllLink).then(function (response) {
      setGroups(response.data);
      console.log(response.data, "grupe");
    });
  };

  const getSubgroups = async () => {
    await axios.get(podgrupeGetAllLink).then(function (response) {
      setSubgroups(response.data);
      console.log(response.data, "podgrupe");
    });
  };

  useEffect(() => {
    getGroups();
    getSubgroups();
    getData();
    setKlijentID(JSON.parse(localStorage.getItem("klijentID")));
  }, []);

  useEffect(() => {
    const filteredSubgroups = subgroups.filter(
      (subGroup) =>
        subGroup.klijentId === klijentID &&
        parseInt(subGroup.grupaId) === parseInt(groupId)
    );
    setFilteredSubgroups(filteredSubgroups);
  }, [groupId]);

  const onSave = () => {
    axios
      .post(editLogeriKorisniciLink, {
        Id: parseInt(deviceId),
        Naziv: name,
        Idklijenta: klijentID,
        Idposlovnice: null,
        Tmin: parseFloat(minTemp),
        Tmax: parseFloat(maxTemp),
        Hmin: parseFloat(minH),
        Hmax: parseFloat(maxH),
        Email1: email1,
        Email2: email2,
        Grupaid: parseInt(groupId),
        Podgrupaid: parseInt(subgroupId),
        Active: active,
        SifraUredjaja: deviceCode,
        korisnici: users,
      })
      .then(function (response) {
        setStatus(response.status);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                onChange={handleGroupId}
                className="elements-input"
              >
                {groups.map((group) => {
                  if (group.klijentId === klijentID) {
                    return (
                      <option value={group.id} key={group.id}>
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
                onChange={handleSubgroupId}
                value={subgroupId}
              >
                {filteredSubgroups.map((subGroup) => {
                  return (
                    <option key={subGroup.id} value={subGroup.id}>
                      {subGroup.naziv}
                    </option>
                  );
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
                  <div className="check-users-style" key={user.id}>
                    <input
                      checked={user.checked}
                      value={user.id}
                      type="checkbox"
                      onChange={(event) => handleIsChecked(event, user)}
                    />
                    <span className="users-style-padding">{user.ime}</span>
                  </div>
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

export default DeviceFormEdit;
