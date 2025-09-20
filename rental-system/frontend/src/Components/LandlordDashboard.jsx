import React, { useEffect, useState } from "react";
import axios from "axios";

function LandlordDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/landlord-dashboard/")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <h2>Loading Landlord Dashboard...</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏢 Landlord Dashboard</h1>

      <section style={{ marginBottom: "20px" }}>
        <h2>My Properties</h2>
        <ul>
          {data.properties.map((prop, i) => (
            <li key={i}>{prop.property} – {prop.status}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>📩 Tenant Requests</h2>
        <ul>
          {data.tenant_requests.map((req, i) => (
            <li key={i}>{req.tenant} – {req.property} – {req.status}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default LandlordDashboard;
