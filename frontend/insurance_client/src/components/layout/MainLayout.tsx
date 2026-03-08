import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header
        style={{
          padding: "15px 40px",
          background: "#1e40af",
          color: "white",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>Insurance Simulation Project</div>

        <nav style={{ display: "flex", gap: "20px" }}>
          <Link style={{ color: "white" }} to="/">Home</Link>
          <Link style={{ color: "white" }} to="/login">Login</Link>
          <Link style={{ color: "white" }} to="/register">Register</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}