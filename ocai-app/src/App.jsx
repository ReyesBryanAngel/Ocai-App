import React, { useEffect } from "react";
import { useGlobalData } from "./contexts/GlobalDataProvider";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Teacher from "./pages/Teacher";
import Unauthorized from "./pages/Unauthorized";
import ApplicationLayout from "./layouts/ApplicationLayout";
import Users from "./pages/routes/Users";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RoleBasedRoute from "./utils/RoleBasedRoute";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <RoleBasedRoute allowedRoles={['Admin']}>
              <ApplicationLayout>
                <Admin />
              </ApplicationLayout>
            </RoleBasedRoute>
          }
        />
          {/* Nested Routes under /admin */}
          {/* <Route path="users" element={<Users />} /> */}
        {/* </Route> */}
        <Route
          path="/admin/users"
          element={
            <RoleBasedRoute allowedRoles={['Admin']}>
              <ApplicationLayout>
                <Users />
              </ApplicationLayout>
            </RoleBasedRoute>
          }
        />

        {/* Teacher Route */}
        <Route
          path="/teacher"
          element={
            <RoleBasedRoute allowedRoles={['Teacher']}>
              <ApplicationLayout>
                <Teacher />
              </ApplicationLayout>
            </RoleBasedRoute>
          }
        />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App;

