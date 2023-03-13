import React from "react";
import Header from "../Header/Header";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import Footer from "../Footer/Footer";

const Klijenti = () => {
  const subtitle = "Klijenti";
  return (
    <>
      <Header />
      <Wrapper>
        {/* <Naslov title={title} /> */}
        <Podnaslov subtitle={subtitle} />
        {/* <DeviceFilter params={params} /> */}
      </Wrapper>

      <Footer />
    </>
  );
};

export default Klijenti;
