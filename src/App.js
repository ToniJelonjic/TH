import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Dropdown from "./components/Dropdown/Dropdown";
import Footer from "./components/Footer/Footer";
import Context from "./store/Context";
import axios from "axios";

function App() {
  const [grupe, setGrupe] = useState([]);
  const getGrupe = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/grupe/GetAll"
    );
    setGrupe(data);
  };

  const [podgrupe, setPodgrupe] = useState([]);
  const getPodgrupe = async () => {
    const { data } = await axios.get(
      "https://localhost:44336/api/podgrupe/GetAll"
    );
    setPodgrupe(data);
  };

  useEffect(() => {
    getGrupe();
    getPodgrupe();
    //console.log(data[0])
  }, []);
  return (
    <div>
      <Context.Provider
        value={{
          grupe,
          podgrupe,
        }}
      >
        <Header />
        <Dropdown />

        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
