import React, { useEffect, useState } from "react";
import axios from "axios";

function TenantDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tenant-dashboard/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-600 animate-pulse">
          Loading Tenant Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        🏠 Tenant Dashboard
      </h1>

      {/* Rentals Section */}
      <section className="mb-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          My Rentals
        </h2>
        <ul className="space-y-3">
          {data.my_rentals.map((rental, i) => (
            <li
              key={i}
              className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex justify-between items-center"
            >
              <span className="font-medium">{rental.property}</span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  rental.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {rental.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Payment History */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          💳 Payment History
        </h2>
        <ul className="divide-y divide-gray-200">
          {data.payment_history.map((p, i) => (
            <li key={i} className="py-3 flex justify-between">
              <span className="text-gray-600">{p.date}</span>
              <span className="font-medium text-blue-700">${p.amount}</span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  p.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {p.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TenantDashboard;
