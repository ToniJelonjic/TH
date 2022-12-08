import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Dropdown from "./components/Dropdown/Dropdown";
import Naslovnica from "./components/Dropdown/Naslovnica";
import Footer from "./components/Footer/Footer";
import Uređaj from "./components/UI/Uređaj";

function App() {
  return (
    <div>
      <Header />
      <Dropdown />
      
      
      <Footer />
    </div>
  );
}

export default App;
