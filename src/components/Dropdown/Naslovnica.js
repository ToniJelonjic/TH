import React, { useState, useEffect } from "react";
import "./Naslovnica.css";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Uređaj from "../UI/Uređaj";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import Groups from "../UI/Groups";
import Button from "../UI/Buttons/ButtonSearch";
import UserCard from "../UI/UserCard";
import Warehouse from "../Warehouse/Warehouse";
import Context from "../../store/Context";
import axios from "axios";

const Naslovnica = () => {
  const title = "Naslovnica";
  const subtitle = [
    "Trenutno stanje uređaja",
    "Pregled mjerenja van opsega",
    "Pregled aktivnosti uređaja",
  ];
  const params1 = {
    id: Math.random(),
    params: [
      "Uređaj",
      "Vrijeme mjerenja",
      "Temperatura",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Vlažnost",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
    ],
  };
  const params2 = {
    id: Math.random(),
    params: [
      "Uređaj",
      "Vrijeme zadnjeg mjerenja",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
    ],
  };

  const [groupValue, setGroupValue] = useState(0);
  const [subGroupValue, setSubGroupValue] = useState(0);
  const [outOfRange, setOutOfRange] = useState();
  const [deviceActivity, setDeviceActivity] = useState();

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    //console.log(groupValue);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    //console.log(subGroupValue);
  };

  const getOutOfRange = async () => {
    const res = await axios
      .get(
        "https://localhost:44336/api/Mjerenja/GetAllCritical",
        // "https://localhost:44336/api/Logeri/ProvjeraMjerenja",
        {
          //ispraviti
          //
          //
          data: { klijentID: 3 },
          // {
          //     klijentID: 3,
          //     grupaId: 0,
          //     podgrupaId: 0,
          //   },
          //
          //
          //
        }
      )
      .then(function(response) {
        //console.log(response.data, "response out of range");
        setOutOfRange(response.data);
      });
  };

  const getDeviceActivity = async () => {
    const res = await axios
      .get("https://localhost:44336/api/Logeri/ProvjeraMjerenja", {
        //ispraviti
        //
        //
        data:
          // { klijentID: 3 }
          {
            klijentID: 3,
            grupaId: groupValue,
            podgrupaId: subGroupValue,
          },
        //
        //
        //
      })
      .then(function(response) {
        setDeviceActivity(response.data);
      });
  };

  useEffect(() => {
    getOutOfRange();
    getDeviceActivity();
  }, []);

  return (
    <Context.Provider
      value={{
        title,
        subtitle,
      }}
    >
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle[0]} />
        <Warehouse />
        <Podnaslov subtitle={subtitle[1]} />
        <Uređaj
          subtitle={subtitle[1]}
          params={params1}
          getData={getOutOfRange}
          data={outOfRange}
        />
        <Podnaslov subtitle={subtitle[2]} />
        <div className="select-div">
          <Groups
            groupValue={groupValue}
            handleGroupValue={handleGroupValue}
            subGroupValue={subGroupValue}
            handleSubGroupValue={handleSubGroupValue}
          />
          <span className="span-button-style">
            <button onClick={getDeviceActivity} className="button-style">
              Pretraži
            </button>
          </span>
          {/* <Button /> */}
        </div>

        <Uređaj
          subtitle={subtitle[2]}
          params={params2}
          groupValue={groupValue}
          subGroupValue={subGroupValue}
          getData={getDeviceActivity}
          data={deviceActivity}
        />
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Naslovnica;
