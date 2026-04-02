import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function MainLayout() {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { user, logout } = auth;

  return (
    <div>
      <header
        style={{
          padding: "15px 40px",
          background: "#1e40af",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>Insurance Simulation Project</div>

        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link style={{ color: "white" }} to="/">Home</Link>

          {!user ? (
            <>
              <Link style={{ color: "white" }} to="/login">Login</Link>
              <Link style={{ color: "white" }} to="/register">Register</Link>
            </>
          ) : (
            <>
            <Link style={{ color: "white" }} to="/submissions">
              My Quotes
            </Link>
              <span>Welcome, {user.email}</span>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>
      </header>

      <Outlet />
    </div>
  );
}