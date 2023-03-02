import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import "./Login.css";
import logo from "../../../images/logo-1.png";
import axios from "../../../api/axios";

const loginUrl = "/korisnici/Login";
const loggedInLink = "/naslovnica";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  //const from = location.state.from.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState([]);

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
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("imePrezime", response.data.imePrezime);
        localStorage.setItem("korisnickoIme", response.data.ime);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.ulogaID);
        localStorage.setItem("klijentID", response.data.firma);
        localStorage.setItem("loggedIn", true);
        const loggedIn = true;
        const id = response.data.id;
        const imePrezime = response.data.imePrezime;
        const korisnickoIme = response.data.ime;
        const token = response.data.token;
        //console.log(token, "token");
        const role = response.data.ulogaID;
        const klijentID = response.data.firma;
        //console.log(klijentID, "idkli");
        setAuth({
          id,
          imePrezime,
          korisnickoIme,
          username,
          password,
          role,
          token,
          klijentID,
          loggedIn,
        });
        setUsername("");
        setPassword("");
        //navigate(from, { replace: true });
        navigate(loggedInLink);
      } else if (response.status === 204) {
        console.log("Fuck");
        setErrMsg("Neispravno korisničko ime ili lozinka");
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response.status === 401) {
        setErrMsg("Unathorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      console.log(err);
    }
  };

  useEffect(() => {
    userRef.current.focus();
    let isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if (isLoggedIn && isLoggedIn !== null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <>
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
        <div
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </div>
      </div>
    </>
  );
};

export default Login;
