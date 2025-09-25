import React, { useState, useEffect } from "react";

function LandlordDashboard({ username }) {
  const [apartments, setApartments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  // Load apartments from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("apartments")) || [];
    setApartments(stored);
  }, []);

  // Save to localStorage
  const saveApartments = (data) => {
    localStorage.setItem("apartments", JSON.stringify(data));
    setApartments(data);
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add apartment
  const handleSubmit = (e) => {
    e.preventDefault();
    const newApartment = {
      id: Date.now(),
      ...form,
      landlord: username,
      status: "pending",
      bookedBy: null,
    };
    const updated = [...apartments, newApartment];
    saveApartments(updated);
    setForm({ title: "", description: "", price: "", image: null });
  };

  // Update status
  const updateStatus = (id, status) => {
    const updated = apartments.map((apt) =>
      apt.id === id ? { ...apt, status, bookedBy: null } : apt
    );
    saveApartments(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Landlord Dashboard</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 shadow rounded">
        <input
          type="text"
          name="title"
          placeholder="Apartment Title"
          className="w-full mb-2 p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Rent Price"
          className="w-full mb-2 p-2 border rounded"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full mb-2"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Post Apartment
        </button>
      </form>

      {/* Apartment list */}
      <h3 className="text-lg font-semibold mb-2">My Apartments</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apartments
          .filter((apt) => apt.landlord === username)
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
              {apt.bookedBy && <p>Booked by: {apt.bookedBy}</p>}

              {/* Controls */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => updateStatus(apt.id, "approved")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(apt.id, "disapproved")}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Disapprove
                </button>
                <button
                  onClick={() => updateStatus(apt.id, "vacant")}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Vacant
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LandlordDashboard;
