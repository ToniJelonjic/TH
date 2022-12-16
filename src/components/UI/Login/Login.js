import React from "react";
import "./Login.css";
import logo from '../../../images/logo-1.png'
import ButtonSignIn from "../Buttons/ButtonSignIn";

const Login = (props) => {
  return (
    <>
    <div className="login-div">
    <div className="logo-style-div">
          <img className="logo-img" src={logo} alt=""></img>
        </div>
        <div className="sign-in-div">Sign In To Admin</div>

      <div className="center-form">
        <form>
          <div className="input-padding">
            <input placeholder="Korisničko ime" />
          </div>
          <div className="input-padding">
            <input placeholder="Lozinka" />
          </div>
        </form>
      </div>
      <div className="sign-in-button-div">
      <ButtonSignIn />
      </div>
    </div>
    </>
  );
};

export default Login;
