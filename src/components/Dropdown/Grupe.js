import React from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import ButtonAdd from "../UI/Buttons/ButtonAdd";

const Grupe = (props) => {
  const title = "Grupe";
  const subtitle = "Grupe";
  const table_rows = [
    "Naziv",
    "Akcije"
  ]
  const addButton = "+ Dodaj grupu"

  return (
    <>
      <Header />
      <Dropdown />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} addButton={addButton} />
        <TablicaInfo rows={table_rows} />
        {/* <ButtonAdd name="Dodaj grupu" /> */}
      </Wrapper>
      <Footer />
    </>
  );
};

export default Grupe;
