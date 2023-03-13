import React, { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import axios from "../../api/axios";
import Context from "../../store/Context";

const korisniciGetAllLink = "/korisnici/GetAll";

const Zaposlenici = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(korisniciGetAllLink);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const title = "Zaposlenici";
  const subtitle = "Zaposlenici";
  const table_rows = [
    "Ime i prezime",
    "Korisničko ime",
    "Uloga",
    "Status",
    "Akcije",
  ];
  const addButton = "+ Dodaj zaposlenika";

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
        addButton,
      }}
    >
      <Header />
      <Wrapper>
        <>
          {/* <Naslov title={title} /> */}
          <Podnaslov subtitle={subtitle} />
          <TablicaInfo rows={table_rows} />
        </>
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Zaposlenici;
