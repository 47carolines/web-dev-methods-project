import type { ReactNode } from "react";
import { Link } from "react-router-dom";
interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div>

      <header style={{
        padding: "15px 40px",
        background: "#1e40af",
        color: "white",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <div>Insurance Simulation Project</div>

        <nav style={{ display: "flex", gap: "20px" }}>
          <Link style={{ color: "white" }} to="/">Home</Link>
          <Link style={{ color: "white" }} to="/login">Login</Link>
          <Link style={{ color: "white" }} to="/register">Register</Link>
        </nav>
      </header>

      <main>
        {children}
      </main>

    </div>
  );
}