import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    // call your Django backend API
    axios
      .get("http://127.0.0.1:8000/api/test/") // Django endpoint
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        console.error(err);
        setMessage("Error connecting to backend");
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">{message}</h1>
    </div>
  );
}

export default App;

