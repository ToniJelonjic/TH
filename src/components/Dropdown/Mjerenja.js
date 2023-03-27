import React from "react";
import "./Mjerenja.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Wrapper from "../UI/Wrapper";
import Context from "../../store/Context";
import MeasuresFilter from "../UI/Filters/MeasuresFilter";

const Mjerenja = () => {
  const subtitle = "Mjerenja";
  const params = [
    "Vrijeme",
    "Uređaj",
    "Temperatura",
    "Min. temperatura",
    "Maks. temperatura",
    "Vlažnost",
    "Min. vlažnost",
    "Maks. vlažnost",
  ];

  return (
    <Context.Provider
      value={{
        subtitle,
      }}
    >
      <Header />
      <Wrapper>
        <MeasuresFilter params={params} />
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Mjerenja;
