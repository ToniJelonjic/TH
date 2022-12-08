import React from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Uređaj from "../UI/Uređaj";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import Groups from "../UI/Groups";
import Button from "../UI/Buttons/ButtonSearch";
import TablicaUređaj from "../UI/Tablice/TablicaUređaj";


const Uređaji = (props) => {
  const title = "Uređaji";
  const subtitle = "Uređaji";
  const params = {
    id: Math.random(),
    params: [
      "Naziv",
      "Klijent",
      "Email 1",
      "Email 2",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
      "Status",
      "Akcije",
    ],
  };

  const devices = {
    deviceId: Math.random(),
    title: "Uređaji",
    groupName: "deviceGroup",
    groupId: "deviceGroupId",
    groups: [
      "Centar 2",
      "Rodoc",
      "Ilici",
      "Cim"
    ],
    subGroupName: "deviceSubGroup",
    subGroupId: "deviceSubGroupId",
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
        <Podnaslov subtitle={subtitle} />
        <div className="select-div">
          <Groups groups={devices} />
          <Button />
        </div>
        <TablicaUređaj params={params} />
        {/* <Uređaj params={params} /> */}
      </Wrapper>

      <Footer />
    </>
  );
};

export default Uređaji;
