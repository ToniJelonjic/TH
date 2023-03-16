import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
//import ProtectedRoutes from "./components/ProtectedRoutes";
import Naslovnica from "./components/Dropdown/Naslovnica";
import Missing from "./components/Missing";
import Klijenti from "./components/Dropdown/Klijenti";
import Korisnici from "./components/Dropdown/Korisnici";
import PublicRoutes from "./components/UI/Routing/PublicRoutes";
import AdminRoutes from "./components/UI/Routing/AdminRoutes";
import SharedRoutesEA from "./components/UI/Routing/SharedRoutesEA";
import SharedRoutesSA from "./components/UI/Routing/SharedRoutesSA";
import SuperAdminRoutes from "./components/UI/Routing/SuperAdminRoutes";
import DeviceFormAdd from "./components/UI/Forms/DeviceFormAdd";
import UsersFormAdd from "./components/UI/Forms/UsersFormAdd";
import ClientsFormAdd from "./components/UI/Forms/ClientsFormAdd";
import UsersFormEdit from "./components/UI/Forms/UsersFormEdit";
import ClientsFormEdit from "./components/UI/Forms/ClientsFormEdit";

function App() {
  const navigate = useNavigate();
  let role = JSON.parse(localStorage.getItem("role"));
  let loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  useEffect(() => {
    // Redirect user to login page if not logged in
    if (!loggedIn) {
      navigate("/prijava");
    }
  }, []);

  return (
    <Routes>
      {/* FOR ALL */}
      <Route path="/prijava" element={<Login />} />
      <Route path="*" element={<Missing />} />

      {/* PUBLIC */}
      <Route
        path="/"
        element={
          <PublicRoutes>
            <Navigate to={"/naslovnica"} />
          </PublicRoutes>
        }
      />
      <Route
        path="/naslovnica"
        element={
          <PublicRoutes>
            <Naslovnica />
          </PublicRoutes>
        }
      />
      <Route
        path="/profil"
        element={
          <PublicRoutes>
            <Profile />
          </PublicRoutes>
        }
      />

      {/* ADMIN */}
      <Route
        path="/uređaji"
        element={
          <SharedRoutesSA>
            <Uređaji />
          </SharedRoutesSA>
        }
      />
      <Route
        path="/uređaji/uredi/:id"
        element={
          <SharedRoutesSA>
            <DeviceFormEdit />
          </SharedRoutesSA>
        }
      />
      <Route
        path="/grupe"
        element={
          <AdminRoutes>
            <Grupe />
          </AdminRoutes>
        }
      />
      <Route
        path="/grupe/dodaj"
        element={
          <AdminRoutes>
            <GroupFormAdd />
          </AdminRoutes>
        }
      />
      <Route
        path="/grupe/uredi/:id"
        element={
          <AdminRoutes>
            <GroupFormEdit />
          </AdminRoutes>
        }
      />
      <Route
        path="/podgrupe"
        element={
          <AdminRoutes>
            <Podgrupe />
          </AdminRoutes>
        }
      />
      <Route
        path="/podgrupe/dodaj"
        element={
          <AdminRoutes>
            <SubgroupFormAdd />
          </AdminRoutes>
        }
      />
      <Route
        path="/podgrupe/uredi/:id"
        element={
          <AdminRoutes>
            <SubgroupFormEdit />
          </AdminRoutes>
        }
      />
      <Route
        path="/zaposlenici"
        element={
          <AdminRoutes>
            <Zaposlenici />
          </AdminRoutes>
        }
      />
      <Route
        path="/zaposlenici/dodaj"
        element={
          <AdminRoutes>
            <EmployeeFormAdd />
          </AdminRoutes>
        }
      />
      <Route
        path="/zaposlenici/uredi/:id"
        element={
          <AdminRoutes>
            <EmployeeFormEdit />
          </AdminRoutes>
        }
      />

      {/* SHARED */}
      <Route
        path="/mjerenja"
        element={
          <SharedRoutesEA>
            <Mjerenja />
          </SharedRoutesEA>
        }
      />

      {/* SUPER ADMIN */}
      <Route
        path="/klijenti"
        element={
          <SuperAdminRoutes>
            <Klijenti />
          </SuperAdminRoutes>
        }
      />

      <Route
        path="/korisnici"
        element={
          <SuperAdminRoutes>
            <Korisnici />
          </SuperAdminRoutes>
        }
      />

      <Route
        path="/korisnici/dodaj"
        element={
          <SuperAdminRoutes>
            <UsersFormAdd />
          </SuperAdminRoutes>
        }
      />

      <Route
        path="/korisnici/uredi/:id"
        element={
          <SuperAdminRoutes>
            <UsersFormEdit />
          </SuperAdminRoutes>
        }
      />

      <Route
        path="/klijenti/dodaj"
        element={
          <SuperAdminRoutes>
            <ClientsFormAdd />
          </SuperAdminRoutes>
        }
      />

      <Route
        path="/klijenti/uredi/:id"
        element={
          <SuperAdminRoutes>
            <ClientsFormEdit />
          </SuperAdminRoutes>
        }
      />

      <Route
        path="/uređaji/dodaj"
        element={
          <SuperAdminRoutes>
            <DeviceFormAdd />
          </SuperAdminRoutes>
        }
      />
    </Routes>
  );
}

export default App;
