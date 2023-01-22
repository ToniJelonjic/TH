import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import UserCard from "../UI/UserCard";
import axios from "axios";
import Context from "../../store/Context";
import FormAdd from "../UI/Forms/FormAdd";

const Podgrupe = () => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/podgrupe/GetAll"
    );
    setData(data);
  };

  useEffect(() => {
    getData();
    //console.log(data[0])
  }, []);

  const title = "Podgrupe";
  const subtitle = "Podgrupe";
  const table_rows = ["Naziv", "Grupa", "Akcije"];
  const addButton = "+ Dodaj podgrupu";
  const formInfo = {
    title: "Podgrupe",
    subtitle: "Nova podgrupa",
  };
  const editFormInfo = {
    title: "Podgrupe",
    subtitle: "Uredi podgrupu",
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleGroup = (e) => {
    setGroup(e.target.value);
  };

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/podgrupe/Insert`, {
        KlijentId: 3,
        Naziv: name,
        grupaId: group,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <Context.Provider
      value={{
        data,
        title,
        subtitle,
        formInfo,
        editFormInfo,
        addButton,
        setIsAddClicked,
        onSave,
        name,
        handleName,
        group,
        handleGroup,
      }}
    >
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        {isAddClicked ? (
          <FormAdd />
        ) : (
          <>
            <Naslov title={title} />
            <Podnaslov subtitle={subtitle} />
            <TablicaInfo rows={table_rows} />
          </>
        )}
      </Wrapper>

      <Footer />
    </Context.Provider>
  );
};

export default Podgrupe;
