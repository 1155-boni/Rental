import React, { useState, useEffect } from "react";

function TenantDashboard({ username }) {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("apartments")) || [];
    setApartments(stored);
  }, []);

  const saveApartments = (data) => {
    localStorage.setItem("apartments", JSON.stringify(data));
    setApartments(data);
  };

  const handleBook = (id) => {
    const updated = apartments.map((apt) =>
      apt.id === id ? { ...apt, status: "booked", bookedBy: username } : apt
    );
    saveApartments(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tenant Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apartments
          .filter(
            (apt) =>
              ["pending", "approved", "booked"].includes(apt.status) &&
              apt.status !== "disapproved" &&
              apt.status !== "vacant"
          )
          .map((apt) => (
            <div key={apt.id} className="border rounded p-4 shadow bg-white">
              {apt.image && (
                <img
                  src={apt.image}
                  alt={apt.title}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
              )}
              <h4 className="font-bold">{apt.title}</h4>
              <p>{apt.description}</p>
              <p className="text-sm text-gray-600">Ksh {apt.price}</p>
              <p className="text-sm">Status: {apt.status}</p>

              {apt.status !== "booked" && (
                <button
                  onClick={() => handleBook(apt.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700"
                >
                  Book
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TenantDashboard;
