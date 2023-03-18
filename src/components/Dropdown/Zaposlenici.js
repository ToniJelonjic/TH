import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import axios from "../../api/axios";
import Context from "../../store/Context";
import Employees from "../UI/Tablice/Employees";

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
          <Podnaslov subtitle={subtitle} />
          <Employees rows={table_rows} />
        </>
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Zaposlenici;
