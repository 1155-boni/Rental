import React, { useState } from "react";
import "./index.css";
import SignupForm from "./Components/signup.jsx";

function App() {
  const [username, setUsername] = useState(null);

  return (
    <div>
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
  );
}

export default App;

