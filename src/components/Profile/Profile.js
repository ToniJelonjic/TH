import React from "react";
import Header from "../Header/Header";
import Dropdown from "../Dropdown/Dropdown";
import UserCard from "../UI/UserCard";
import Wrapper from "../UI/Wrapper";
import Naslov from "../UI/Naslovi/Naslov";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import FormElements from "../UI/Forms/FormElements";
import ButtonSave from "../UI/Buttons/ButtonSave";

const Profile = (props) => {
  const title = "Profil";
  const subtitle = "Profil";
  return (
    <>
      <Header />
      <Dropdown />
      <UserCard />
      <Wrapper>
        <Naslov title={title} />
        <Podnaslov subtitle={subtitle} />
        <FormElements title={title} />
        <ButtonSave />
      </Wrapper>
    </>
  );
};

export default Profile;
