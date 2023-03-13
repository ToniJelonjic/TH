import React, { useState, useEffect } from "react";
import "./Mjerenja.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
//import TablicaUređaj from "../UI/Tablice/TablicaUređaj";
import Context from "../../store/Context";
import MeasuresFilter from "../UI/Filters/MeasuresFilter";

const Mjerenja = () => {
  const title = "Mjerenja";
  const subtitle = "Mjerenja";

  const params = [
    "Vrijeme",
    "Uređaj",
    "Temperatura",
    "Vlažnost",
    "Minimalna temperatura",
    "Maksimalna temperatura",
    "Minimalna vlažnost",
    "Maksimalna vlažnost",
  ];

  return (
    <Context.Provider
      value={{
        title,
        subtitle,
      }}
    >
      <Header />
      <Wrapper>
        {/* <Naslov title={title} /> */}
        {/* <Podnaslov subtitle={subtitle} /> */}
        <MeasuresFilter params={params} />
        {/* <TablicaUređaj
          title={title}
          groupValue={groupValue}
          subGroupValue={subGroupValue}
          params={params}
          data={data}
        /> */}
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Mjerenja;
