import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";
import Naslov from "../UI/Naslovi/Naslov";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import TablicaInfo from "../UI/Tablice/TablicaInfo";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import UserCard from "../UI/UserCard";
import axios from "axios";
import Context from "../../store/Context";
import FormAdd from "../UI/Forms/FormAdd";

const Grupe = (props) => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/grupe/GetAll"
    );
    setData(data);
  };

  useEffect(() => {
    getData();
    //console.log(data[0])
  }, []);

  const title = "Grupe";
  const subtitle = "Grupe";
  const table_rows = ["Naziv", "Akcije"];
  const addButton = "+ Dodaj grupu";
  const formInfo = {
    title: "Grupe",
    subtitle: "Nova grupa",
  };
  const editFormInfo = {
    title: "Grupe",
    subtitle: "Uredi grupu",
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleIsAddClicked = (e) => {
    setIsAddClicked(!isAddClicked);
  };

  const onSave = () => {
    axios
      .post(`https://localhost:44336/api/grupe/Insert`, {
        KlijentID: 3,
        Naziv: name,
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const [isUserClicked, setIsUserClicked] = useState(false);

  const handleUserClick = () => {
    setIsUserClicked(!isUserClicked);
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
        handleIsAddClicked,
        onSave,
        name,
        handleName,
      }}
    >
      <Header onClick={handleUserClick} />
      <Dropdown />
      {isUserClicked ? <UserCard onClick={handleUserClick} /> : null}
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        <TablicaInfo rows={table_rows} />
      </Wrapper>
      <Footer />
    </Context.Provider>
  );
};

export default Grupe;
