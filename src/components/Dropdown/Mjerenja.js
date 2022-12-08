import React from "react";
import './Mjerenja.css'
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaUređaj from "../UI/Tablice/TablicaUređaj";
import Groups from "../UI/Groups";
import Button from "../UI/Button";
import Dates from "../UI/Dates";

const Mjerenja = (props) => {
  const title = "Mjerenja";
  const subtitle = "Mjerenja";
  const grupe = {
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
  }

  const params = {
    id: Math.random(),
    params: [
      "Vrijeme",
      "Uređaj",
      "Temperatura",
      "Vlažnost",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
    ],
  };

  return (
    <>
      <Header />
      <Dropdown />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        <div className="measure-div">
          <Dates />
          <Groups groups={grupe} />
          <Button />
        </div>
        <TablicaUređaj params={params} />
      </Wrapper>
      <Footer />
    </>
  );
};

export default Mjerenja;
