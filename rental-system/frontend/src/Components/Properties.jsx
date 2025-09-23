import React, { useState, useEffect } from "react";
import axios from "axios";

function Properties({ user }) {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    building_name: "",
    apartment_name: "",
    location: "",
    rent_per_month: "",
    image: null,
  });

  // Fetch properties
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/properties/")
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({...formData, image: e.target.files[0]});
  };

  // Submit new property
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("building_name", formData.building_name);
    data.append("apartment_name", formData.apartment_name);
    data.append("location", formData.location);
    data.append("rent_per_month", formData.rent_per_month);
    data.append("image", formData.image);
    data.append("landlord", user.id);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/properties/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProperties([...properties, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter properties
  const visibleProperties =
    user.role === "tenant"
      ? properties.filter((p) => p.status === "vacant" || p.status === "approved" || p.status === "pending")
      : properties.filter((p) => p.landlord === user.id);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Properties</h2>

      {/* Landlord form */}
      {user.role === "landlord" && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white shadow rounded">
          <h3 className="font-semibold mb-3">Add New Property</h3>

          <input
            type="text"
            name="building_name"
            placeholder="Building Name"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apartment_name"
            placeholder="Apartment Name"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rent_per_month"
            placeholder="Rent per month"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            className="w-full mb-2 p-2 border rounded"
            onChange={handleFileChange}
            accept="image/*"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Property
          </button>
        </form>
      )}

      {/* Properties list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleProperties.map((p) => (
          <div key={p.id} className="p-4 border rounded shadow bg-white">
            <img
              src={`http://127.0.0.1:8000${p.image}`}
              alt={p.apartment_name}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className="font-bold">{p.building_name} - {p.apartment_name}</h3>
            <p>{p.location}</p>
            <p>Rent: ${p.rent_per_month}</p>
            <p>Status: {p.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
