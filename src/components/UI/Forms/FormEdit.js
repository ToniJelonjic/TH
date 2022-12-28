import React from "react";
import Header from "../../Header/Header";
import Dropdown from "../../Dropdown/Dropdown";
import UserCard from "../UserCard";
import Wrapper from "../Wrapper";
import Naslov from "../Naslovi/Naslov";
import Podnaslov from "../Naslovi/Podnaslov";
import ButtonSave from "../Buttons/ButtonSave";
import FormEditElements from "./FormEditElements";
import Footer from "../../Footer/Footer";
import { useLocation } from "react-router-dom";
import Context from "../../../store/Context";

const FormEdit = (props) => {
  const location = useLocation();
  //console.log(location, "formedit");
  const { title } = location.state.title;
  const { subtitle } = location.state.subtitle;
  const { editFormInfo } = location.state.editFormInfo;
  const { name } = location.state;
  const { username } = location.state;
  return (
    <>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={editFormInfo.subtitle} />
        <FormEditElements name={name} title={title} username={username} />
        <ButtonSave />
      </Wrapper>
      <Footer />
    </>
  );
};

export default FormEdit;
