import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import SignupForm from "./Components/Signup.jsx";
import LoginForm from "./Components/Login.jsx";
import SideNavbar from "./Components/SideNavbar.jsx";
import TenantDashboard from "./Components/TenantDashboard.jsx";
import LandlordDashboard from "./Components/LandlordDashboard.jsx";
import Properties from "./Components/Properties.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Tenants", href: "/tenants" },
    { label: "Payments", href: "/payments" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex">
      <SideNavbar items={navItems} />

      <div className="flex-1 ml-64">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.role === "tenant" ? (
                  <TenantDashboard username={user.username} />
                ) : (
                  <LandlordDashboard username={user.username} />
                )
              ) : showLogin ? (
                <LoginForm onLogin={setUser} />
              ) : (
                <SignupForm onSignup={setUser} />
              )
            }
          />

          <Route
            path="/properties"
            element={
              user ? <Properties user={user} /> : <Navigate to="/" />
            }
          />
        </Routes>

        {!user && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="text-blue-600 underline"
            >
              {showLogin ? "Go to Signup" : "Go to Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
