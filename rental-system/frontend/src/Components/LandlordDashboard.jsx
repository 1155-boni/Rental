import React, { useState, useEffect } from "react";

function LandlordDashboard() {
  const [apartments, setApartments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("apartments")) || [];
    setApartments(saved);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("apartments", JSON.stringify(data));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApartment = {
      id: Date.now(),
      ...formData,
      status: "Pending Approval",
      bookedBy: null,
    };
    const updated = [...apartments, newApartment];
    setApartments(updated);
    saveToStorage(updated);
    setFormData({ title: "", description: "", price: "", image: null });
  };

  const updateStatus = (id, status) => {
    const updated = apartments.map((apt) =>
      apt.id === id ? { ...apt, status } : apt
    );
    setApartments(updated);
    saveToStorage(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Landlord Dashboard</h2>

      {/* Apartment Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded mb-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Post Apartment
        </button>
      </form>

      {/* Apartments List */}
      <h3 className="font-semibold mb-2">My Apartments</h3>
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
          <div className="flex gap-2">
            <button
              onClick={() => updateStatus(apt.id, "Approved")}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus(apt.id, "Disapproved")}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Disapprove
            </button>
            <button
              onClick={() => updateStatus(apt.id, "Vacant")}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Vacant
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LandlordDashboard;
