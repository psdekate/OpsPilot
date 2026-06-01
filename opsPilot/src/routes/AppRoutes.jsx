import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import Users from "../pages/Users";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
console.log("ProtectedRoute import", ProtectedRoute);

export default function AppRoutes() {
  console.log("App routes rendered");
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route
        path="/login"
        element={
          <>
            {console.log("Login route matched")}
            <Login />
          </>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
