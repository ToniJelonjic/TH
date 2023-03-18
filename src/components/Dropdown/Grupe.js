import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import axios from "../../api/axios";
import Context from "../../store/Context";
import Groups from "../UI/Tablice/Groups";

const getGroupsLink = "/grupe/GetAll";

const Grupe = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(getGroupsLink);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const subtitle = "Grupe";
  const table_rows = ["Naziv", "Akcije"];
  const addButton = "+ Dodaj grupu";

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
        <Groups rows={table_rows} />
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Grupe;
