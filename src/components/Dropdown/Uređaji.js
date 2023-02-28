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

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
  };

  const handleBurgerClick = () => {
    setIsBurgerClicked(!isBurgerClicked);
    console.log(isBurgerClicked);
  };

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
      <Header onClick={handleUserClick} onBurger={handleBurgerClick} />
      <Dropdown isClicked={isBurgerClicked} />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        {/* <Naslov title={title} /> */}
        <Podnaslov subtitle={subtitle} />
        <DeviceFilter params={params} />
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Uređaji;
