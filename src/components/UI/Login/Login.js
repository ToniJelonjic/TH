import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import "./Login.css";
import logo from "../../../images/logo-1.png";
import axios from "../../../api/axios";

const loginUrl = "/korisnici/Login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(loginUrl, {
        params: { username, password },
      });
      // if (response.status === 204) {
      //   setErrMsg("Fuck");
      // }
      console.log(response);
      //localStorage.setItem("token", response.data.token);
      const token = response.data.token;
      //console.log(token, "token");
      const role = response.data.ulogaID;
      setAuth({ username, password, role, token });
      setUsername("");
      setPassword("");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Missin Username or Password");
      } else if (err.response.status === 401) {
        setErrMsg("Unathorized");
      } else {
        setErrMsg("Login Failed");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <>
      <div
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </div>
      <div className="login-div">
        <div className="logo-style-div">
          <img className="logo-img" src={logo} alt=""></img>
        </div>
        <div className="sign-in-div">Sign In To Admin</div>

        <div className="center-form">
          <form onSubmit={handleSubmit}>
            <div className="input-padding">
              <input
                type="text"
                className="login-input-style"
                placeholder="Korisničko ime"
                id="username"
                autoComplete="off"
                ref={userRef}
                onChange={handleUsername}
                value={username}
                required
              />
            </div>
            <div className="input-padding">
              <input
                type="text"
                className="login-input-style"
                placeholder="Lozinka"
                id="password"
                onChange={handlePassword}
                value={password}
                required
              />
            </div>
            <div className="sign-in-button-div">
              <button className="sign-in-button-style">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
