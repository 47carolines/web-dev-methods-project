import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

interface Quote {
  id: string;
  premium_total: number;
  risk_level: string;
  created_at: string;
}

export default function Submissions() {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch(`${API_URL}/api/quotes?userId=${user?.id}`);
        const data = await res.json();
        setQuotes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchQuotes();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your submissions.</p>;
  }

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto" }}>
      <h2>My Quote Submissions</h2>

      {loading && <p>Loading...</p>}

      {!loading && quotes.length === 0 && (
        <p>No submissions yet.</p>
      )}

      {quotes.map((q) => (
        <div
          key={q.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            backgroundColor: "#fff"
          }}
        >
          <p><strong>Quote ID:</strong> {q.id}</p>
          <p><strong>Premium:</strong> ${q.premium_total}</p>
          <p><strong>Risk:</strong> {q.risk_level}</p>
          <p><strong>Date:</strong> {new Date(q.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}