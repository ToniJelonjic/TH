import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Dropdown from "./components/Dropdown/Dropdown";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <>
        <Header />
        <Dropdown />

        <Footer />
      </>
    </div>
  );
}

export default App;
