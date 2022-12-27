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

const Podgrupe = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/podgrupe/GetAll"
    );
    setData(data);
  };

  useEffect(() => {
    getData();
    //console.log(data[0])
  }, []);

  const title = "Podgrupe";
  const subtitle = "Podgrupe";
  const table_rows = ["Naziv", "Grupa", "Akcije"];
  const addButton = "+ Dodaj podgrupu";
  const formInfo = {
    title: "Podgrupe",
    subtitle: "Nova podgrupa",
  };
  const editFormInfo = {
    title: "Podgrupe",
    subtitle: "Uredi podgrupu",
  };

  return (
    <>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov
          title={title}
          subtitle={subtitle}
          addButton={addButton}
          formInfo={formInfo}
        />
        <TablicaInfo
          title={title}
          subtitle={subtitle}
          rows={table_rows}
          data={data}
          editFormInfo={editFormInfo}
        />
      </Wrapper>

      <Footer />
    </>
  );
};

export default Podgrupe;
