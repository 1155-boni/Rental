import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ no BrowserRouter here
import "./index.css";
import SignupForm from "./Components/signup.jsx";
import LoginForm from "./Components/login.jsx";
import SideNavbar from "./components/SideNavbar";
import TenantDashboard from "./Components/TenantDashboard.jsx";
import LandlordDashboard from "./Components/LandlordDashboard.jsx";
import Properties from "./Components/Properties.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: user
        ? user.role === "tenant"
          ? "/tenant-dashboard"
          : "/landlord-dashboard"
        : "/dashboard",
    },
    { label: "Properties", href: "/properties" },
    { label: "Tenants", href: "/tenants" },
    { label: "Payments", href: "/payments" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex">
      <SideNavbar items={navItems} />

      <div className="flex-1 ml-64 p-4">
        <Routes>
          <Route
            path="/tenant-dashboard"
            element={<TenantDashboard username={user?.username} />}
          />
          <Route
            path="/landlord-dashboard"
            element={<LandlordDashboard username={user?.username} />}
          />
          <Route path="/properties" element={<Properties />} />

          {/* default */}
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
