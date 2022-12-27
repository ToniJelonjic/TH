import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Mjerenja.css";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaUređaj from "../UI/Tablice/TablicaUređaj";
import Groups from "../UI/Groups";
import ButtonSearch from "../UI/Buttons/ButtonSearch";
import Dates from "../UI/Dates";
import UserCard from "../UI/UserCard";

const Mjerenja = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/logeri/GetAll"
    );
    setData(data);
  };

  useEffect(() => {
    getData();
    //console.log(data[0])
  }, []);

  const title = "Mjerenja";
  const subtitle = "Mjerenja";

  const params = {
    id: Math.random(),
    params: [
      "Vrijeme",
      "Uređaj",
      "Temperatura",
      "Vlažnost",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
    ],
  };

  return (
    <>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        <div className="measure-div">
          <Dates devices={data} />
          <Groups />
          <ButtonSearch />
        </div>
        <TablicaUređaj params={params} />
      </Wrapper>
      <Footer />
    </>
  );
};

export default Mjerenja;
