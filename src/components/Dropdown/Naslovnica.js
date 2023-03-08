import React, { useState, useEffect, useRef } from "react";
import "./Naslovnica.css";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Uređaj from "../UI/Uređaj";
//import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import UserCard from "../UI/UserCard";
import Warehouse from "../Warehouse/Warehouse";
import Context from "../../store/Context";
import ActivityFilter from "../UI/Filters/ActivityFilter";

const Naslovnica = () => {
  const title = "Naslovnica";
  const subtitle = [
    "Trenutno stanje uređaja",
    "Pregled mjerenja van opsega",
    "Pregled aktivnosti uređaja",
  ];

  const role = JSON.parse(localStorage.getItem("role"));

  const params1 = {
    id: Math.random(),
    params: [
      "Uređaj",
      "Vrijeme mjerenja",
      "Temperatura",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Vlažnost",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
    ],
  };

  const params2 = {
    id: Math.random(),
    params: [
      "Uređaj",
      "Vrijeme zadnjeg mjerenja",
      "Minimalna temperatura",
      "Maksimalna temperatura",
      "Minimalna vlažnost",
      "Maksimalna vlažnost",
    ],
  };

  const userRef = useRef();

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

    return () => window.removeEventListener("resize", handleResize);
    // document.addEventListener("mousedown", (e) => {
    //   if (userRef.current.includes(e.target)) {
    //     setIsUserClicked(false);
    //   }
    // });
  }, []);

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
      {isUserClicked ? (
        <UserCard onClick={handleUserClick} ref={userRef} />
      ) : null}

      <Wrapper>
        {/* <Naslov title={title} /> */}

        {/* {role === 1 || role === 2 ? (
          <>
            <Podnaslov subtitle={subtitle[0]} />
            <Warehouse />
          </>
        ) : null}

        {role === 1 && (
          <>
            <Podnaslov subtitle={subtitle[1]} />
            <Uređaj params={params1} />
          </>
        )} */}

        {role === 1 || role === 3 ? (
          <>
            <Podnaslov subtitle={subtitle[2]} />
            <ActivityFilter subtitle={subtitle[2]} params={params2} />
          </>
        ) : null}
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Naslovnica;
