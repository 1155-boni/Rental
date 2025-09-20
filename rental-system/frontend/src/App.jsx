import React, { useState } from "react";
import "./index.css";
import SignupForm from "./Components/signup.jsx";
import LoginForm from "./components/LoginForm";
import SideNavbar from "./components/SideNavbar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sign Up", href: "/signup" },
  { label: "Dashboard", href: "/dashboard" },
  // Add more items as needed
];

function App() {
  const [username, setUsername] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex">
      <SideNavbar items={navItems} />
      <div className="flex-1 ml-64">
        {username ? (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600">
              Welcome {username} to NyumbaPay your rental management system!
            </h1>
          </div>
        ) : showLogin ? (
          <LoginForm onLogin={setUsername} />
        ) : (
          <SignupForm onSignup={setUsername} />
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

