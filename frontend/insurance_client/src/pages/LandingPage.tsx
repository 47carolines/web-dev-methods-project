import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [zip, setZip] = useState("");

  function startQuote() {
    navigate("/quote-form");
  }

  return (
    <div style={{ padding: "60px 40px", maxWidth: "600px" }}>
      <h1>Find the right coverage at the right price</h1>

      <p style={{ color: "#555" }}>
        Start your auto quote simulation
      </p>

      <div style={{ marginTop: "30px" }}>
        <div>
          <label>ZIP Code</label>
          <br />
          <input
            style={{ width: "300px" }}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter ZIP code"
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button onClick={startQuote}>
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}