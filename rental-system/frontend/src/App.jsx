import React, { useState } from "react";
import "./index.css";
import SignupForm from "./Components/signup.jsx";
import SideNavbar from "./components/SideNavbar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sign Up", href: "/signup" },
  { label: "Dashboard", href: "/dashboard" },
  // Add more items as needed
];

function App() {
  const [username, setUsername] = useState(null);

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
        ) : (
          <SignupForm onSignup={setUsername} />
        )}
      </div>
    </div>
  );
}

export default App;

