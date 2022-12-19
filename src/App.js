import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Dropdown from "./components/Dropdown/Dropdown";
import Footer from "./components/Footer/Footer";
import AuthContext from "./store/auth-context";


function App() {
  
  return (
    <div>
      <AuthContext.Provider>
      <Header />
      <Dropdown />
      
        

      <Footer />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
