import React, { useState } from "react";
import "./index.css";
import SignupForm from "./Components/signup.jsx";
import LoginForm from "./Components/login.jsx";
import SideNavbar from "./components/SideNavbar";
import TenantDashboard from "./Components/TenantDashboard.jsx";
import LandlordDashboard from "./Components/LandlordDashboard.jsx";

function App() {
  const [user, setUser] = useState(null); // {username, role}
  const [showLogin, setShowLogin] = useState(false);

  // ✅ Build navItems dynamically based on user role
  const navItems = [
    {
      label: "Dashboard",
      href: user
        ? user.role === "tenant"
          ? "/tenant-dashboard"
          : "/landlord-dashboard"
        : "/dashboard", // fallback
    },
    { label: "Properties", href: "/properties" },
    { label: "Tenants", href: "/tenants" },
    { label: "Payments", href: "/payments" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex">
      <SideNavbar items={navItems} />

      <div className="flex-1 ml-64">
        {/* ✅ When logged in, show correct dashboard */}
        {user ? (
          user.role === "tenant" ? (
            <TenantDashboard username={user.username} />
          ) : (
            <LandlordDashboard username={user.username} />
          )
        ) : showLogin ? (
          <LoginForm onLogin={setUser} />
        ) : (
          <SignupForm onSignup={setUser} />
        )}

        {/* Toggle between login and signup when no user */}
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
