import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/PublicDashboard";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AddStateCovidData from "./pages/AddStateCovidDataForToday";
import EditStateCovidData from "./pages/EditStateCovidDataForToday";
import Layout from "./Layout.js";
import AdminDashboard from "./pages/AdminDashboard";
import { getToken, getUser } from "./services/LocalStorageService";

function App() {
  const token = getToken();

  const user = JSON.parse(getUser());
  // console.log(token, "app me ", user);

  
  
  const ProtectedRoute = ({ children, role, user, token }) => {

    
    if (!token) {
      // console.log("nhi aya token route me ");
      return <Navigate to="/login" />;
    }

    // console.log(user, "in protected route");
    if (user.role === role) {
      // console.log("app me children hai ");
      return children;
    }

    return <Navigate to="/login" />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />

            <Route path="/login" element={<Login />} />

            <Route
              path="/user"
              element={
                <ProtectedRoute role="user" user={user} token={token}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/addstatecoviddata"
              element={
                <ProtectedRoute role="user" user={user} token={token}>
                  <AddStateCovidData />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editstatecoviddata/:id"
              element={
                <ProtectedRoute role="user" user={user} token={token}>
                  <EditStateCovidData />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin" user={user} token={token}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
