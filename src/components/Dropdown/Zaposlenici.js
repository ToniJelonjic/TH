import React from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import UserCard from "../UI/UserCard";

const Zaposlenici = (props) => {
  const title = "Zaposlenici";
  const subtitle = "Zaposlenici";
  const table_rows = [
    "Ime i prezime",
    "Korisničko ime",
    "Klijent",
    "Uloga",
    "Status",
    "Akcije"
  ]
  const addButton = "+ Dodaj zaposlenika"
  const formInfo = {
    title: "Zaposlenici",
    subtitle: "Novi zaposlenik"
  }

  return (
    <>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov title={title} subtitle={subtitle} addButton={addButton} formInfo={formInfo}  />
        <TablicaInfo rows={table_rows} />
      </Wrapper>

      <Footer />
    </>
  );
};

export default Zaposlenici;
