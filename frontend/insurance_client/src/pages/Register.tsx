import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const location = useLocation();
  const returnTo = location.state?.returnTo;
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!auth) return null;

  const { login } = auth;

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      login(data.user);

      setSuccess("Account created successfully!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate(returnTo || "/");
    } catch {
      setError("Network error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Register</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />

      <button onClick={handleSubmit}>Register</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <p style={{ marginTop: "12px" }}>
        Already have an account?{" "}
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}