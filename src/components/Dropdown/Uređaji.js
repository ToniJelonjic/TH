import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
//import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import UserCard from "../UI/UserCard";
import Context from "../../store/Context";
import DeviceFilter from "../UI/Filters/DeviceFilter";

const Uređaji = () => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const [menu, setMenu] = useState(false);

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

  const title = "Uređaji";
  const subtitle = "Uređaji";
  const params = {
    id: Math.random(),
    params: [
      "Naziv",
      //"Podgrupa",
      "Email 1",
      "Email 2",
      "Min. temp.",
      "Maks. temp.",
      "Min. vlažnost",
      "Maks. vlažnost",
      "Status",
      "Akcije",
    ],
  };

  return (
    <Context.Provider
      value={{
        title,
        subtitle,
      }}
    >
      <Header
        onUserClick={handleUserClick}
        onBurgerClick={handleBurgerClick}
        setIsUserClicked={setIsUserClicked}
        setIsBurgerClicked={setIsBurgerClicked}
        onMenuClick={() => setMenu(!menu)}
      />
      <Dropdown
        isClicked={isBurgerClicked}
        handleBurgerClick={handleBurgerClick}
      />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        NASTAVITI OD MJERENJA PROPS U HEADER
        {/* <Naslov title={title} /> */}
        <Podnaslov subtitle={subtitle} />
        <DeviceFilter params={params} />
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Uređaji;
