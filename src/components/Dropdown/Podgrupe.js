import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
//import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import UserCard from "../UI/UserCard";
import axios from "../../api/axios";
import Context from "../../store/Context";

const podgrupeGetAllLink = "/podgrupe/GetAll";

const Podgrupe = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [data, setData] = useState([]);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  };

  const getData = async () => {
    const { data } = await axios.get(podgrupeGetAllLink);
    setData(data);
  };

  useEffect(() => {
    getData();
    // document.addEventListener("mousedown", () => {
    //   setIsUserClicked(false);
    // });
  }, []);

  const title = "Podgrupe";
  const subtitle = "Podgrupe";
  const table_rows = ["Naziv", "Grupa", "Akcije"];
  const addButton = "+ Dodaj podgrupu";

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
        addButton,
      }}
    >
      <Header onClick={handleUserClick} />
      <Dropdown />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        {/* <Naslov title={title} /> */}
        <Podnaslov subtitle={subtitle} />
        <TablicaInfo rows={table_rows} />
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Podgrupe;
