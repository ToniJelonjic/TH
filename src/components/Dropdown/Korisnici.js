import React from "react";
import Header from "../Header/Header";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import Footer from "../Footer/Footer";
import Users from "../UI/Tablice/Users";
import Context from "../../store/Context";

const Korisnici = () => {
  const subtitle = "Korisnici";
  const rows = [
    "Ime i prezime",
    "Korisničko ime",
    "Klijent",
    "Uloga",
    "Status",
    "Akcije",
  ];
  const addButton = "+ Dodaj korisnika";
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
          <Users rows={rows} />
        </Wrapper>

        <Footer />
      </Context.Provider>
    </>
  );
};

export default Korisnici;
