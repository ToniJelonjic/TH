import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "../../Dropdown/Dropdown";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import ButtonSave from "../Buttons/ButtonSave";
import Naslov from "../Naslovi/Naslov";
import Podnaslov from "../Naslovi/Podnaslov";
import Wrapper from "../Wrapper";
import "./FormAdd.css";
import FormElements from "./FormElements";
import UserCard from "../UserCard";
import Context from "../../../store/Context";

const FormAdd = (props) => {
  const { title, subtitle, formInfo, name, setName, onSave } = useContext(
    Context
  );

  const [group, setGroup] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleGroup = (e) => {
    setGroup(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        {/* greska neka 
        ispraviti
        sto prije */}
        {/* <Podnaslov subtitle={formInfo.subtitle} /> */}
        <FormElements
          title={title}
          name={name}
          handleName={handleName}
          username={username}
          handleUsername={handleUsername}
          group={group}
          handleGroup={handleGroup}
          password={password}
          handlePassword={handlePassword}
        />
        <ButtonSave
        //save={saveGroup}
        // name={name}
        // username={username}
        // group={group}
        // password={password}
        />
      </Wrapper>
      <Footer />
    </div>
  );
};

export default FormAdd;
