import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
//import Uređaj from "../UI/Uređaj";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
//import Groups from "../UI/Groups";
//import Button from "../UI/Buttons/ButtonSearch";
//import TablicaUređaj from "../UI/Tablice/TablicaUređaj";
import UserCard from "../UI/UserCard";
import axios from "axios";
import Context from "../../store/Context";
import DeviceFilter from "../UI/Filters/DeviceFilter";

const Uređaji = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/logeri/GetAll"
    );
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const title = "Uređaji";
  const subtitle = "Uređaji";
  const params = {
    id: Math.random(),
    params: [
      "Naziv",
      "Klijent",
      "Email 1",
      "Email 2",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
      "Status",
      "Akcije",
    ],
  };

  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  };

  const handleBurgerClick = () => {
    setIsBurgerClicked(!isBurgerClicked);
    console.log(isBurgerClicked);
  };

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
      }}
    >
      <Header onClick={handleUserClick} onBurger={handleBurgerClick} />
      <Dropdown isClicked={isBurgerClicked} />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        <DeviceFilter params={params} />
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Uređaji;
