import React, { useEffect, useState } from "react";
import axios from "axios";

function Properties({ user }) {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;

    const url =
      user.role === "landlord"
        ? "http://127.0.0.1:8000/api/landlord/properties/"
        : "http://127.0.0.1:8000/api/tenant/properties/";

    axios
      .get(url)
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  // Filter properties based on search query
  const filteredProperties = properties.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.building?.toLowerCase().includes(query) ||
      p.landlord?.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.rent.toString().includes(query)
    );
  });

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        {user?.role === "landlord" ? "🏢 My Properties" : "🏠 Available Properties"}
      </h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, landlord, location, or rent..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {p.name}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Building:</span> {p.building}
              </p>
              {user.role === "tenant" && (
                <p className="text-gray-600">
                  <span className="font-medium">Landlord:</span> {p.landlord}
                </p>
              )}
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {p.location}
              </p>
              <p className="text-gray-800 font-semibold mt-2">
                Rent: ${p.rent}/month
              </p>
              <span
                className={`inline-block mt-3 px-3 py-1 text-sm rounded-full ${
                  p.status === "Vacant"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {p.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No properties match your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default Properties;
