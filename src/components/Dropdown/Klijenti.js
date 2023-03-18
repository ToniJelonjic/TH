import React from "react";
import Header from "../Header/Header";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import Footer from "../Footer/Footer";
import Context from "../../store/Context";
import Clients from "../UI/Tablice/Clients";

const Klijenti = () => {
  const subtitle = "Klijenti";
  const addButton = "+ Dodaj klijenta";
  const rows = ["Naziv", "Status", "Akcije"];
  return (
    <>
      <Context.Provider
        value={{
          subtitle,
          addButton,
        }}
      >
        <Header />
        <Wrapper>
          <Podnaslov subtitle={subtitle} />
          <Clients rows={rows} />
        </Wrapper>

        <Footer />
      </Context.Provider>
    </>
  );
};

export default Klijenti;
