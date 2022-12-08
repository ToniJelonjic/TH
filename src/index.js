import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter, RedirectFunction, redirect } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "typeface-roboto";
import "@fontsource/poppins";
import Homepage from "./components/Dropdown/Naslovnica";
import Uređaji from "./components/Dropdown/Uređaji";
import Mjerenja from "./components/Dropdown/Mjerenja";
import Grupe from "./components/Dropdown/Grupe";
import Podgrupe from "./components/Dropdown/Podgrupe";
import Zaposlenici from "./components/Dropdown/Zaposlenici";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} exact />
        <Route path="/naslovnica" element={<Homepage />} />
        <Route path="/uređaji" element={<Uređaji />} />
        <Route path="/mjerenja" element={<Mjerenja />} />
        <Route path="/grupe" element={<Grupe />} />
        <Route path="/podgrupe" element={<Podgrupe />} />
        <Route path="/zaposlenici" element={<Zaposlenici />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
