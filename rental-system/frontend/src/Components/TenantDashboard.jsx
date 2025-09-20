import React, { useEffect, useState } from "react";
import axios from "axios";

function TenantDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tenant-dashboard/")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <h2>Loading Tenant Dashboard...</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏠 Tenant Dashboard</h1>

      <section style={{ marginBottom: "20px" }}>
        <h2>My Rentals</h2>
        <ul>
          {data.my_rentals.map((rental, i) => (
            <li key={i}>{rental.property} – {rental.status}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>💳 Payment History</h2>
        <ul>
          {data.payment_history.map((p, i) => (
            <li key={i}>{p.date} – {p.amount} – {p.status}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default TenantDashboard;
