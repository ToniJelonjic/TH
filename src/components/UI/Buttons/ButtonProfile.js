import React from "react";
import { Link } from "react-router-dom";
import "./ButtonProfile.css";

const ButtonProfile = () => {
  return (
    <Link className="link-profile-style" to={`/profil`}>
      <button className="profile-button-style">Idi na profil</button>
    </Link>
  );
};

export default ButtonProfile;
