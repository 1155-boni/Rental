import React, { useState } from "react";
import "./index.css";
import SignupForm from "./Components/Signup.jsx";
import LoginForm from "./Components/Login.jsx";
import SideNavbar from "./components/SideNavbar";
import TenantDashboard from "./Components/TenantDashboard";
import LandlordDashboard from "./Components/LandlordDashboard";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sign Up", href: "/signup" },
  { label: "Dashboard", href: "/dashboard" },
];

function App() {
  const [user, setUser] = useState(null); // {username, role}
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex">
      <SideNavbar items={navItems} />
      <div className="flex-1 ml-64">
        {user ? (
          <>
            {user.role === "tenant" ? (
              <TenantDashboard username={user.username} />
            ) : (
              <LandlordDashboard username={user.username} />
            )}
          </>
        ) : showLogin ? (
          <LoginForm onLogin={setUser} />
        ) : (
          <SignupForm onSignup={setUser} />
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowLogin(!showLogin)}
            className="text-blue-600 underline"
          >
            {showLogin ? "Go to Signup" : "Go to Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
