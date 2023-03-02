import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Homepage from "./components/Dropdown/Naslovnica";
import Uređaji from "./components/Dropdown/Uređaji";
import Mjerenja from "./components/Dropdown/Mjerenja";
import Grupe from "./components/Dropdown/Grupe";
import Podgrupe from "./components/Dropdown/Podgrupe";
import Zaposlenici from "./components/Dropdown/Zaposlenici";
import GroupFormAdd from "./components/UI/Forms/GroupFormAdd";
import SubgroupFormAdd from "./components/UI/Forms/SubgroupFormAdd";
import EmployeeFormAdd from "./components/UI/Forms/EmployeeFormAdd";
import GroupFormEdit from "./components/UI/Forms/GroupFormEdit";
import SubgroupFormEdit from "./components/UI/Forms/SubgroupFormEdit.js";
import EmployeeFormEdit from "./components/UI/Forms/EmployeeFormEdit";
import Profile from "./components/Profile/Profile";
import Login from "./components/UI/Login/Login";
import DeviceFormEdit from "./components/UI/Forms/DeviceFormEdit";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/prijava" />} /> */}
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/naslovnica" element={<Homepage />} />
        <Route path="/uređaji" element={<Uređaji />} />
        <Route path="/mjerenja" element={<Mjerenja />} />
        <Route path="/grupe" element={<Grupe />} />
        <Route path="/podgrupe" element={<Podgrupe />} />
        <Route path="/zaposlenici" element={<Zaposlenici />} />
        <Route path="/grupe/dodaj" element={<GroupFormAdd />} />
        <Route path="/podgrupe/dodaj" element={<SubgroupFormAdd />} />
        <Route path="/zaposlenici/dodaj" element={<EmployeeFormAdd />} />
        <Route path="/grupe/uredi/:id" element={<GroupFormEdit />} />
        <Route path="/podgrupe/uredi/:id" element={<SubgroupFormEdit />} />
        <Route path="/zaposlenici/uredi/:id" element={<EmployeeFormEdit />} />
        <Route path="/uređaji/uredi/:id" element={<DeviceFormEdit />} />
        <Route path="/profil" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
