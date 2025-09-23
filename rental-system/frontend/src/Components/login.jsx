import React, { useState } from "react";
import axios from "axios";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      // Save user to localStorage (optional)
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Callback for parent
      if (onLogin) {
        onLogin(response.data.user);
      }

      alert("✅ Login successful!");
    } catch (err) {
      setError("❌ Invalid username or password");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        className="w-full mb-3 p-2 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>

      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Signup
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
