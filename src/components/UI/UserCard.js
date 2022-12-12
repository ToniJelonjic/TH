import React from "react";
import "./UserCard.css";
import ButtonLogOut from "./Buttons/ButtonLogOut";
import ButtonProfile from "./Buttons/ButtonProfile";

const UserCard = () => {
  return (
    <div className={`user-card-style none`}>
      <ButtonProfile />
      <ButtonLogOut />
    </div>
  );
};

export default UserCard;
