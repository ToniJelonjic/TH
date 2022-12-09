import React from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";

const Podgrupe = (props) => {
  const title = "Podgrupe";
  const subtitle = "Podgrupe";
  const table_rows = [
    "Naziv",
    "Grupa",
    "Akcije"
  ]
  const addButton = "+ Dodaj podgrupu"
  const formInfo = {
    title: "Podgrupe",
    subtitle: "Nova podgrupa"
  }

  return (
    <>
      <Header />
      <Dropdown />

      <Wrapper>
        <Naslov title={title} />
        <Podnaslov title={title} subtitle={subtitle} addButton={addButton} formInfo={formInfo}  />
        <TablicaInfo rows={table_rows} />
      </Wrapper>

      <Footer />
    </>
  );
};

export default Podgrupe;
