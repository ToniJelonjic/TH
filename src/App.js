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
import PublicRoutes from "./components/UI/Routing/PublicRoutes";
import AdminRoutes from "./components/UI/Routing/AdminRoutes";
import SharedRoutes from "./components/UI/Routing/SharedRoutes";

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
          <AdminRoutes>
            <Uređaji />
          </AdminRoutes>
        }
      />
      <Route
        path="/uređaji/uredi/:id"
        element={
          <AdminRoutes>
            <DeviceFormEdit />
          </AdminRoutes>
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
          <SharedRoutes>
            <Mjerenja />
          </SharedRoutes>
        }
      />
    </Routes>

    // <Routes>
    //   <Route
    //     element={
    //       <ProtectedRoutes
    //         loggedIn={loggedIn}
    //         role={role}
    //         allowedRoles={[1, 2, 3]}
    //       />
    //     }
    //   >
    //     <Route
    //       path="/"
    //       element={
    //         loggedIn ? (
    //           <Navigate to="/naslovnica" />
    //         ) : (
    //           <Navigate to="/prijava" />
    //         )
    //       }
    //     />
    //     <Route path="/naslovnica" element={<Naslovnica />} />
    //     <Route path="/profil" element={<Profile />} />
    //   </Route>
    //   <Route
    //     element={
    //       <ProtectedRoutes loggedIn={loggedIn} role={role} allowedRoles={[1]} />
    //     }
    //   >
    //     <Route path="/uređaji" element={<Uređaji />} />
    //     <Route path="/uređaji/uredi/:id" element={<DeviceFormEdit />} />
    //     <Route path="/mjerenja" element={<Mjerenja />} />
    //     <Route path="/grupe" element={<Grupe />} />
    //     <Route path="/grupe/dodaj" element={<GroupFormAdd />} />
    //     <Route path="/grupe/uredi/:id" element={<GroupFormEdit />} />
    //     <Route path="/podgrupe" element={<Podgrupe />} />
    //     <Route path="/podgrupe/dodaj" element={<SubgroupFormAdd />} />
    //     <Route path="/podgrupe/uredi/:id" element={<SubgroupFormEdit />} />
    //     <Route path="/zaposlenici" element={<Zaposlenici />} />
    //     <Route path="/zaposlenici/dodaj" element={<EmployeeFormAdd />} />
    //     <Route path="/zaposlenici/uredi/:id" element={<EmployeeFormEdit />} />
    //   </Route>
    //   <Route
    //     element={
    //       <ProtectedRoutes loggedIn={loggedIn} role={role} allowedRoles={[2]} />
    //     }
    //   >
    //     <Route path="/mjerenja" element={<Mjerenja />} />
    //   </Route>
    //   <Route path="/prijava" element={<Login />} />
    //   <Route path="*" element={<Missing />} />
    // </Routes>
  );
}

export default App;
