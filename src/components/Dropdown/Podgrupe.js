import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import axios from "../../api/axios";
import Context from "../../store/Context";
import Subgroups from "../UI/Tablice/Subgroups";

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

  const subtitle = "Podgrupe";
  const table_rows = ["Naziv", "Grupa", "Akcije"];
  const addButton = "+ Dodaj podgrupu";

  return (
    <Context.Provider
      value={{
        data,
        subtitle,
        addButton,
      }}
    >
      <Header />
      <Wrapper>
        <Podnaslov subtitle={subtitle} />
        <Subgroups rows={table_rows} />
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Podgrupe;
