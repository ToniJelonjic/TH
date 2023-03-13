import React, { useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import Dropdown from "../Dropdown/Dropdown";
import UserCard from "../UI/UserCard";
import Wrapper from "../UI/Wrapper";
//import Naslov from "../UI/Naslovi/Naslov";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import ProfileForm from "../UI/Forms/ProfileForm";

const Profile = () => {
  // const title = "Profil";
  const subtitle = "Profil";

  return (
    <>
      <Header />
      <Wrapper>
        {/* <Naslov title={title} /> */}
        <Podnaslov subtitle={subtitle} />
        <ProfileForm />
      </Wrapper>
    </>
  );
};

export default Profile;
