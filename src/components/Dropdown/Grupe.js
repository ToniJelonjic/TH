import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import UserCard from "../UI/UserCard";
import axios from "axios";
import Context from "../../store/Context";

const Grupe = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/grupe/GetAll"
    );
    setData(data);
  };

  useEffect(() => {
    getData();
    //console.log(data[0])
  }, []);

  const title = "Grupe";
  const subtitle = "Grupe";
  const table_rows = ["Naziv", "Akcije"];
  const addButton = "+ Dodaj grupu";
  const formInfo = {
    title: "Grupe",
    subtitle: "Nova grupa",
  };
  const editFormInfo = {
    title: "Grupe",
    subtitle: "Uredi grupu",
  };

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
        formInfo,
        editFormInfo,
        addButton,
      }}
    >
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov />
        <TablicaInfo rows={table_rows} />
        {/* <ButtonAdd name="Dodaj grupu" /> */}
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Grupe;
