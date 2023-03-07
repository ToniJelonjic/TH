import React from "react";
import "./UserCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const logoutLink = "/prijava";

const UserCard = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setAuth({});
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    localStorage.removeItem("role");
    localStorage.removeItem("klijentID");
    localStorage.removeItem("imePrezime");
    localStorage.removeItem("korisnickoIme");
    localStorage.removeItem("loggedIn");
    navigate(logoutLink);
  };

  return (
    <div className={`row user-card-style`}>
      <div className="col-6 profile-style-div">
        <Link className="link-profile-style" to={`/profil`}>
          <button /*onClick={onClick}*/ className="profile-button-style">
            Idi na profil
          </button>
        </Link>
      </div>
      <div className="col-6 logout-style-div">
        <Link className="link-profile-style" to={`/prijava`}>
          <button onClick={handleLogout} className="logout-button-style">
            Odjava
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
