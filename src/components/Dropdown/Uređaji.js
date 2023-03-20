import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import Context from "../../store/Context";
import DeviceFilter from "../UI/Filters/DeviceFilter";

const Uređaji = () => {
  const subtitle = "Uređaji";
  const addButton = "+ Dodaj uređaj";
  const params = [
    "Naziv",
    "Klijent",
    "Email 1",
    "Email 2",
    "Min. temp.",
    "Maks. temp.",
    "Min. vlažnost",
    "Maks. vlažnost",
    "Status",
    "Akcije",
  ];

  return (
    <Context.Provider
      value={{
        subtitle,
        addButton,
      }}
    >
      <Header />
      <Wrapper>
        <Podnaslov subtitle={subtitle} />
        <DeviceFilter params={params} />
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Uređaji;
