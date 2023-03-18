import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import Wrapper from "../UI/Wrapper";
import Podnaslov from "../UI/Naslovi/Podnaslov";
import ProfileForm from "../UI/Forms/ProfileForm";

const Profile = () => {
  const subtitle = "Profil";

  return (
    <>
      <Header />
      <Wrapper>
        <Podnaslov subtitle={subtitle} />
        <ProfileForm />
      </Wrapper>
    </>
  );
};

export default Profile;
