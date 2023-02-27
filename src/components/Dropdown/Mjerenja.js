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
import Context from "../../store/Context";
import MeasuresFilter from "../UI/Filters/MeasuresFilter";

const Mjerenja = () => {
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

  const [groupValue, setGroupValue] = useState("");
  const [subGroupValue, setSubGroupValue] = useState("");

  const handleGroupValue = (e) => {
    setGroupValue(e.target.value);
    //console.log(groupValue);
  };

  const handleSubGroupValue = (e) => {
    setSubGroupValue(e.target.value);
    //console.log(subGroupValue);
  };

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

  const [isUserClicked, setIsUserClicked] = useState(false);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  };

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
      }}
    >
      <Header onClick={handleUserClick} />
      <Dropdown />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        {/* <div className="measure-div">
          <Dates devices={data} />
          <Groups />
          <ButtonSearch />
        </div> */}
        <MeasuresFilter params={params} />
        {/* <TablicaUređaj
          title={title}
          groupValue={groupValue}
          subGroupValue={subGroupValue}
          params={params}
          data={data}
        /> */}
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Mjerenja;
