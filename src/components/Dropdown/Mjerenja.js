import React, { useState, useEffect } from "react";
import "./Mjerenja.css";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
//import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
//import TablicaUređaj from "../UI/Tablice/TablicaUređaj";
import UserCard from "../UI/UserCard";
import Context from "../../store/Context";
import MeasuresFilter from "../UI/Filters/MeasuresFilter";

const Mjerenja = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  };

  const handleBurgerClick = () => {
    setIsBurgerClicked(!isBurgerClicked);
    console.log(isBurgerClicked);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1000) {
        setIsBurgerClicked(false);
      }
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // document.addEventListener("mousedown", () => {
    //   setIsUserClicked(false);
    // });
  }, []);

  const title = "Mjerenja";
  const subtitle = "Mjerenja";

  const params = [
    "Vrijeme",
    "Uređaj",
    "Temperatura",
    "Vlažnost",
    "Minimalna temperatura",
    "Maksimalna temperatura",
    "Minimalna vlažnost",
    "Maksimalna vlažnost",
  ];

  return (
    <Context.Provider
      value={{
        title,
        subtitle,
      }}
    >
      <Header onUserClick={handleUserClick} onBurgerClick={handleBurgerClick} />
      <Dropdown
        isClicked={isBurgerClicked}
        handleBurgerClick={handleBurgerClick}
      />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        {/* <Naslov title={title} /> */}
        {/* <Podnaslov subtitle={subtitle} /> */}
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
