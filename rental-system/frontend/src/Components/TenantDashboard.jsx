import React, { useEffect, useState } from "react";

function TenantDashboard() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("apartments")) || [];
    // tenants only see approved/pending/booked
    const visible = saved.filter((apt) =>
      ["Pending Approval", "Approved", "Booked"].includes(apt.status)
    );
    setApartments(visible);
  }, []);

  const handleBook = (id) => {
    const saved = JSON.parse(localStorage.getItem("apartments")) || [];
    const updated = saved.map((apt) =>
      apt.id === id ? { ...apt, status: "Booked", bookedBy: "TenantX" } : apt
    );
    localStorage.setItem("apartments", JSON.stringify(updated));
    setApartments(updated.filter((apt) =>
      ["Pending Approval", "Approved", "Booked"].includes(apt.status)
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tenant Dashboard</h2>
      {apartments.map((apt) => (
        <div
          key={apt.id}
          className="border p-4 rounded mb-3 flex gap-4 items-center"
        >
          {apt.image && (
            <img
              src={apt.image}
              alt="apartment"
              className="w-32 h-24 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <h4 className="font-bold">{apt.title}</h4>
            <p>{apt.description}</p>
            <p className="text-sm text-gray-500">${apt.price}</p>
            <p className="text-xs font-semibold">
              Status: <span className="capitalize">{apt.status}</span>
            </p>
          </div>
          {apt.status !== "Booked" && (
            <button
              onClick={() => handleBook(apt.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Book
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TenantDashboard;
