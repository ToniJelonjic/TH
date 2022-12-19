import React from "react";
import "./UserCard.css";
import ButtonLogOut from "./Buttons/ButtonLogOut";
import ButtonProfile from "./Buttons/ButtonProfile";

const UserCard = () => {
  return (
    <div className={`row user-card-style none`}>
      <div className="col-6 profile-style-div">
      <ButtonProfile />
      </div>
      <div className="col-6 logout-style-div">
      <ButtonLogOut />
      </div>
    </div>
  );
};

export default UserCard;
