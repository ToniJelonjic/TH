import React from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";

const Grupe = (props) => {
  const title = "Grupe";
  const subtitle = "Grupe";
  const table_rows = [
    "Naziv",
    "Akcije"
  ]
  return (
    <>
      <Header />
      <Dropdown />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        <TablicaInfo rows={table_rows} />
      </Wrapper>
      <Footer />
    </>
  );
};

export default Grupe;
