import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import UserCard from "../UI/UserCard";
import axios from "axios";
import Context from "../../store/Context";

const Zaposlenici = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/korisnici/GetAll"
    );
    setData(data);
  };

  useEffect(() => {
    getData();
    //console.log(data[0])
  }, []);

  const title = "Zaposlenici";
  const subtitle = "Zaposlenici";
  const table_rows = [
    "Ime i prezime",
    "Korisničko ime",
    "Klijent",
    "Uloga",
    "Status",
    "Akcije",
  ];
  const addButton = "+ Dodaj zaposlenika";
  const formInfo = {
    title: "Zaposlenici",
    subtitle: "Novi zaposlenik",
  };
  const editFormInfo = {
    title: "Zaspolenici",
    subtitle: "Uredi informacije",
  };

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
        formInfo,
        editFormInfo,
      }}
    >
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov addButton={addButton} formInfo={formInfo} />
        <TablicaInfo
          title={title}
          subtitle={subtitle}
          rows={table_rows}
          data={data}
          editFormInfo={editFormInfo}
        />
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Zaposlenici;
