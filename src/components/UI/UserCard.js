import React from "react";
import "./UserCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import user from "../../images/user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

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
    localStorage.removeItem("active");
    navigate(logoutLink);
  };

  const username = localStorage.getItem("imePrezime");

  return (
    <div className="row user-card-style">
      <div className=" profile-style-div col-12">
        <Link className="link-profile-style" to={`/profil`}>
          <span className="img-padding">
            <img
              id="toggle-user-card"
              className="user-img-style"
              src={user}
            ></img>
          </span>
          <span className="username-padding">{username}</span>
        </Link>
      </div>
      <div onClick={handleLogout} className="logout-style-div col-12">
        <span className="img-padding">
          <FontAwesomeIcon className="logout-icon-style" icon={faSignOut} />
        </span>
        <span className="username-padding">Odjava</span>
      </div>
    </div>
  );
};

export default UserCard;
