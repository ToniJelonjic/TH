import React from "react";
import "./Naslovnica.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TrenutnoStanje from "../Mjerenja/TrenutnoStanje";
import Context from "../../store/Context";
import ActivityFilter from "../UI/Filters/ActivityFilter";
import ClientsList from "../UI/ClientsList";
import VanOpsega from "../Mjerenja/VanOpsega";

const Naslovnica = () => {
  const title = "Naslovnica";
  const subtitle = [
    "Trenutno stanje uređaja",
    "Pregled mjerenja van opsega",
    "Pregled aktivnosti uređaja",
    "Pregled uređaja",
    "Klijenti",
  ];

  const role = JSON.parse(localStorage.getItem("role"));

  const params1 = [
    "Uređaj",
    "Vrijeme mjerenja",
    "Temperatura",
    "Minimalna temperatura",
    "Maksimalna temperatura",
    "Vlažnost",
    "Minimalna vlažnost",
    "Maksimalna vlažnost",
  ];

  const params2 = [
    "Uređaj",
    "Vrijeme zadnjeg mjerenja",
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
      <Header />
      <Wrapper>
        {role === 3 && (
          <>
            <Podnaslov subtitle={subtitle[4]} />
            <ClientsList />
          </>
        )}

        {role === 1 || role === 2 ? (
          <>
            <Podnaslov subtitle={subtitle[0]} />
            <TrenutnoStanje />
          </>
        ) : null}

        {role === 1 && (
          <>
            <Podnaslov subtitle={subtitle[1]} />
            <VanOpsega params={params1} />
          </>
        )}

        {role === 1 || role === 3 ? (
          <>
            <Podnaslov subtitle={role !== 3 ? subtitle[2] : subtitle[3]} />
            <ActivityFilter subtitle={subtitle[2]} params={params2} />
          </>
        ) : null}
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Naslovnica;
