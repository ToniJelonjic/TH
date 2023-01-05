import React, { useState, useEffect } from "react";
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
  const location = useLocation();
  const { title } = location.state.title;
  const { subtitle } = location.state.subtitle;
  const { slag } = location.state.slag;
  const { formInfo } = location.state.formInfo;

  return (
    <div>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={formInfo.subtitle} />
        <FormElements title={title} />
        <ButtonSave />
      </Wrapper>
      <Footer />
    </div>
  );
};

export default FormAdd;
