import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import axios from "../../api/axios";
import Context from "../../store/Context";

const podgrupeGetAllLink = "/podgrupe/GetAll";

const Podgrupe = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(podgrupeGetAllLink);
    setData(data);
  };

  useEffect(() => {
    getData();
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
      <Header />
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
