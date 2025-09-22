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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 className="text-2xl font-bold mb-6">🏠 Tenant Dashboard</h1>

      <section style={{ marginBottom: "20px" }}>
        <h2 className="text-xl font-semibold mb-2">My Rentals</h2>
        <ul className="list-disc list-inside">
          {data?.my_rentals?.length > 0 ? (
            data.my_rentals.map((r, i) => (
              <li key={i}>
                <strong>{r.property}</strong> – {r.status}
              </li>
            ))
          ) : (
            <li>No rentals yet</li>
          )}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">💳 Payment History</h2>
        <ul className="list-disc list-inside">
          {data?.payment_history?.length > 0 ? (
            data.payment_history.map((p, i) => (
              <li key={i}>
                {p.date} – {p.amount} – {p.status}
              </li>
            ))
          ) : (
            <li>No payments yet</li>
          )}
        </ul>
      </section>
    </div>
  );
}

export default TenantDashboard;
