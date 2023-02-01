import React from "react";
import "./UserCard.css";
import { Link } from "react-router-dom";

const UserCard = () => {
  return (
    <div className={`row user-card-style`}>
      <div className="col-6 profile-style-div">
        <Link className="link-profile-style" to={`/profil`}>
          <button className="profile-button-style">Idi na profil</button>
        </Link>
      </div>
      <div className="col-6 logout-style-div">
        <Link className="link-profile-style" to={`/prijava`}>
          <button className="logout-button-style">Odjava</button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
