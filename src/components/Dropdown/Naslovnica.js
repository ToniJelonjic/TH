import React from "react";
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

const Naslovnica = (props) => {
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

  const devices = {
    deviceId: Math.random(),
    title: "Pregled aktivnosti uređaja",
    groupName: "activityGroup",
    groupId: "activityGroupId",
    subGroupName: "activitySubGroup",
    subGroupId: "activitySubGroupId",
    subGroupName: "deviceSubGroup",
    subGroupId: "deviceSubGroupId",
    groups: [
      "Centar 2",
      "Rodoc",
      "Ilici",
      "Cim"
    ],
    
    subGroups: [
      "Podrupa 1",
      "Podgrupa 2",
      "Podgrupa 3"
    ],
  };

  return (
    <>
      <Header />
      <Dropdown />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle[0]} />
        {/* <div className="">backend</div> */}
        <Podnaslov subtitle={subtitle[1]} />
        <Uređaj params={params1} />
        <Podnaslov subtitle={subtitle[2]} />
        <div className="select-div">
          <Groups groups={devices} />
          <Button />
        </div>

        <Uređaj params={params2} />
      </Wrapper>
      <Footer />
    </>
  );
};

export default Naslovnica;
